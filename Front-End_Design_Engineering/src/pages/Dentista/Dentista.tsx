import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Users, CalendarDays, Bell, Plus, CheckCheck, AlertCircle } from 'lucide-react';
import { DashboardHeader } from '../../components/DashboardHeader/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import {
  getPacientesByDentista,
  getAtendimentosByDentista,
  saveAtendimento,
  getNotificacoesParaUser,
  saveNotificacao,
  marcarNotificacaoLida,
  getAnotacoesSobre,
  saveAnotacao,
  getDentistas,
} from '../../data/storage';
import type {
  Paciente,
  Atendimento,
  Notificacao,
  Anotacao,
  TipoAtendimento,
  StatusAtendimento,
} from '../../types';

type Tab = 'pacientes' | 'atendimentos' | 'notificacoes';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function nextAppointment(atendimentos: Atendimento[], pacienteId: string): string | null {
  const hoje = new Date().toISOString();
  const upcoming = atendimentos
    .filter((a) => a.id_paciente === pacienteId && a.status === 'Agendado' && a.dt_atendimento >= hoje)
    .sort((a, b) => a.dt_atendimento.localeCompare(b.dt_atendimento));
  return upcoming[0]?.dt_atendimento ?? null;
}

function lastAppointment(atendimentos: Atendimento[], pacienteId: string): string | null {
  const hoje = new Date().toISOString();
  const past = atendimentos
    .filter((a) => a.id_paciente === pacienteId && a.status === 'Realizado' && a.dt_atendimento < hoje)
    .sort((a, b) => b.dt_atendimento.localeCompare(a.dt_atendimento));
  return past[0]?.dt_atendimento ?? null;
}

function hasExamesPendentes(atendimentos: Atendimento[], pacienteId: string): boolean {
  return atendimentos
    .filter((a) => a.id_paciente === pacienteId)
    .some((a) => a.exames.some((e) => !e.resultado));
}

// ─── Tabs nav ────────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string; Icon: React.ElementType }[] = [
  { key: 'pacientes', label: 'Pacientes', Icon: Users },
  { key: 'atendimentos', label: 'Atendimentos', Icon: CalendarDays },
  { key: 'notificacoes', label: 'Notificações', Icon: Bell },
];

// ─── Pacientes tab ──────────────────────────────────────────────────────────

type NotesModal = { paciente: Paciente } | null;

