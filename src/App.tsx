import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Tela = 'painel' | 'importacao' | 'analise' | 'configuracao' | 'previsao' | 'vendas' | 'planejamento'
type Venda = { produto: string; data: string; quantidade: number; valor: string }

const vendasIniciais: Venda[] = [
  { produto: 'Café especial 250g', data: '08/11/2026', quantidade: 42, valor: 'R$ 1.260,00' },
  { produto: 'Kit café da manhã', data: '08/11/2026', quantidade: 28, valor: 'R$ 1.680,00' },
  { produto: 'Bolo de chocolate', data: '07/11/2026', quantidade: 35, valor: 'R$ 1.050,00' },
  { produto: 'Sanduíche natural', data: '07/11/2026', quantidade: 56, valor: 'R$ 1.120,00' },
]

const menu: Array<{ tela: Tela; icone: string; nome: string }> = [
  { tela: 'painel', icone: '⊞', nome: 'Painel' },
  { tela: 'importacao', icone: '⇧', nome: 'Importar dados' },
  { tela: 'analise', icone: '▥', nome: 'Análise dos dados' },
  { tela: 'configuracao', icone: '⚙', nome: 'Configurar previsão' },
  { tela: 'previsao', icone: '⌁', nome: 'Previsões' },
  { tela: 'vendas', icone: '▤', nome: 'Dados de vendas' },
  { tela: 'planejamento', icone: '✓', nome: 'Planejamento' },
]

function App() {
  const [autenticado, setAutenticado] = useState(false)
  const [tela, setTela] = useState<Tela>('painel')
  const [vendas, setVendas] = useState(vendasIniciais)
  const [dadosImportados, setDadosImportados] = useState(false)
  const [processando, setProcessando] = useState(false)
  const [notificacao, setNotificacao] = useState('')

  function notificar(mensagem: string) {
    setNotificacao(mensagem)
    window.setTimeout(() => setNotificacao(''), 3500)
  }

  function irParaProximaEtapa(proximaTela: Tela, mensagem?: string) {
    setTela(proximaTela)
    if (mensagem) notificar(mensagem)
  }

  function executarPrevisao() {
    setProcessando(true)
    window.setTimeout(() => {
      setProcessando(false)
      irParaProximaEtapa('previsao', 'Previsão processada com base no histórico importado.')
    }, 900)
  }

  if (!autenticado) return <TelaLogin onEntrar={() => setAutenticado(true)} />

  const informacoesTela: Record<Tela, { titulo: string; subtitulo: string }> = {
    painel: { titulo: 'Painel de demanda', subtitulo: 'Acompanhe a jornada completa dos dados da sua operação.' },
    importacao: { titulo: 'Importação de dados', subtitulo: 'Envie o histórico de vendas para iniciar a análise.' },
    analise: { titulo: 'Análise dos dados', subtitulo: 'Confira os indicadores encontrados no histórico importado.' },
    configuracao: { titulo: 'Configuração da previsão', subtitulo: 'Defina o período e inicie o processamento da estimativa.' },
    previsao: { titulo: 'Resultado da previsão', subtitulo: 'Estimativa para os próximos 7 dias com base no histórico de vendas.' },
    vendas: { titulo: 'Dados de vendas', subtitulo: 'Acompanhe e organize o histórico de vendas da sua operação.' },
    planejamento: { titulo: 'Apoio ao planejamento', subtitulo: 'Transforme a previsão em ações para os próximos dias.' },
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">⌁</span><strong>Demanda<span>+</span></strong></div>
        <nav>{menu.map((item) => <button key={item.tela} className={tela === item.tela ? 'active' : ''} onClick={() => setTela(item.tela)}><span>{item.icone}</span>{item.nome}</button>)}</nav>
        <button className="profile" onClick={() => notificar('Perfil de Maria Silva selecionado.')}><span className="avatar">M</span><span><b>Meu perfil</b><small>maria@exemplo.com</small></span><span>⚙</span></button>
      </aside>
      <main className="content">
        <header className="page-header"><div><h1>{informacoesTela[tela].titulo}</h1><p>{informacoesTela[tela].subtitulo}</p></div><div className="header-actions"><button className="button secondary" onClick={() => irParaProximaEtapa('importacao')}>＋ Importar histórico</button><button className="button primary" onClick={() => irParaProximaEtapa('analise')}>▣ Analisar dados</button></div></header>
        {tela === 'painel' && <PainelView dadosImportados={dadosImportados} onNavigate={irParaProximaEtapa} />}
        {tela === 'importacao' && <ImportacaoView importado={dadosImportados} onImportar={() => { setDadosImportados(true); irParaProximaEtapa('analise', 'Histórico importado com sucesso.') }} />}
        {tela === 'analise' && <AnaliseView importado={dadosImportados} onNavigate={irParaProximaEtapa} />}
        {tela === 'configuracao' && <ConfiguracaoView onProcessar={executarPrevisao} />}
        {tela === 'previsao' && <PrevisaoView onPlanejar={() => setTela('planejamento')} />}
        {tela === 'vendas' && <VendasView vendas={vendas} onRegistrar={(venda) => { setVendas((atuais) => [venda, ...atuais]); notificar('Venda registrada com sucesso.') }} />}
        {tela === 'planejamento' && <PlanejamentoView onVoltar={() => setTela('previsao')} />}
        {processando && <div className="modal-backdrop"><div className="modal processamento"><div className="spinner" /><h2>Processando previsão</h2><p>Analisando histórico, tendências e sazonalidade...</p></div></div>}
        {notificacao && <div className="notificacao" role="status">{notificacao}</div>}
      </main>
    </div>
  )
}

