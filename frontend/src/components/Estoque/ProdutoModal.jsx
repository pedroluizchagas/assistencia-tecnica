import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider,
  InputAdornment,
  Alert,
  Chip,
  Stack,
} from '@mui/material'
import {
  Save as SaveIcon,
  Close as CloseIcon,
  QrCode as QrCodeIcon,
  LocalOffer as LocalOfferIcon,
  QrCodeScanner as QrCodeScannerIcon,
} from '@mui/icons-material'
import { produtoService } from '../../services/produtoService'

const ProdutoModal = ({ open, produto, modo = 'criar', onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    codigo_barras: '',
    codigo_interno: '',
    categoria_id: '',
    tipo: 'peca',
    preco_custo: '',
    preco_venda: '',
    margem_lucro: '',
    estoque_atual: '',
    estoque_minimo: '5',
    estoque_maximo: '100',
    localizacao: '',
    observacoes: '',
    ativo: true,
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [categorias, setCategorias] = useState([])

  // Buscar categorias da API
  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const data = await produtoService.listarCategorias()
        setCategorias(data || [])
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
        // Usar categorias padrão em caso de erro
        setCategorias([
          { id: 1, nome: 'Displays' },
          { id: 2, nome: 'Baterias' },
          { id: 3, nome: 'Conectores' },
          { id: 4, nome: 'Placas' },
          { id: 5, nome: 'Capas' },
          { id: 6, nome: 'Fones' },
          { id: 7, nome: 'Carregadores' },
          { id: 8, nome: 'Ferramentas' },
        ])
      }
    }

    if (open) {
      carregarCategorias()
    }
  }, [open])

  useEffect(() => {
    if (produto && (modo === 'editar' || modo === 'visualizar')) {
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        codigo_barras: produto.codigo_barras || '',
        codigo_interno: produto.codigo_interno || '',
        categoria_id: produto.categoria_id || '',
        tipo: produto.tipo || 'peca',
        preco_custo: produto.preco_custo || '',
        preco_venda: produto.preco_venda || '',
        margem_lucro: produto.margem_lucro || '',
        estoque_atual: produto.estoque_atual || '',
        estoque_minimo: produto.estoque_minimo || '5',
        estoque_maximo: produto.estoque_maximo || '100',
        localizacao: produto.localizacao || '',
        observacoes: produto.observacoes || '',
        ativo: produto.ativo !== 0,
      })
    } else if (modo === 'criar') {
      setFormData({
        nome: '',
        descricao: '',
        codigo_barras: '',
        codigo_interno: '',
        categoria_id: '',
        tipo: 'peca',
        preco_custo: '',
        preco_venda: '',
        margem_lucro: '',
        estoque_atual: '',
        estoque_minimo: '5',
        estoque_maximo: '100',
        localizacao: '',
        observacoes: '',
        ativo: true,
      })
    }
    setErrors({})
  }, [produto, modo, open])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Calcular margem de lucro automaticamente
    if (field === 'preco_custo' || field === 'preco_venda') {
      const custo =
        field === 'preco_custo'
          ? parseFloat(value) || 0
          : parseFloat(formData.preco_custo) || 0
      const venda =
        field === 'preco_venda'
          ? parseFloat(value) || 0
          : parseFloat(formData.preco_venda) || 0

      if (custo > 0 && venda > 0) {
        const margem = ((venda - custo) / custo) * 100
        setFormData((prev) => ({ ...prev, margem_lucro: margem.toFixed(2) }))
      }
    }

    // Limpar erro do campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.categoria_id) {
      newErrors.categoria_id = 'Categoria é obrigatória'
    }

    if (formData.preco_custo && formData.preco_custo < 0) {
      newErrors.preco_custo = 'Preço de custo não pode ser negativo'
    }

    if (formData.preco_venda && formData.preco_venda < 0) {
      newErrors.preco_venda = 'Preço de venda não pode ser negativo'
    }

    if (formData.estoque_atual && formData.estoque_atual < 0) {
      newErrors.estoque_atual = 'Estoque não pode ser negativo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave({
        ...formData,
        preco_custo: parseFloat(formData.preco_custo) || 0,
        preco_venda: parseFloat(formData.preco_venda) || 0,
        margem_lucro: parseFloat(formData.margem_lucro) || 0,
        estoque_atual: parseInt(formData.estoque_atual) || 0,
        estoque_minimo: parseInt(formData.estoque_minimo) || 5,
        estoque_maximo: parseInt(formData.estoque_maximo) || 100,
      })
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
    } finally {
      setLoading(false)
    }
  }

  const isReadOnly = modo === 'visualizar'
  const title = {
    criar: 'Novo Produto',
    editar: 'Editar Produto',
    visualizar: 'Detalhes do Produto',
  }[modo]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          {modo === 'visualizar' && produto && (
            <Stack direction="row" spacing={1}>
              <Chip
                size="small"
                color={produto.tipo === 'peca' ? 'primary' : 'secondary'}
                label={produto.tipo === 'peca' ? 'Peça' : 'Acessório'}
              />
              <Chip
                size="small"
                color={produto.ativo ? 'success' : 'default'}
                label={produto.ativo ? 'Ativo' : 'Inativo'}
              />
            </Stack>
          )}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Informações Básicas */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              📝 Informações Básicas
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Nome do Produto"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              error={!!errors.nome}
              helperText={errors.nome}
              disabled={isReadOnly}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              error={!!errors.categoria_id}
              disabled={isReadOnly}
              required
            >
              <InputLabel>Categoria</InputLabel>
              <Select
                value={formData.categoria_id}
                label="Categoria"
                onChange={(e) => handleChange('categoria_id', e.target.value)}
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              disabled={isReadOnly}
              multiline
              rows={2}
            />
          </Grid>

          {/* Códigos e Identificação */}
          <Grid item xs={12}>
            <Divider />
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ mt: 2 }}
            >
              🏷️ Códigos e Identificação
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth disabled={isReadOnly}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={formData.tipo}
                label="Tipo"
                onChange={(e) => handleChange('tipo', e.target.value)}
              >
                <MenuItem value="peca">Peça</MenuItem>
                <MenuItem value="acessorio">Acessório</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Código Interno"
              value={formData.codigo_interno}
              onChange={(e) => handleChange('codigo_interno', e.target.value)}
              disabled={isReadOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Código de Barras"
              value={formData.codigo_barras}
              onChange={(e) => handleChange('codigo_barras', e.target.value)}
              disabled={isReadOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QrCodeIcon />
                  </InputAdornment>
                ),
                endAdornment: !isReadOnly && (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      startIcon={<QrCodeScannerIcon />}
                      onClick={() => {
                        // Funcionalidade de scanner será implementada aqui
                        alert(
                          'Scanner em breve! Use o QR Code na aba Scanner do Estoque.'
                        )
                      }}
                    >
                      Scan
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Preços */}
          <Grid item xs={12}>
            <Divider />
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ mt: 2 }}
            >
              💰 Preços e Margem
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Preço de Custo"
              type="number"
              value={formData.preco_custo}
              onChange={(e) => handleChange('preco_custo', e.target.value)}
              error={!!errors.preco_custo}
              helperText={errors.preco_custo}
              disabled={isReadOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Preço de Venda"
              type="number"
              value={formData.preco_venda}
              onChange={(e) => handleChange('preco_venda', e.target.value)}
              error={!!errors.preco_venda}
              helperText={errors.preco_venda}
              disabled={isReadOnly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Margem de Lucro"
              value={formData.margem_lucro}
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          {/* Integração Financeira */}
          <Grid item xs={12}>
            <Divider />
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ mt: 2 }}
            >
              💳 Integração Financeira
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>🏷️ Categoria Financeira Automática:</strong> Todas as
                compras de estoque (movimentações de entrada com motivo
                "compra") serão automaticamente registradas no módulo financeiro
                como <strong>"Compra de Estoque"</strong>, independente da
                categoria específica do produto. Isso simplifica o controle
                financeiro mantendo a organização interna do estoque.
              </Typography>
            </Alert>
          </Grid>

          {/* Estoque */}
          <Grid item xs={12}>
            <Divider />
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ mt: 2 }}
            >
              📦 Controle de Estoque
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Estoque Atual"
              type="number"
              value={formData.estoque_atual}
              onChange={(e) => handleChange('estoque_atual', e.target.value)}
              error={!!errors.estoque_atual}
              helperText={
                errors.estoque_atual ||
                (modo === 'criar'
                  ? 'Quantidade inicial'
                  : 'Para alterar, use Movimentar')
              }
              disabled={isReadOnly || modo === 'editar'}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Estoque Mínimo"
              type="number"
              value={formData.estoque_minimo}
              onChange={(e) => handleChange('estoque_minimo', e.target.value)}
              disabled={isReadOnly}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Estoque Máximo"
              type="number"
              value={formData.estoque_maximo}
              onChange={(e) => handleChange('estoque_maximo', e.target.value)}
              disabled={isReadOnly}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Localização"
              value={formData.localizacao}
              onChange={(e) => handleChange('localizacao', e.target.value)}
              disabled={isReadOnly}
              placeholder="Ex: Prateleira A1"
            />
          </Grid>

          {/* Observações */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observações"
              value={formData.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              disabled={isReadOnly}
              multiline
              rows={2}
            />
          </Grid>

          {/* Alertas */}
          {modo === 'editar' && (
            <Grid item xs={12}>
              <Alert severity="info">
                Para alterar o estoque atual, use a função "Movimentar Estoque"
                para manter o histórico de movimentações.
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseIcon />}>
          {isReadOnly ? 'Fechar' : 'Cancelar'}
        </Button>
        {!isReadOnly && (
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ProdutoModal