function PacientesTab({ dentistaId }: { dentistaId: string }) {
  const pacientes = getPacientesByDentista(dentistaId);
  const atendimentos = getAtendimentosByDentista(dentistaId);
  const [notesModal, setNotesModal] = useState<NotesModal>(null);
  const [notes, setNotes] = useState<Anotacao[]>([]);
  const [newNote, setNewNote] = useState('');

  const openNotes = (p: Paciente) => {
    setNotesModal({ paciente: p });
    setNotes(getAnotacoesSobre(p.id));
    setNewNote('');
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !notesModal) return;
    const a: Anotacao = {
      id: `ano-${Date.now()}`,
      texto: newNote.trim(),
      data: new Date().toISOString().slice(0, 10),
      autor_id: dentistaId,
      autor_tipo: 'dentista',
      sobre_tipo: 'paciente',
      sobre_id: notesModal.paciente.id,
    };
    saveAnotacao(a);
    setNotes(getAnotacoesSobre(notesModal.paciente.id));
    setNewNote('');
  };

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-semibold text-[#232323]">Meus Pacientes</h2>

        {pacientes.length === 0 && (
          <p className="text-center text-[#d4d4d4] py-10">Nenhum paciente vinculado.</p>
        )}

        {pacientes.map((p) => {
          const next = nextAppointment(atendimentos, p.id);
          const last = lastAppointment(atendimentos, p.id);
          const pending = hasExamesPendentes(atendimentos, p.id);

          return (
            <div
              key={p.id}
              className="bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-[#641226]">{p.nome}</p>
                    {pending && (
                      <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                        <AlertCircle className="w-3 h-3" /> Exame pendente
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#232323]">
                    <span className="text-[#d4d4d4]">Tel:</span> {p.telefone}
                  </p>
                  <p className="text-sm text-[#232323]">
                    <span className="text-[#d4d4d4]">Próximo:</span>{' '}
                    {next ? formatDate(next) : <span className="text-[#d4d4d4]">—</span>}
                  </p>
                  <p className="text-sm text-[#232323]">
                    <span className="text-[#d4d4d4]">Último:</span>{' '}
                    {last ? formatDate(last) : <span className="text-[#d4d4d4]">—</span>}
                  </p>
                </div>
                <button
                  onClick={() => openNotes(p)}
                  className="text-xs text-[#da345d] hover:text-[#641226] font-medium border border-[#da345d] rounded-full px-3 py-1 transition-colors shrink-0"
                >
                  Anotações
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notes modal */}
      {notesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl max-h-[80vh] flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-[#641226]">
                Anotações — {notesModal.paciente.nome}
              </h3>
            </div>
            <div className="overflow-y-auto flex-1 p-5 space-y-3">
              {notes.length === 0 && (
                <p className="text-sm text-[#d4d4d4] text-center py-4">Sem anotações.</p>
              )}
              {notes.map((a) => (
                <div key={a.id} className="bg-[#f1f1f1] rounded-lg p-3">
                  <p className="text-sm text-[#232323]">{a.texto}</p>
                  <p className="text-xs text-[#d4d4d4] mt-1">{formatDate(a.data)}</p>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-gray-100 space-y-3">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
                placeholder="Nova anotação..."
                className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d] resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddNote}
                  className="flex-1 bg-[#da345d] hover:bg-[#641226] text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setNotesModal(null)}
                  className="flex-1 bg-[#f1f1f1] hover:bg-gray-200 text-[#232323] py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Atendimentos tab ────────────────────────────────────────────────────────

type AtendimentoForm = {
  id_paciente: string;
  dt_atendimento: string;
  tipo: TipoAtendimento;
  status: StatusAtendimento;
  observacoes: string;
  addExame: boolean;
  exame_tipo: string;
  exame_requisitos: string;
};

function AtendimentosTab({ dentistaId }: { dentistaId: string }) {
  const pacientes = getPacientesByDentista(dentistaId);
  const [atendimentos, setAtendimentos] = useState(() => getAtendimentosByDentista(dentistaId));
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<StatusAtendimento | 'Todos'>('Todos');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AtendimentoForm>({ defaultValues: { addExame: false } });

  const addExame = watch('addExame');

  const onSubmit = (data: AtendimentoForm) => {
    const a: Atendimento = {
      id: `ate-${Date.now()}`,
      id_paciente: data.id_paciente,
      id_dentista: dentistaId,
      dt_atendimento: data.dt_atendimento,
      tipo: data.tipo,
      status: data.status,
      observacoes: data.observacoes,
      exames:
        data.addExame && data.exame_tipo
          ? [{ tipo: data.exame_tipo, requisitos: data.exame_requisitos, resultado: '' }]
          : [],
    };
    saveAtendimento(a);
    setAtendimentos(getAtendimentosByDentista(dentistaId));
    reset();
    setShowForm(false);
  };

  const filtered =
    filter === 'Todos' ? atendimentos : atendimentos.filter((a) => a.status === filter);

  const sorted = [...filtered].sort((a, b) => b.dt_atendimento.localeCompare(a.dt_atendimento));

  const getPacienteNome = (id: string) =>
    pacientes.find((p) => p.id === id)?.nome ?? id;

  const STATUS_COLORS: Record<StatusAtendimento, string> = {
    Agendado: 'bg-blue-100 text-blue-700',
    Realizado: 'bg-green-100 text-green-700',
    Cancelado: 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#232323]">Atendimentos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-[#da345d] hover:bg-[#641226] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Registrar
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['Todos', 'Agendado', 'Realizado', 'Cancelado'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filter === s
                ? 'bg-[#da345d] text-white'
                : 'bg-white border border-gray-200 text-[#232323] hover:bg-[#f1f1f1]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* List */}
      {sorted.length === 0 && (
        <p className="text-center text-[#d4d4d4] py-10">Nenhum atendimento encontrado.</p>
      )}

      {sorted.map((a) => (
        <div
          key={a.id}
          className="bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl shadow-sm p-4 space-y-2"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-[#641226]">{getPacienteNome(a.id_paciente)}</p>
              <p className="text-sm text-[#232323]">
                {a.tipo} · {formatDateTime(a.dt_atendimento)}
              </p>
            </div>
            <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${STATUS_COLORS[a.status]}`}>
              {a.status}
            </span>
          </div>
          {a.observacoes && (
            <p className="text-sm text-[#232323] border-t border-gray-100 pt-2">{a.observacoes}</p>
          )}
          {a.exames.length > 0 && (
            <div className="border-t border-gray-100 pt-2 space-y-1">
              {a.exames.map((e, i) => (
                <div key={i} className="text-xs flex gap-2 items-start">
                  <span className="font-medium text-[#641226] shrink-0">{e.tipo}</span>
                  <span className="text-[#232323]">{e.requisitos}</span>
                  {e.resultado ? (
                    <span className="text-green-600 shrink-0">✓ {e.resultado}</span>
                  ) : (
                    <span className="text-amber-600 shrink-0">Pendente</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* New atendimento modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-[#641226]">Registrar Atendimento</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">Paciente</label>
                <select
                  {...register('id_paciente', { required: 'Selecione um paciente.' })}
                  className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
                >
                  <option value="">Selecione...</option>
                  {pacientes.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
                {errors.id_paciente && <p className="text-xs text-red-600 mt-1">{errors.id_paciente.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">Data e Hora</label>
                <input
                  type="datetime-local"
                  {...register('dt_atendimento', { required: 'Informe a data.' })}
                  className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
                />
                {errors.dt_atendimento && <p className="text-xs text-red-600 mt-1">{errors.dt_atendimento.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#232323] mb-1">Tipo</label>
                  <select
                    {...register('tipo')}
                    className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
                  >
                    <option>Consulta</option>
                    <option>Retorno</option>
                    <option>Emergência</option>
                    <option>Procedimento</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#232323] mb-1">Status</label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
                  >
                    <option>Agendado</option>
                    <option>Realizado</option>
                    <option>Cancelado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">Observações</label>
                <textarea
                  {...register('observacoes')}
                  rows={2}
                  placeholder="Observações clínicas (opcional)"
                  className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d] resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('addExame')}
                    className="accent-[#da345d] w-4 h-4"
                  />
                  <span className="text-sm font-medium text-[#232323]">Solicitar exame</span>
                </label>
              </div>

              {addExame && (
                <div className="space-y-3 border border-gray-200 rounded-lg p-3 bg-[#f1f1f1]">
                  <div>
                    <label className="block text-sm font-medium text-[#232323] mb-1">Tipo de Exame</label>
                    <input
                      {...register('exame_tipo')}
                      placeholder="Ex: Radiografia Periapical"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#232323] mb-1">Requisitos</label>
                    <input
                      {...register('exame_requisitos')}
                      placeholder="Ex: Em jejum de 8 horas"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#da345d] hover:bg-[#641226] text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => { reset(); setShowForm(false); }}
                  className="flex-1 bg-[#f1f1f1] hover:bg-gray-200 text-[#232323] py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Notificações tab ────────────────────────────────────────────────────────

type SendNotifForm = { mensagem: string };

function NotificacoesTab({ dentistaId }: { dentistaId: string }) {
  const dentista = getDentistas().find((d) => d.id === dentistaId);
  const colaboradorId = dentista?.id_colaborador ?? '';

  const [notifs, setNotifs] = useState(() => getNotificacoesParaUser(dentistaId));
  const unread = notifs.filter((n) => !n.lida).length;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SendNotifForm>();

  const onSend = (data: SendNotifForm) => {
    const n: Notificacao = {
      id: `not-${Date.now()}`,
      mensagem: data.mensagem,
      data_envio: new Date().toISOString(),
      lida: false,
      remetente_tipo: 'dentista',
      remetente_id: dentistaId,
      destinatario_tipo: 'colaborador',
      destinatario_id: colaboradorId,
    };
    saveNotificacao(n);
    reset();
    alert('Notificação enviada!');
  };

  const handleMarkRead = (id: string) => {
    marcarNotificacaoLida(id);
    setNotifs(getNotificacoesParaUser(dentistaId));
  };

  return (
    <div className="space-y-6">
      {/* Send form */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-[#641226] mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Enviar Notificação ao Colaborador
        </h3>
        <form onSubmit={handleSubmit(onSend)} className="space-y-3">
          <div>
            <textarea
              {...register('mensagem', { required: 'Digite uma mensagem.' })}
              rows={3}
              placeholder="Escreva sua mensagem para o colaborador..."
              className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d] resize-none"
            />
            {errors.mensagem && <p className="text-xs text-red-600 mt-1">{errors.mensagem.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-[#da345d] hover:bg-[#641226] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>

      {/* Received */}
      <div>
        <h3 className="font-semibold text-[#232323] mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#da345d]" />
          Recebidas
          {unread > 0 && (
            <span className="bg-[#da345d] text-white text-xs rounded-full px-2 py-0.5">{unread}</span>
          )}
        </h3>

        {notifs.length === 0 && (
          <p className="text-center text-[#d4d4d4] py-8">Nenhuma notificação recebida.</p>
        )}

        <div className="space-y-2">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`bg-white border rounded-xl p-4 flex gap-3 items-start ${
                n.lida ? 'border-gray-200 opacity-75' : 'border-[#da345d] border-l-4'
              }`}
            >
              <div className="flex-1">
                <p className={`text-sm ${n.lida ? 'text-[#232323]' : 'font-semibold text-[#232323]'}`}>
                  {n.mensagem}
                </p>
                <p className="text-xs text-[#d4d4d4] mt-1">{formatDateTime(n.data_envio)}</p>
              </div>
              {!n.lida && (
                <button
                  onClick={() => handleMarkRead(n.id)}
                  title="Marcar como lida"
                  className="text-[#da345d] hover:text-[#641226] shrink-0 mt-0.5"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Dentista() {
  const { user } = useAuth();
  const dentistaId = user!.id;
  const [tab, setTab] = useState<Tab>('pacientes');

  return (
    <div className="min-h-screen bg-[#f1f1f1]">
      <DashboardHeader />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="grid grid-cols-3 bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
          {TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
                tab === key
                  ? 'bg-[#da345d] text-white'
                  : 'text-[#232323] hover:bg-[#f1f1f1]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'pacientes' && <PacientesTab dentistaId={dentistaId} />}
        {tab === 'atendimentos' && <AtendimentosTab dentistaId={dentistaId} />}
        {tab === 'notificacoes' && <NotificacoesTab dentistaId={dentistaId} />}
      </main>
    </div>
  );
}
