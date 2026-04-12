export type UserRole = 'dentista' | 'colaborador';

export interface AuthUser {
  id: string;
  nome: string;
  role: UserRole;
}

export interface Dentista {
  id: string;
  nome: string;
  email: string;
  cro: string;
  especialidade: string;
  id_colaborador: string;
}

export interface Paciente {
  id: string;
  nome: string;
  cpf: string | null;
  data_nasc: string;
  telefone: string;
  email: string;
  id_dentista: string;
}

export type TipoAtendimento = 'Consulta' | 'Retorno' | 'Emergência' | 'Procedimento';
export type StatusAtendimento = 'Agendado' | 'Realizado' | 'Cancelado';

export interface Exame {
  tipo: string;
  requisitos: string;
  resultado: string;
}

export interface Atendimento {
  id: string;
  id_paciente: string;
  id_dentista: string;
  dt_atendimento: string;
  tipo: TipoAtendimento;
  status: StatusAtendimento;
  observacoes: string;
  exames: Exame[];
}

export interface Notificacao {
  id: string;
  mensagem: string;
  data_envio: string;
  lida: boolean;
  remetente_tipo: UserRole;
  remetente_id: string;
  destinatario_tipo: UserRole;
  destinatario_id: string;
}

export interface Anotacao {
  id: string;
  texto: string;
  data: string;
  autor_id: string;
  autor_tipo: UserRole;
  sobre_tipo: 'dentista' | 'paciente';
  sobre_id: string;
}
