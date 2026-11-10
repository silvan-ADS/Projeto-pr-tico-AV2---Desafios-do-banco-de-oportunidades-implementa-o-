import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Tela = 'painel' | 'previsoes' | 'vendas'

type Venda = {
  produto: string
  data: string
  quantidade: number
  valor: string
}

const vendasIniciais: Venda[] = [
  { produto: 'Café especial 250g', data: '08/11/2026', quantidade: 42, valor: 'R$ 1.260,00' },
  { produto: 'Kit café da manhã', data: '08/11/2026', quantidade: 28, valor: 'R$ 1.680,00' },
  { produto: 'Bolo de chocolate', data: '07/11/2026', quantidade: 35, valor: 'R$ 1.050,00' },
  { produto: 'Sanduíche natural', data: '07/11/2026', quantidade: 56, valor: 'R$ 1.120,00' },
]

function GraficoTendencia() {
  return (
    <div className="chart" aria-label="Gráfico de histórico e previsão de vendas">
      <div className="chart-y"><span>640</span><span>580</span><span>520</span><span>460</span><span>400</span></div>
      <svg viewBox="0 0 760 240" role="img" aria-label="Crescimento estimado de 500 para 590 vendas">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#78a88e" stopOpacity=".22" />
            <stop offset="1" stopColor="#78a88e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M22 208 L170 180 L315 143 L455 120 L600 82 L738 42 L738 232 L22 232Z" fill="url(#area)" />
        <path d="M22 208 L170 180 L315 143 L455 120" fill="none" stroke="#367858" strokeWidth="4" strokeLinecap="round" />
        <path d="M455 120 L530 98 L600 82 L670 62 L738 42" fill="none" stroke="#91b8a2" strokeWidth="4" strokeDasharray="7 8" strokeLinecap="round" />
        {[22, 170, 315, 455, 530, 600, 670, 738].map((x, index) => (
          <circle key={x} cx={x} cy={[208, 180, 143, 120, 98, 82, 62, 42][index]} r="5" fill={index < 4 ? '#367858' : '#91b8a2'} />
        ))}
        <line x1="0" x2="760" y1="232" y2="232" stroke="#d7e1dc" />
      </svg>
      <div className="chart-x"><span>Sem. 5</span><span>Sem. 6</span><span>Sem. 7</span><span>Sem. 8</span><span>D+1</span><span>D+2</span><span>D+3</span><span>D+4</span><span>D+5</span><span>D+6</span><span>D+7</span></div>
    </div>
  )
}

function App() {
  const [tela, setTela] = useState<Tela>('previsoes')
  const [vendas, setVendas] = useState(vendasIniciais)
  const [modal, setModal] = useState<'venda' | 'previsao' | null>(null)
  const [notificacao, setNotificacao] = useState('')

  const titulo = tela === 'previsoes' ? 'Previsão de demanda' : tela === 'vendas' ? 'Dados de vendas' : 'Painel'
  const subtitulo = tela === 'previsoes'
    ? 'Estimativa para os próximos 7 dias com base no histórico de vendas.'
    : tela === 'vendas' ? 'Acompanhe e organize o histórico de vendas da sua operação.' : 'Uma visão geral do desempenho da sua operação.'

  function mostrarNotificacao(mensagem: string) {
    setNotificacao(mensagem)
    window.setTimeout(() => setNotificacao(''), 3500)
  }

  function abrirPrevisao() {
    setModal('previsao')
  }

  function registrarVenda(venda: Venda) {
    setVendas((vendasAtuais) => [venda, ...vendasAtuais])
    setModal(null)
    setTela('vendas')
    mostrarNotificacao('Venda registrada com sucesso.')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">⌁</span><strong>Demanda<span>+</span></strong></div>
        <nav>
            <button className={tela === 'painel' ? 'active' : ''} onClick={() => setTela('painel')}><span>⊞</span> Painel</button>
            <button className={tela === 'previsoes' ? 'active' : ''} onClick={() => setTela('previsoes')}><span>⌁</span> Previsões</button>
            <button className={tela === 'vendas' ? 'active' : ''} onClick={() => setTela('vendas')}><span>▥</span> Dados de vendas</button>
        </nav>
        <button className="profile" onClick={() => mostrarNotificacao('Perfil de Maria Silva selecionado.')}><span className="avatar">M</span><span><b>Meu perfil</b><small>maria@exemplo.com</small></span><span>⚙</span></button>
      </aside>
      <main className="content">
        <header className="page-header"><div><h1>{titulo}</h1><p>{subtitulo}</p></div><div className="header-actions"><button className="button secondary" onClick={abrirPrevisao}>＋ Nova previsão</button><button className="button primary" onClick={abrirPrevisao}>▣ Planejar próximos dias</button></div></header>
        {tela === 'previsoes' && <PrevisaoView />}
        {tela === 'vendas' && <VendasView vendas={vendas} onRegistrar={() => setModal('venda')} />}
        {tela === 'painel' && <PainelView onNavigate={setTela} onPrever={abrirPrevisao} />}
        {modal === 'venda' && <ModalVenda onClose={() => setModal(null)} onSubmit={registrarVenda} />}
        {modal === 'previsao' && <ModalPrevisao onClose={() => setModal(null)} onSubmit={(mensagem) => { setModal(null); setTela('previsoes'); mostrarNotificacao(mensagem) }} />}
        {notificacao && <div className="notificacao" role="status">{notificacao}</div>}
      </main>
    </div>
  )
}

