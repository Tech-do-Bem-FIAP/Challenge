import type { Dentista, Paciente, Atendimento, Notificacao, Anotacao } from '../types';

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_DENTISTAS: Dentista[] = [
  {
    id: 'den-1',
    nome: 'Dr. Felipe Mendes',
    email: 'dentista',
    cro: '123456-SP',
    especialidade: 'Clínica Geral',
    id_colaborador: 'col-1',
  },
];

const SEED_PACIENTES: Paciente[] = [
  {
    id: 'pac-1',
    nome: 'Maria Silva',
    cpf: null,
    data_nasc: '1985-03-15',
    telefone: '(11) 98765-4321',
    email: 'maria@exemplo.com',
    id_dentista: 'den-1',
  },
  {
    id: 'pac-2',
    nome: 'João Santos',
    cpf: '012.345.678-90',
    data_nasc: '1972-07-22',
    telefone: '(11) 97654-3210',
    email: 'joao@exemplo.com',
    id_dentista: 'den-1',
  },
  {
    id: 'pac-3',
    nome: 'Ana Costa',
    cpf: null,
    data_nasc: '1995-11-08',
    telefone: '(11) 96543-2109',
    email: 'ana@exemplo.com',
    id_dentista: 'den-1',
  },
];

const SEED_ATENDIMENTOS: Atendimento[] = [
  {
    id: 'ate-1',
    id_paciente: 'pac-1',
    id_dentista: 'den-1',
    dt_atendimento: '2026-04-10T09:00',
    tipo: 'Consulta',
    status: 'Agendado',
    observacoes: '',
    exames: [],
  },
  {
    id: 'ate-2',
    id_paciente: 'pac-2',
    id_dentista: 'den-1',
    dt_atendimento: '2026-03-20T14:00',
    tipo: 'Retorno',
    status: 'Realizado',
    observacoes: 'Tratamento de canal concluído com sucesso.',
    exames: [
      { tipo: 'Radiografia Periapical', requisitos: 'Dente 36', resultado: 'Canal obturado sem alterações' },
    ],
  },
  {
    id: 'ate-3',
    id_paciente: 'pac-3',
    id_dentista: 'den-1',
    dt_atendimento: '2026-04-15T10:30',
    tipo: 'Procedimento',
    status: 'Agendado',
    observacoes: 'Exame pré-operatório solicitado.',
    exames: [
      { tipo: 'Hemograma Completo', requisitos: 'Em jejum de 8 horas', resultado: '' },
    ],
  },
  {
    id: 'ate-4',
    id_paciente: 'pac-1',
    id_dentista: 'den-1',
    dt_atendimento: '2026-02-10T09:00',
    tipo: 'Consulta',
    status: 'Realizado',
    observacoes: 'Primeira consulta — anamnese realizada.',
    exames: [],
  },
];

const SEED_NOTIFICACOES: Notificacao[] = [
  {
    id: 'not-1',
    mensagem: 'Por favor, confirme sua disponibilidade para a semana de 14/04.',
    data_envio: '2026-04-05T08:30',
    lida: false,
    remetente_tipo: 'colaborador',
    remetente_id: 'col-1',
    destinatario_tipo: 'dentista',
    destinatario_id: 'den-1',
  },
  {
    id: 'not-2',
    mensagem: 'Novo paciente Ana Costa foi cadastrado e vinculado a você.',
    data_envio: '2026-04-01T11:00',
    lida: true,
    remetente_tipo: 'colaborador',
    remetente_id: 'col-1',
    destinatario_tipo: 'dentista',
    destinatario_id: 'den-1',
  },
  {
    id: 'not-3',
    mensagem: 'Atendimento de João Santos realizado em 20/03. Canal concluído.',
    data_envio: '2026-03-20T15:00',
    lida: false,
    remetente_tipo: 'dentista',
    remetente_id: 'den-1',
    destinatario_tipo: 'colaborador',
    destinatario_id: 'col-1',
  },
];

const SEED_ANOTACOES: Anotacao[] = [
  {
    id: 'ano-1',
    texto: 'Dr. Felipe é muito comprometido, sempre cumpre os horários e mantém o histórico atualizado.',
    data: '2026-04-01',
    autor_id: 'col-1',
    autor_tipo: 'colaborador',
    sobre_tipo: 'dentista',
    sobre_id: 'den-1',
  },
  {
    id: 'ano-2',
    texto: 'Paciente Ana Costa apresenta ansiedade pré-procedimento — recomendo abordagem calma na recepção.',
    data: '2026-04-05',
    autor_id: 'den-1',
    autor_tipo: 'dentista',
    sobre_tipo: 'paciente',
    sobre_id: 'pac-3',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getOrInit<T>(key: string, seed: T): T {
  const stored = localStorage.getItem(key);
  if (stored !== null) return JSON.parse(stored) as T;
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Dentistas ─────────────────────────────────────────────────────────────────

export function getDentistas(): Dentista[] {
  return getOrInit('tdb_dentistas', SEED_DENTISTAS);
}

export function getDentistasByColaborador(colaboradorId: string): Dentista[] {
  return getDentistas().filter((d) => d.id_colaborador === colaboradorId);
}

// ─── Pacientes ─────────────────────────────────────────────────────────────────

export function getPacientes(): Paciente[] {
  return getOrInit('tdb_pacientes', SEED_PACIENTES);
}

export function getPacientesByDentista(dentistaId: string): Paciente[] {
  return getPacientes().filter((p) => p.id_dentista === dentistaId);
}

// ─── Atendimentos ──────────────────────────────────────────────────────────────

export function getAtendimentos(): Atendimento[] {
  return getOrInit('tdb_atendimentos', SEED_ATENDIMENTOS);
}

export function getAtendimentosByDentista(dentistaId: string): Atendimento[] {
  return getAtendimentos().filter((a) => a.id_dentista === dentistaId);
}

export function saveAtendimento(atendimento: Atendimento): void {
  const list = getAtendimentos();
  const idx = list.findIndex((a) => a.id === atendimento.id);
  if (idx >= 0) list[idx] = atendimento;
  else list.push(atendimento);
  save('tdb_atendimentos', list);
}

// ─── Notificações ──────────────────────────────────────────────────────────────

export function getNotificacoes(): Notificacao[] {
  return getOrInit('tdb_notificacoes', SEED_NOTIFICACOES);
}

export function getNotificacoesParaUser(userId: string): Notificacao[] {
  return getNotificacoes()
    .filter((n) => n.destinatario_id === userId)
    .sort((a, b) => b.data_envio.localeCompare(a.data_envio));
}

export function saveNotificacao(n: Notificacao): void {
  const list = getNotificacoes();
  list.push(n);
  save('tdb_notificacoes', list);
}

export function marcarNotificacaoLida(id: string): void {
  const list = getNotificacoes();
  const n = list.find((n) => n.id === id);
  if (n) n.lida = true;
  save('tdb_notificacoes', list);
}

// ─── Anotações ─────────────────────────────────────────────────────────────────

export function getAnotacoes(): Anotacao[] {
  return getOrInit('tdb_anotacoes', SEED_ANOTACOES);
}

export function getAnotacoesSobre(sobreId: string): Anotacao[] {
  return getAnotacoes()
    .filter((a) => a.sobre_id === sobreId)
    .sort((a, b) => b.data.localeCompare(a.data));
}

export function saveAnotacao(a: Anotacao): void {
  const list = getAnotacoes();
  list.push(a);
  save('tdb_anotacoes', list);
}