function TelaLogin({ onEntrar }: { onEntrar: () => void }) {
  function entrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    onEntrar()
  }
  return <main className="login-page"><section className="login-card"><div className="login-brand"><span className="brand-mark">⌁</span><strong>Demanda<span>+</span></strong></div><h1>Bem-vinda de volta</h1><p>Entre para acompanhar a demanda do seu negócio.</p><form onSubmit={entrar}><label>E-mail<input type="email" placeholder="maria@exemplo.com" defaultValue="maria@exemplo.com" required /></label><label>Senha<input type="password" placeholder="••••••••" defaultValue="123456" required /></label><button className="button primary">Entrar na plataforma</button></form><small>Protótipo navegável — acesso demonstrativo</small></section></main>
}

function PainelView({ dadosImportados, onNavigate }: { dadosImportados: boolean; onNavigate: (tela: Tela, mensagem?: string) => void }) {
  return <div className="stack"><section className="welcome panel"><div><span className="eyebrow">JORNADA DO USUÁRIO</span><h2>Olá, Maria! 👋</h2><p>Importe seu histórico e gere uma previsão para apoiar o planejamento.</p></div><button className="button primary" onClick={() => onNavigate(dadosImportados ? 'analise' : 'importacao')}>{dadosImportados ? 'Analisar dados' : 'Começar agora'}</button></section><section className="cards-3"><div className="small-card"><span>Histórico importado</span><strong>{dadosImportados ? '2.184' : '0'}</strong><small>{dadosImportados ? 'vendas disponíveis' : 'aguardando arquivo'}</small></div><div className="small-card"><span>Previsão atual</span><strong>{dadosImportados ? '590' : '—'}</strong><small>vendas nos próximos 7 dias</small></div><div className="small-card"><span>Status do processo</span><strong className="status-text">{dadosImportados ? 'Pronto' : 'Inicial'}</strong><small>{dadosImportados ? 'dados analisados' : 'importe um CSV'}</small></div></section><section className="panel"><div className="panel-heading"><div><h2>Fluxo do projeto</h2><p>Complete as etapas para chegar ao planejamento.</p></div></div><div className="stepper"><Etapa numero="1" nome="Importação" ativa={dadosImportados} /><Etapa numero="2" nome="Análise" ativa={dadosImportados} /><Etapa numero="3" nome="Previsão" ativa={false} /><Etapa numero="4" nome="Planejamento" ativa={false} /></div></section></div>
}

