const db = require('../utils/database-adapter')
const path = require('path')
const fs = require('fs')

class OrdemController {
  // Listar todas as ordens com paginação determinística (compatível com Supabase)
  async index(req, res) {
    try {
      const { status, cliente_id, prioridade, tecnico } = req.query
      const { extractPaginationParams, createPaginatedResponse } = require('../utils/pagination')
      const supabase = require('../utils/supabase')

      // Extrair parâmetros de paginação
      const pagination = extractPaginationParams(req.query, { defaultLimit: 15, maxLimit: 100 })

      // Contagem total com filtros
      let countQuery = supabase.client.from('ordens').select('*', { count: 'exact', head: true })
      if (status) countQuery = countQuery.eq('status', status)
      if (cliente_id) countQuery = countQuery.eq('cliente_id', parseInt(cliente_id))
      if (prioridade) countQuery = countQuery.eq('prioridade', prioridade)
      if (tecnico) countQuery = countQuery.ilike('tecnico_responsavel', `%${tecnico}%`)

      const { count, error: countError } = await countQuery
      if (countError) throw countError
      const total = count || 0

      // Dados com relações (cliente) e ordenação determinística
      let dataQuery = supabase.client
        .from('ordens')
        .select(`
          id, cliente_id, equipamento, defeito_relatado, status, data_entrada,
          created_at, updated_at, modelo, prioridade, valor_orcamento, valor_final,
          data_previsao, data_conclusao, data_entrega, tecnico_responsavel, observacoes,
          clientes:clientes (nome, telefone, email)
        `)

      if (status) dataQuery = dataQuery.eq('status', status)
      if (cliente_id) dataQuery = dataQuery.eq('cliente_id', parseInt(cliente_id))
      if (prioridade) dataQuery = dataQuery.eq('prioridade', prioridade)
      if (tecnico) dataQuery = dataQuery.ilike('tecnico_responsavel', `%${tecnico}%`)

      const offset = pagination.offset
      dataQuery = dataQuery
        .order('data_entrada', { ascending: false, nullsFirst: false })
        .order('id', { ascending: false })
        .range(offset, offset + pagination.limit - 1)

      const { data, error } = await dataQuery
      if (error) throw error

      // Mapear para a estrutura compatível com o frontend atual
      const ordens = (data || []).map((o) => ({
        id: o.id,
        cliente_id: o.cliente_id,
        equipamento: o.equipamento,
        defeito: o.defeito_relatado,
        status: o.status,
        data_entrada: o.data_entrada,
        created_at: o.created_at,
        updated_at: o.updated_at,
        modelo: o.modelo || '',
        prioridade: o.prioridade || 'normal',
        valor_orcamento: o.valor_orcamento || 0,
        valor_final: o.valor_final || 0,
        data_previsao: o.data_previsao,
        data_conclusao: o.data_conclusao,
        data_entrega: o.data_entrega,
        tecnico_responsavel: o.tecnico_responsavel || '',
        observacoes: o.observacoes || '',
        cliente_nome: o.clientes?.nome || null,
        cliente_telefone: o.clientes?.telefone || null,
        cliente_email: o.clientes?.email || null,
      }))

      res.json(createPaginatedResponse(ordens, total, pagination.page, pagination.limit))
    } catch (error) {
      const { respondWithError } = require('../utils/http-error')
      return respondWithError(res, error, 'Erro ao listar ordens')
    }
  }