function PrevisaoView() {
  return <div className="stack">
    <section className="summary-grid">
      <div className="forecast-card"><div className="label">Demanda prevista <em>Estimativa</em></div><strong>590</strong><p>vendas nos próximos 7 dias</p><div className="growth">⌃ &nbsp;+18%</div><span className="growth-note">maior que o período anterior</span></div>
      <div className="metric-list"><div><span>Período anterior</span><b>500 vendas</b></div><div className="highlight"><span>Próximos 7 dias</span><b>590 vendas</b></div><div><span>Variação estimada</span><b>↑ +18%</b></div></div>
    </section>
    <section className="panel"><div className="panel-heading"><div><h2>Histórico e previsão</h2><p>Últimas 4 semanas + estimativa para os próximos 7 dias</p></div><div className="legend"><span><i className="real" />Histórico real</span><span><i className="estimated" />Estimativa</span></div></div><GraficoTendencia /></section>
    <section className="insights-grid"><div className="panel insight"><h3>Comportamento esperado</h3><p>A demanda apresenta tendência de crescimento em relação ao período anterior.</p><p>Sextas e sábados apresentam maior volume histórico.</p><p>Alguns produtos concentram maior parte das vendas em determinados dias.</p></div><div className="panel insight"><h3>Pontos para planejamento</h3><p>Avaliar a capacidade de atendimento para os dias de maior demanda.</p><p>Planejar compras e produção de acordo com o volume esperado.</p><p>Considerar ações comerciais em períodos de menor demanda.</p></div></section>
  </div>
}

function VendasView({ vendas, onRegistrar }: { vendas: Venda[]; onRegistrar: () => void }) {
  return <section className="panel sales-panel"><div className="panel-heading"><div><h2>Histórico de vendas</h2><p>Últimas vendas registradas no sistema</p></div><button className="button primary" onClick={onRegistrar}>＋ Registrar venda</button></div><div className="table-wrap"><table><thead><tr><th>Produto</th><th>Data</th><th>Quantidade</th><th>Valor total</th></tr></thead><tbody>{vendas.map((item, index) => <tr key={`${item.produto}-${item.data}-${index}`}><td>{item.produto}</td><td>{item.data}</td><td>{item.quantidade} un.</td><td><b>{item.valor}</b></td></tr>)}</tbody></table></div></section>
}

function PainelView({ onNavigate, onPrever }: { onNavigate: (tela: Tela) => void; onPrever: () => void }) {
  return <div className="stack"><section className="welcome panel"><div><span className="eyebrow">VISÃO GERAL</span><h2>Olá, Maria! 👋</h2><p>Acompanhe os principais indicadores da sua operação hoje.</p></div><button className="button primary" onClick={onPrever}>Ver previsão</button></section><section className="cards-3"><div className="small-card"><span>Vendas este mês</span><strong>2.184</strong><small className="positive">↑ 12,5% vs. mês anterior</small></div><div className="small-card"><span>Ticket médio</span><strong>R$ 42,80</strong><small className="positive">↑ 5,2% vs. mês anterior</small></div><div className="small-card"><span>Produtos ativos</span><strong>38</strong><small>Catálogo atualizado</small></div></section><section className="panel"><div className="panel-heading"><div><h2>Próximos passos</h2><p>Use seus dados para tomar decisões melhores.</p></div></div><div className="next-actions"><button onClick={() => onNavigate('vendas')}><span>▥</span><b>Adicionar vendas</b><small>Atualize seu histórico</small></button><button onClick={onPrever}><span>⌁</span><b>Gerar previsão</b><small>Planeje os próximos 7 dias</small></button></div></section></div>
}

function ModalVenda({ onClose, onSubmit }: { onClose: () => void; onSubmit: (venda: Venda) => void }) {
  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)
    const quantidade = Number(dados.get('quantidade'))
    const preco = Number(dados.get('preco'))
    onSubmit({ produto: String(dados.get('produto')), data: String(dados.get('data')).split('-').reverse().join('/'), quantidade, valor: `R$ ${(quantidade * preco).toFixed(2).replace('.', ',')}` })
  }
  return <div className="modal-backdrop" onMouseDown={(evento) => evento.target === evento.currentTarget && onClose()}><form className="modal" onSubmit={enviar}><div className="modal-heading"><div><h2>Registrar venda</h2><p>Adicione uma venda ao histórico local.</p></div><button type="button" className="fechar" onClick={onClose}>×</button></div><label>Produto<select name="produto" required><option>Café especial 250g</option><option>Kit café da manhã</option><option>Bolo de chocolate</option><option>Sanduíche natural</option></select></label><div className="form-grid"><label>Data<input name="data" type="date" defaultValue="2026-11-09" required /></label><label>Quantidade<input name="quantidade" type="number" min="1" defaultValue="1" required /></label></div><label>Preço unitário<input name="preco" type="number" min="0.01" step="0.01" defaultValue="30" required /></label><div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancelar</button><button className="button primary">Salvar venda</button></div></form></div>
}

function ModalPrevisao({ onClose, onSubmit }: { onClose: () => void; onSubmit: (mensagem: string) => void }) {
  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)
    onSubmit(`Previsão gerada para os próximos ${dados.get('dias')} dias.`)
  }
  return <div className="modal-backdrop" onMouseDown={(evento) => evento.target === evento.currentTarget && onClose()}><form className="modal" onSubmit={enviar}><div className="modal-heading"><div><h2>Nova previsão</h2><p>Configure o período da estimativa de demanda.</p></div><button type="button" className="fechar" onClick={onClose}>×</button></div><label>Período da previsão<select name="dias"><option value="7">Próximos 7 dias</option><option value="14">Próximos 14 dias</option><option value="30">Próximos 30 dias</option></select></label><div className="previsao-resumo"><b>Estimativa atual: 590 vendas</b><span>Baseada no histórico de vendas cadastrado.</span></div><div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancelar</button><button className="button primary">Gerar previsão</button></div></form></div>
}

export default App