function Etapa({ numero, nome, ativa }: { numero: string; nome: string; ativa: boolean }) {
  return <div className={ativa ? 'step active' : 'step'}><span>{ativa ? '✓' : numero}</span><b>{nome}</b></div>
}

function ImportacaoView({ importado, onImportar }: { importado: boolean; onImportar: () => void }) {
  return <div className="stack"><section className="panel import-panel"><div className="upload-icon">⇧</div><h2>Importe seu histórico de vendas</h2><p>Envie um arquivo CSV com as colunas: produto, data, quantidade e valor.</p><button className="button primary" onClick={onImportar}>{importado ? '✓ Histórico importado — importar novamente' : 'Selecionar arquivo CSV'}</button><small>Para esta demonstração, o botão carrega dados de exemplo do projeto.</small></section><section className="panel"><h3>Formato esperado</h3><div className="code-sample">produto,data,quantidade,valor<br />Café especial 250g,08/11/2026,42,1260.00</div></section></div>
}

function AnaliseView({ importado, onNavigate }: { importado: boolean; onNavigate: (tela: Tela, mensagem?: string) => void }) {
  if (!importado) return <section className="panel empty-state"><h2>Nenhum histórico importado</h2><p>Importe um arquivo antes de analisar os dados.</p><button className="button primary" onClick={() => onNavigate('importacao')}>Importar histórico</button></section>
  return <div className="stack"><section className="cards-3"><div className="small-card"><span>Total de vendas</span><strong>2.184</strong><small className="positive">↑ 12,5% no período</small></div><div className="small-card"><span>Produtos identificados</span><strong>38</strong><small>catálogo analisado</small></div><div className="small-card"><span>Melhor dia</span><strong>Sábado</strong><small>maior concentração</small></div></section><section className="panel"><h2>Resumo da análise</h2><div className="analysis-list"><p>✓ A demanda apresenta tendência de crescimento.</p><p>✓ Sextas e sábados apresentam maior volume histórico.</p><p>✓ Alguns produtos concentram a maior parte das vendas.</p></div><button className="button primary" onClick={() => onNavigate('configuracao')}>Configurar previsão</button></section></div>
}

function ConfiguracaoView({ onProcessar }: { onProcessar: () => void }) {
  return <section className="panel configuration-panel"><span className="eyebrow">ETAPA DE PROCESSAMENTO</span><h2>Configure a previsão de demanda</h2><p>O protótipo utiliza o histórico importado para estimar o volume futuro.</p><div className="config-grid"><label>Período<select defaultValue="7"><option value="7">Próximos 7 dias</option><option value="14">Próximos 14 dias</option><option value="30">Próximos 30 dias</option></select></label><label>Base de análise<select defaultValue="historico"><option value="historico">Histórico completo</option><option value="recente">Últimas 4 semanas</option></select></label></div><button className="button primary" onClick={onProcessar}>Processar previsão</button></section>
}

function PrevisaoView({ onPlanejar }: { onPlanejar: () => void }) {
  return <div className="stack"><section className="summary-grid"><div className="forecast-card"><div className="label">Demanda prevista <em>Estimativa</em></div><strong>590</strong><p>vendas nos próximos 7 dias</p><div className="growth">⌃ &nbsp;+18%</div><span className="growth-note">maior que o período anterior</span></div><div className="metric-list"><div><span>Período anterior</span><b>500 vendas</b></div><div className="highlight"><span>Próximos 7 dias</span><b>590 vendas</b></div><div><span>Variação estimada</span><b>↑ +18%</b></div></div></section><section className="panel"><div className="panel-heading"><div><h2>Histórico e previsão</h2><p>Últimas 4 semanas + estimativa para os próximos 7 dias</p></div><div className="legend"><span><i />Histórico real</span><span><i className="estimated" />Estimativa</span></div></div><GraficoTendencia /></section><button className="button primary planning-button" onClick={onPlanejar}>Usar resultado no planejamento →</button></div>
}