  // Buscar ordem por ID com dados completos (Supabase, sem SQL cru)
  async show(req, res) {
    try {
      const { id } = req.params
      const supabase = require('../utils/supabase')

      // Ordem + cliente (via relação)
      const { data: ordensRows, error: ordErr } = await supabase.client
        .from('ordens')
        .select(`
          id, cliente_id, equipamento, defeito_relatado, status, data_entrada,
          created_at, updated_at, modelo, prioridade, valor_orcamento, valor_final,
          data_previsao, data_conclusao, data_entrega, tecnico_responsavel, observacoes,
          clientes:clientes (nome, telefone, email, endereco, cidade)
        `)
        .eq('id', parseInt(id))
        .limit(1)
      if (ordErr) throw ordErr
      const o = (ordensRows || [])[0]
      if (!o) {
        return res.status(404).json({ success: false, error: 'Ordem de serviço não encontrada' })
      }

      // Entidades relacionadas
      const [fotosRes, pecasRes, servicosRes, histRes] = await Promise.all([
        supabase.client.from('ordem_fotos').select('id, nome_arquivo, caminho, created_at').eq('ordem_id', parseInt(id)).order('created_at', { ascending: true }),
        supabase.client.from('ordem_pecas').select('id, nome_peca, codigo_peca, quantidade, valor_unitario, valor_total, fornecedor, observacoes, created_at').eq('ordem_id', parseInt(id)).order('created_at', { ascending: true }),
        supabase.client.from('ordem_servicos').select('id, descricao_servico, tempo_gasto, valor_servico, tecnico, data_execucao, observacoes').eq('ordem_id', parseInt(id)).order('data_execucao', { ascending: true }),
        supabase.client.from('ordem_historico').select('id, status_anterior, status_novo, observacoes, usuario, data_alteracao').eq('ordem_id', parseInt(id)).order('data_alteracao', { ascending: false }),
      ])

      const fotos = fotosRes.data || []
      const pecas = pecasRes.data || []
      const servicos = servicosRes.data || []
      const historico = histRes.data || []

      res.json({
        success: true,
        data: {
          id: o.id,
          cliente_id: o.cliente_id,
          equipamento: o.equipamento,
          defeito: o.defeito_relatado,
          status: o.status,
          data_entrada: o.data_entrada,
          created_at: o.created_at,
          updated_at: o.updated_at,
          modelo: o.modelo || '',
          prioridade: o.prioridade || 'normal',
          valor_orcamento: o.valor_orcamento || 0,
          valor_final: o.valor_final || 0,
          data_previsao: o.data_previsao,
          data_conclusao: o.data_conclusao,
          data_entrega: o.data_entrega,
          tecnico_responsavel: o.tecnico_responsavel || '',
          observacoes: o.observacoes || '',
          cliente_nome: o.clientes?.nome || null,
          cliente_telefone: o.clientes?.telefone || null,
          cliente_email: o.clientes?.email || null,
          cliente_endereco: o.clientes?.endereco || null,
          cliente_cidade: o.clientes?.cidade || null,
          fotos,
          pecas,
          servicos,
          historico,
        },
      })
    } catch (error) {
      const { respondWithError } = require('../utils/http-error')
      return respondWithError(res, error, 'Erro ao buscar ordem')
    }
  }

