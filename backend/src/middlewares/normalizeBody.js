function normalizeStatus(value) {
  if (!value) return value
  const normalized = String(value)
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

  // Mapeamentos da UI -> DB
  const map = new Map([
    ['recebido', 'aguardando'],
    ['em analise', 'em_andamento'],
    ['em analise', 'em_andamento'],
    ['aguardando pecas', 'aguardando_peca'],
    ['aguardando peca', 'aguardando_peca'],
    ['em reparo', 'em_andamento'],
    ['pronto', 'pronto'],
    ['entregue', 'entregue'],
    ['cancelado', 'cancelado'],
  ])

  if (map.has(normalized)) return map.get(normalized)

  // fallback: substituir espaços por underline e manter se estiver na lista válida
  const candidate = normalized.replace(/\s+/g, '_')
  const valid = ['aguardando','em_andamento','aguardando_peca','pronto','entregue','cancelado']
  if (valid.includes(candidate)) return candidate

  return value
}

function normalizeOrdemBody(req, _res, next) {
  try {
    if (req && req.body && typeof req.body.status !== 'undefined') {
      req.body.status = normalizeStatus(req.body.status)
    }
    next()
  } catch (e) {
    next()
  }
}

module.exports = { normalizeOrdemBody }