function GraficoTendencia() {
  return <div className="chart" aria-label="Gráfico de histórico e previsão de vendas"><div className="chart-y"><span>640</span><span>580</span><span>520</span><span>460</span><span>400</span></div><svg viewBox="0 0 760 240" role="img" aria-label="Crescimento estimado de 500 para 590 vendas"><path d="M22 208 L170 180 L315 143 L455 120 L600 82 L738 42 L738 232 L22 232Z" fill="#78a88e22" /><path d="M22 208 L170 180 L315 143 L455 120" fill="none" stroke="#367858" strokeWidth="4" /><path d="M455 120 L530 98 L600 82 L670 62 L738 42" fill="none" stroke="#91b8a2" strokeWidth="4" strokeDasharray="7 8" /></svg><div className="chart-x"><span>Sem. 5</span><span>Sem. 6</span><span>Sem. 7</span><span>Sem. 8</span><span>D+1</span><span>D+2</span><span>D+3</span><span>D+4</span><span>D+5</span><span>D+6</span><span>D+7</span></div></div>
}

function VendasView({ vendas, onRegistrar }: { vendas: Venda[]; onRegistrar: (venda: Venda) => void }) {
  function registrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const dados = new FormData(evento.currentTarget)
    const quantidade = Number(dados.get('quantidade'))
    const preco = Number(dados.get('preco'))
    onRegistrar({ produto: String(dados.get('produto')), data: String(dados.get('data')).split('-').reverse().join('/'), quantidade, valor: `R$ ${(quantidade * preco).toFixed(2).replace('.', ',')}` })
    evento.currentTarget.reset()
  }
  return <div className="stack"><section className="panel sales-panel"><div className="panel-heading"><div><h2>Histórico de vendas</h2><p>Últimas vendas registradas no sistema</p></div></div><form className="inline-form" onSubmit={registrar}><select name="produto" aria-label="Produto"><option>Café especial 250g</option><option>Kit café da manhã</option><option>Bolo de chocolate</option><option>Sanduíche natural</option></select><input name="data" type="date" defaultValue="2026-11-09" required aria-label="Data" /><input name="quantidade" type="number" min="1" defaultValue="1" required aria-label="Quantidade" /><input name="preco" type="number" min="0.01" step="0.01" defaultValue="30" required aria-label="Preço unitário" /><button className="button primary">＋ Registrar venda</button></form><div className="table-wrap"><table><thead><tr><th>Produto</th><th>Data</th><th>Quantidade</th><th>Valor total</th></tr></thead><tbody>{vendas.map((item, index) => <tr key={`${item.produto}-${item.data}-${index}`}><td>{item.produto}</td><td>{item.data}</td><td>{item.quantidade} un.</td><td><b>{item.valor}</b></td></tr>)}</tbody></table></div></section></div>
}

function PlanejamentoView({ onVoltar }: { onVoltar: () => void }) {
  return <div className="stack"><section className="panel planning-hero"><span className="eyebrow">RESULTADO DA PREVISÃO</span><h2>Prepare sua operação para 590 vendas</h2><p>Use a estimativa para organizar compras, produção e capacidade de atendimento.</p></section><section className="insights-grid"><div className="panel insight"><h3>Compras e produção</h3><p>Planeje estoque para os dias de maior movimento, especialmente sexta e sábado.</p></div><div className="panel insight"><h3>Equipe e atendimento</h3><p>Avalie a capacidade da equipe para atender o crescimento estimado de 18%.</p></div><div className="panel insight"><h3>Ações comerciais</h3><p>Considere promoções em períodos de menor demanda para equilibrar o volume.</p></div><div className="panel insight"><h3>Próximo passo</h3><p>Atualize o histórico de vendas regularmente para melhorar as próximas estimativas.</p></div></section><button className="button secondary" onClick={onVoltar}>← Voltar para a previsão</button></div>
}

export default App