  // Criar nova ordem
  async store(req, res) {
    try {
      console.log('🔄 Criando nova ordem de serviço...')
      console.log('📋 Dados recebidos:', JSON.stringify(req.body, null, 2))

      const {
        cliente_id,
        equipamento,
        marca,
        modelo,
        numero_serie,
        defeito,
        descricao,
        diagnostico,
        solucao,
        status = 'aguardando',
        prioridade = 'normal',
        valor_orcamento,
        valor_mao_obra,
        valor_pecas,
        valor_final,
        desconto = 0,
        data_previsao,
        tecnico_responsavel,
        observacoes,
        observacoes_internas,
        garantia_dias = 90,
      } = req.body

      // Validações básicas
      if (!cliente_id || !equipamento || !defeito) {
        console.log('❌ Validação falhou:', { cliente_id, equipamento, defeito })
        return res.status(400).json({
          success: false,
          error: 'Cliente, equipamento e defeito são obrigatórios',
          details: {
            cliente_id: !cliente_id ? 'Cliente é obrigatório' : null,
            equipamento: !equipamento ? 'Equipamento é obrigatório' : null,
            defeito: !defeito ? 'Defeito é obrigatório' : null,
          }
        })
      }

      // Validar se cliente existe
      if (cliente_id && !isNaN(parseInt(cliente_id))) {
        try {
          const clienteExiste = await db.get('SELECT id FROM clientes WHERE id = ?', [parseInt(cliente_id)])
          if (!clienteExiste) {
            console.log('❌ Cliente não encontrado:', cliente_id)
            return res.status(400).json({
              success: false,
              error: 'Cliente não encontrado',
            })
          }
        } catch (clienteError) {
          console.log('❌ Erro ao verificar cliente:', clienteError.message)
          return res.status(400).json({
            success: false,
            error: 'Erro ao verificar cliente',
          })
        }
      } else {
        console.log('❌ ID do cliente inválido:', cliente_id)
        return res.status(400).json({
          success: false,
          error: 'ID do cliente inválido',
        })
      }

      // Processar pecas e servicos com melhor tratamento
      let pecas = []
      let servicos = []

      // Tratamento para peças
      if (req.body.pecas) {
        try {
          if (typeof req.body.pecas === 'string') {
            pecas = JSON.parse(req.body.pecas)
          } else if (Array.isArray(req.body.pecas)) {
            pecas = req.body.pecas
          }
        } catch (e) {
          console.warn('Erro ao processar peças:', e.message)
          pecas = []
        }
      }

      // Tratamento para serviços
      if (req.body.servicos) {
        try {
          if (typeof req.body.servicos === 'string') {
            servicos = JSON.parse(req.body.servicos)
          } else if (Array.isArray(req.body.servicos)) {
            servicos = req.body.servicos
          }
        } catch (e) {
          console.warn('Erro ao processar serviços:', e.message)
          servicos = []
        }
      }

      // Filtrar peças e serviços válidos
      pecas = pecas.filter(
        (peca) => peca && peca.nome_peca && peca.nome_peca.trim()
      )
      servicos = servicos.filter(
        (servico) =>
          servico &&
          servico.descricao_servico &&
          servico.descricao_servico.trim()
      )

      // Inserir ordem principal
      const result = await db.run(
        `
        INSERT INTO ordens (
          cliente_id, equipamento, modelo,
          defeito_relatado, observacoes, status, prioridade,
          valor_orcamento, valor_final,
          data_previsao, tecnico_responsavel
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          cliente_id,
          equipamento,
          modelo || null,
          defeito,
          observacoes || null,
          status,
          prioridade,
          valor_orcamento || null,
          valor_final || null,
          data_previsao || null,
          tecnico_responsavel || null,
        ]
      )

      const ordemId = result.id

      // Inserir peças se existirem
      if (pecas.length > 0) {
        for (const peca of pecas) {
          const valorTotal =
            (parseFloat(peca.quantidade) || 0) *
            (parseFloat(peca.valor_unitario) || 0)

          await db.run(
            `
            INSERT INTO ordem_pecas (
              ordem_id, nome_peca, codigo_peca, quantidade, 
              valor_unitario, valor_total, fornecedor, observacoes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
            [
              ordemId,
              peca.nome_peca,
              peca.codigo_peca || null,
              peca.quantidade || 1,
              peca.valor_unitario || null,
              valorTotal,
              peca.fornecedor || null,
              peca.observacoes || null,
            ]
          )
        }
      }

      // Inserir serviços se existirem
      if (servicos.length > 0) {
        for (const servico of servicos) {
          await db.run(
            `
            INSERT INTO ordem_servicos (
              ordem_id, descricao_servico, tempo_gasto, valor_servico, 
              tecnico, observacoes
            ) VALUES (?, ?, ?, ?, ?, ?)
          `,
            [
              ordemId,
              servico.descricao_servico,
              servico.tempo_gasto || null,
              servico.valor_servico || null,
              servico.tecnico || tecnico_responsavel,
              servico.observacoes || null,
            ]
          )
        }
      }

      // Registrar no histórico
      await db.run(
        `
        INSERT INTO ordem_historico (ordem_id, status_novo, observacoes, usuario) 
        VALUES (?, ?, ?, ?)
      `,
        [ordemId, status, 'Ordem de serviço criada', 'Sistema']
      )

      // Processar upload de fotos se existirem
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          await db.run(
            `
            INSERT INTO ordem_fotos (ordem_id, nome_arquivo, caminho) 
            VALUES (?, ?, ?)
          `,
            [ordemId, file.filename, file.path]
          )
        }
      }

      // Buscar a ordem criada com dados completos
      const ordemCriada = await db.get(
        `
        SELECT 
          o.*, 
          c.nome as cliente_nome, c.telefone as cliente_telefone
        FROM ordens o
        INNER JOIN clientes c ON o.cliente_id = c.id
        WHERE o.id = ?
      `,
        [ordemId]
      )

      res.status(201).json({
        success: true,
        message: 'Ordem de serviço criada com sucesso',
        data: ordemCriada,
      })
    } catch (error) {
      console.error('Erro ao criar ordem:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor: ' + error.message,
      })
    }
  }

  // Atualizar ordem
  async update(req, res) {
    try {
      const { id } = req.params
      const {
        equipamento,
        marca,
        modelo,
        numero_serie,
        defeito,
        descricao,
        diagnostico,
        solucao,
        status,
        prioridade,
        valor_orcamento,
        valor_mao_obra,
        valor_pecas,
        valor_final,
        desconto,
        data_previsao,
        data_conclusao,
        tecnico_responsavel,
        observacoes,
        observacoes_internas,
        garantia_dias,
      } = req.body

      // Processar pecas e servicos com melhor tratamento
      let pecas = []
      let servicos = []

      // Tratamento para peças
      if (req.body.pecas) {
        try {
          if (typeof req.body.pecas === 'string') {
            pecas = JSON.parse(req.body.pecas)
          } else if (Array.isArray(req.body.pecas)) {
            pecas = req.body.pecas
          }
        } catch (e) {
          console.warn('Erro ao processar peças:', e.message)
          pecas = []
        }
      }

      // Tratamento para serviços
      if (req.body.servicos) {
        try {
          if (typeof req.body.servicos === 'string') {
            servicos = JSON.parse(req.body.servicos)
          } else if (Array.isArray(req.body.servicos)) {
            servicos = req.body.servicos
          }
        } catch (e) {
          console.warn('Erro ao processar serviços:', e.message)
          servicos = []
        }
      }

      // Filtrar peças e serviços válidos
      pecas = pecas.filter(
        (peca) => peca && peca.nome_peca && peca.nome_peca.trim()
      )
      servicos = servicos.filter(
        (servico) =>
          servico &&
          servico.descricao_servico &&
          servico.descricao_servico.trim()
      )

      // Verificar se ordem existe
      const ordemExistente = await db.get('SELECT * FROM ordens WHERE id = ?', [
        id,
      ])
      if (!ordemExistente) {
        return res.status(404).json({
          success: false,
          error: 'Ordem de serviço não encontrada',
        })
      }

      // Registrar mudança de status no histórico
      if (status && status !== ordemExistente.status) {
        await db.run(
          `
          INSERT INTO ordem_historico (ordem_id, status_anterior, status_novo, observacoes, usuario)
          VALUES (?, ?, ?, ?, ?)
        `,
          [
            id,
            ordemExistente.status,
            status,
            `Status alterado de ${ordemExistente.status} para ${status}`,
            'Sistema',
          ]
        )
      }

      // Atualizar ordem
      await db.run(
        `
        UPDATE ordens SET
          equipamento = ?, modelo = ?,
          defeito_relatado = ?, observacoes = ?, status = ?, prioridade = ?,
          valor_orcamento = ?, valor_final = ?,
          data_previsao = ?, data_conclusao = ?, data_entrega = ?, tecnico_responsavel = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
        [
          equipamento?.trim(),
          modelo?.trim() || null,
          defeito?.trim(),
          observacoes?.trim() || null,
          status,
          prioridade,
          valor_orcamento || null,
          valor_final || null,
          data_previsao || null,
          data_conclusao || null,
          data_entrega || null,
          tecnico_responsavel?.trim() || null,
          id,
        ]
      )

      // Atualizar peças - remover existentes e inserir novas
      await db.run('DELETE FROM ordem_pecas WHERE ordem_id = ?', [id])
      if (pecas.length > 0) {
        for (const peca of pecas) {
          const valorTotal =
            (parseFloat(peca.quantidade) || 0) *
            (parseFloat(peca.valor_unitario) || 0)

          await db.run(
            `
            INSERT INTO ordem_pecas (
              ordem_id, nome_peca, codigo_peca, quantidade, 
              valor_unitario, valor_total, fornecedor, observacoes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
            [
              id,
              peca.nome_peca,
              peca.codigo_peca || null,
              peca.quantidade || 1,
              peca.valor_unitario || null,
              valorTotal,
              peca.fornecedor || null,
              peca.observacoes || null,
            ]
          )
        }
      }

      // Atualizar serviços - remover existentes e inserir novos
      await db.run('DELETE FROM ordem_servicos WHERE ordem_id = ?', [id])
      if (servicos.length > 0) {
        for (const servico of servicos) {
          await db.run(
            `
            INSERT INTO ordem_servicos (
              ordem_id, descricao_servico, tempo_gasto, 
              valor_servico, tecnico, observacoes
            ) VALUES (?, ?, ?, ?, ?, ?)
          `,
            [
              id,
              servico.descricao_servico,
              servico.tempo_gasto || null,
              servico.valor_servico || null,
              servico.tecnico || tecnico_responsavel,
              servico.observacoes || null,
            ]
          )
        }
      }

      // Buscar ordem atualizada
      const ordemAtualizada = await db.get(
        `
        SELECT 
          o.*, 
          c.nome as cliente_nome, c.telefone as cliente_telefone
        FROM ordens o
        INNER JOIN clientes c ON o.cliente_id = c.id
        WHERE o.id = ?
      `,
        [id]
      )

      res.json({
        success: true,
        message: 'Ordem de serviço atualizada com sucesso',
        data: ordemAtualizada,
      })
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor: ' + error.message,
      })
    }
  }

  // Alterar status da ordem
  async alterarStatus(req, res) {
    try {
      const { id } = req.params
      const { status, observacoes } = req.body

      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status é obrigatório',
        })
      }

      // Verificar se ordem existe
      const ordemExistente = await db.get('SELECT * FROM ordens WHERE id = ?', [
        id,
      ])
      if (!ordemExistente) {
        return res.status(404).json({
          success: false,
          error: 'Ordem de serviço não encontrada',
        })
      }

      // Atualizar status
      await db.run(
        `UPDATE ordens SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [status, id]
      )

      // Registrar no histórico
      await db.run(
        `
        INSERT INTO ordem_historico (ordem_id, status_anterior, status_novo, observacoes, usuario)
        VALUES (?, ?, ?, ?, ?)
      `,
        [
          id,
          ordemExistente.status,
          status,
          observacoes ||
            `Status alterado de ${ordemExistente.status} para ${status}`,
          'Sistema',
        ]
      )

      res.json({
        success: true,
        message: 'Status alterado com sucesso',
      })
    } catch (error) {
      console.error('Erro ao alterar status:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor: ' + error.message,
      })
    }
  }

  // Deletar ordem
  async destroy(req, res) {
    try {
      const { id } = req.params

      const ordem = await db.get('SELECT * FROM ordens WHERE id = ?', [id])
      if (!ordem) {
        return res.status(404).json({
          success: false,
          error: 'Ordem de serviço não encontrada',
        })
      }

      // Buscar fotos para deletar arquivos
      const fotos = await db.all(
        'SELECT caminho FROM ordem_fotos WHERE ordem_id = ?',
        [id]
      )

      // Deletar registros relacionados
      await db.run('DELETE FROM ordem_fotos WHERE ordem_id = ?', [id])
      await db.run('DELETE FROM ordem_pecas WHERE ordem_id = ?', [id])
      await db.run('DELETE FROM ordem_servicos WHERE ordem_id = ?', [id])
      await db.run('DELETE FROM ordem_historico WHERE ordem_id = ?', [id])
      await db.run('DELETE FROM ordens WHERE id = ?', [id])

      // Deletar arquivos de fotos
      fotos.forEach((foto) => {
        try {
          if (fs.existsSync(foto.caminho)) {
            fs.unlinkSync(foto.caminho)
          }
        } catch (err) {
          console.error('Erro ao deletar foto:', err)
        }
      })

      res.json({
        success: true,
        message: 'Ordem de serviço deletada com sucesso',
      })
    } catch (error) {
      console.error('Erro ao deletar ordem:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      })
    }
  }

  // Estatísticas do dashboard
  async stats(req, res) {
    try {
      const fmt = (d) => d.toISOString().slice(0, 10)
      const now = new Date()
      const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1)

      const [totalOrdens, totalClientes, resumoMesArr, resumoDiaArr, prioridadeMesArr, ordensRecentes, tecnicosAtivos] = await Promise.all([
        db.count('ordens'),
        db.count('clientes'),
        db.rpc('dashboard_resumo_mes', { desde: fmt(inicioMes) }),
        db.rpc('dashboard_resumo_do_dia', { data: fmt(now) }),
        db.rpc('dashboard_prioridade_mes', { desde: fmt(inicioMes) }),
        db.rpc('dashboard_ordens_recentes', { lim: 10 }),
        db.rpc('dashboard_tecnicos_ativos', { desde: fmt(inicioMes), lim: 5 }),
      ])

      const resumoMes = Array.isArray(resumoMesArr) ? (resumoMesArr[0] || {}) : (resumoMesArr || {})
      const statusArray = [
        { status: 'aguardando', total: resumoMes.aguardando || 0 },
        { status: 'em_andamento', total: resumoMes.em_andamento || 0 },
        { status: 'aguardando_peca', total: resumoMes.aguardando_peca || 0 },
        { status: 'pronto', total: resumoMes.pronto || 0 },
        { status: 'entregue', total: resumoMes.entregue || 0 },
        { status: 'cancelado', total: resumoMes.cancelado || 0 },
      ]

      const prioridadeArray = Array.isArray(prioridadeMesArr) ? prioridadeMesArr.map((r) => ({ prioridade: r.prioridade, total: r.total })) : []

      res.json({
        success: true,
        data: {
          totais: {
            ordens: totalOrdens || 0,
            clientes: totalClientes || 0,
            faturamento: resumoMes.valor_total || 0,
            faturamento_entregue: resumoMes.valor_entregue || 0,
            faturamento_pendente: resumoMes.valor_pendente || 0,
            resumo_dia: Array.isArray(resumoDiaArr) ? (resumoDiaArr[0] || null) : (resumoDiaArr || null),
          },
          breakdown: {
            status: statusArray,
            prioridade: prioridadeArray,
          },
          ordensRecentes: Array.isArray(ordensRecentes) ? ordensRecentes : [],
          tecnicosAtivos: Array.isArray(tecnicosAtivos) ? tecnicosAtivos : [],
        },
      })
    } catch (error) {
      const { respondWithError } = require('../utils/http-error')
      return respondWithError(res, error, 'Erro ao buscar estatísticas')
    }
  }

  // Upload de fotos para ordem existente
  async uploadFotos(req, res) {
    try {
      const { id } = req.params

      const ordem = await db.get('SELECT id FROM ordens WHERE id = ?', [id])
      if (!ordem) {
        return res.status(404).json({
          success: false,
          error: 'Ordem de serviço não encontrada',
        })
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Nenhuma foto foi enviada',
        })
      }

      const fotosInseridas = []
      for (const file of req.files) {
        const resultado = await db.run(
          `
          INSERT INTO ordem_fotos (ordem_id, nome_arquivo, caminho)
          VALUES (?, ?, ?)
        `,
          [id, file.filename, file.path]
        )

        fotosInseridas.push({
          id: resultado.id,
          nome_arquivo: file.filename,
          caminho: file.path,
        })
      }

      res.json({
        success: true,
        message: `${fotosInseridas.length} foto(s) adicionada(s) com sucesso`,
        data: fotosInseridas,
      })
    } catch (error) {
      const { respondWithError } = require('../utils/http-error')
      return respondWithError(res, error, 'Erro ao fazer upload de fotos')
    }
  }

  // Relatório de ordens por período (sem SQL cru, usando Supabase)
  async relatorio(req, res) {
    try {
      const { data_inicio = null, data_fim = null, status = null, tecnico = null } = req.query
      const supabase = require('../utils/supabase')

      let q = supabase.client
        .from('ordens')
        .select(`
          id, equipamento, marca, modelo, defeito_relatado, diagnostico, solucao,
          status, prioridade, valor_orcamento, valor_final,
          data_entrada, data_conclusao, tecnico_responsavel,
          clientes:clientes (nome, telefone)
        `)

      if (data_inicio) q = q.gte('data_entrada', `${data_inicio} 00:00:00`)
      if (data_fim) q = q.lte('data_entrada', `${data_fim} 23:59:59`)
      if (status) q = q.eq('status', status)
      if (tecnico) q = q.ilike('tecnico_responsavel', `%${tecnico}%`)

      q = q.order('data_entrada', { ascending: false })

      const { data, error } = await q
      if (error) throw error

      const ordens = (data || []).map(o => ({
        id: o.id,
        equipamento: o.equipamento,
        marca: o.marca,
        modelo: o.modelo,
        defeito: o.defeito_relatado,
        diagnostico: o.diagnostico,
        solucao: o.solucao,
        status: o.status,
        prioridade: o.prioridade,
        valor_orcamento: o.valor_orcamento,
        valor_final: o.valor_final,
        data_entrada: o.data_entrada,
        data_finalizacao: o.data_conclusao,
        tecnico_responsavel: o.tecnico_responsavel,
        cliente_nome: o.clientes?.nome || null,
        cliente_telefone: o.clientes?.telefone || null,
      }))

      const totais = {
        quantidade: ordens.length,
        valor_orcamento: ordens.reduce((sum, o) => sum + (parseFloat(o.valor_orcamento) || 0), 0),
        valor_final: ordens.reduce((sum, o) => sum + (parseFloat(o.valor_final) || 0), 0),
        por_status: {},
      }

      for (const ordem of ordens) {
        totais.por_status[ordem.status] = (totais.por_status[ordem.status] || 0) + 1
      }

      res.json({
        success: true,
        data: {
          ordens,
          totais,
          filtros: { data_inicio, data_fim, status, tecnico },
        },
      })
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      })
    }
  }
}

module.exports = new OrdemController()
