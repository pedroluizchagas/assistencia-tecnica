const db = require('./database')

// Categorias iniciais
const categoriasIniciais = [
  {
    nome: 'Displays',
    descricao: 'Telas e displays para smartphones',
    icone: '📱',
  },
  {
    nome: 'Baterias',
    descricao: 'Baterias para celulares e tablets',
    icone: '🔋',
  },
  { nome: 'Conectores', descricao: 'Conectores de carga e fones', icone: '🔌' },
  {
    nome: 'Placas',
    descricao: 'Placas-mãe e componentes eletrônicos',
    icone: '🔧',
  },
  { nome: 'Capas', descricao: 'Capas e películas protetoras', icone: '🛡️' },
  {
    nome: 'Fones',
    descricao: 'Fones de ouvido e acessórios de áudio',
    icone: '🎧',
  },
  { nome: 'Carregadores', descricao: 'Carregadores e cabos USB', icone: '⚡' },
  { nome: 'Ferramentas', descricao: 'Ferramentas para reparo', icone: '🔨' },
]

// Categorias financeiras iniciais
const categoriasFinanceirasIniciais = [
  // Receitas
  {
    nome: 'Vendas de Produtos',
    descricao: 'Receitas com vendas de acessórios e peças',
    tipo: 'receita',
    icone: '🛒',
    cor: '#10b981',
  },
  {
    nome: 'Serviços Técnicos',
    descricao: 'Receitas com reparos e consertos',
    tipo: 'receita',
    icone: '🔧',
    cor: '#3b82f6',
  },
  {
    nome: 'Outras Receitas',
    descricao: 'Outras entradas financeiras',
    tipo: 'receita',
    icone: '💰',
    cor: '#8b5cf6',
  },

  // Despesas
  {
    nome: 'Compra de Estoque',
    descricao: 'Gastos com aquisição de produtos e peças',
    tipo: 'despesa',
    icone: '📦',
    cor: '#f59e0b',
  },
  {
    nome: 'Aluguel',
    descricao: 'Aluguel do estabelecimento',
    tipo: 'despesa',
    icone: '🏠',
    cor: '#ef4444',
  },
  {
    nome: 'Energia Elétrica',
    descricao: 'Conta de energia elétrica',
    tipo: 'despesa',
    icone: '⚡',
    cor: '#f97316',
  },
  {
    nome: 'Internet/Telefone',
    descricao: 'Serviços de comunicação',
    tipo: 'despesa',
    icone: '📞',
    cor: '#06b6d4',
  },
  {
    nome: 'Ferramentas',
    descricao: 'Aquisição de ferramentas e equipamentos',
    tipo: 'despesa',
    icone: '🔨',
    cor: '#64748b',
  },
  {
    nome: 'Marketing',
    descricao: 'Gastos com propaganda e marketing',
    tipo: 'despesa',
    icone: '📢',
    cor: '#ec4899',
  },
  {
    nome: 'Outras Despesas',
    descricao: 'Outras saídas financeiras',
    tipo: 'despesa',
    icone: '💸',
    cor: '#6b7280',
  },
]

async function inserirDadosIniciais() {
  try {
    console.log('🔄 Inserindo dados iniciais...')

    // Inserir categorias
    console.log('📁 Inserindo categorias...')
    for (const categoria of categoriasIniciais) {
      const existe = await db.get('SELECT id FROM categorias WHERE nome = ?', [
        categoria.nome,
      ])
      if (!existe) {
        await db.run(
          `
          INSERT INTO categorias (nome, descricao, icone)
          VALUES (?, ?, ?)
        `,
          [categoria.nome, categoria.descricao, categoria.icone]
        )
        console.log(`✅ Categoria '${categoria.nome}' criada`)
      }
    }

    // Inserir categorias financeiras
    console.log('💰 Inserindo categorias financeiras...')
    for (const categoria of categoriasFinanceirasIniciais) {
      const existe = await db.get(
        'SELECT id FROM categorias_financeiras WHERE nome = ?',
        [categoria.nome]
      )
      if (!existe) {
        await db.run(
          `
          INSERT INTO categorias_financeiras (nome, descricao, tipo, icone, cor)
          VALUES (?, ?, ?, ?, ?)
        `,
          [
            categoria.nome,
            categoria.descricao,
            categoria.tipo,
            categoria.icone,
            categoria.cor,
          ]
        )
        console.log(`✅ Categoria financeira '${categoria.nome}' criada`)
      }
    }

    console.log('🎉 Dados iniciais inseridos com sucesso!')
    console.log('📊 Resumo:')
    console.log(
      `   - ${categoriasIniciais.length} categorias de estoque disponíveis`
    )
    console.log(
      `   - ${categoriasFinanceirasIniciais.length} categorias financeiras disponíveis`
    )
    console.log('   - Sistema completo e pronto para uso!')
  } catch (error) {
    console.error('❌ Erro ao inserir dados iniciais:', error)
  }
}

async function limparDadosExemplo() {
  try {
    console.log('🧹 Limpando dados de exemplo...')

    // Remover alertas relacionados aos produtos de exemplo
    await db.run('DELETE FROM alertas_estoque')
    console.log('✅ Alertas de exemplo removidos')

    // Remover movimentações relacionadas aos produtos de exemplo
    await db.run('DELETE FROM movimentacoes_estoque')
    console.log('✅ Movimentações de exemplo removidas')

    // Remover produtos de exemplo
    await db.run('DELETE FROM produtos')
    console.log('✅ Produtos de exemplo removidos')

    // Resetar sequências (auto-increment)
    await db.run(
      'DELETE FROM sqlite_sequence WHERE name IN ("produtos", "movimentacoes_estoque", "alertas_estoque")'
    )
    console.log('✅ Sequências resetadas')

    console.log('🎉 Sistema limpo com sucesso!')
    console.log('📝 Agora você pode cadastrar seus produtos reais')
  } catch (error) {
    console.error('❌ Erro ao limpar dados de exemplo:', error)
  }
}

module.exports = { inserirDadosIniciais, limparDadosExemplo }
