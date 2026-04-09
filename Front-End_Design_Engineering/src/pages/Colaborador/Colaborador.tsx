import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Users, Bell, FileText, Plus, CheckCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { DashboardHeader } from '../../components/DashboardHeader/DashboardHeader';
import { useAuth } from '../../contexts/AuthContext';
import {
  getDentistasByColaborador,
  getPacientesByDentista,
  getAtendimentosByDentista,
  getNotificacoesParaUser,
  saveNotificacao,
  marcarNotificacaoLida,
  getAnotacoesSobre,
  saveAnotacao,
} from '../../data/storage';
import type { Notificacao, Anotacao } from '../../types';

type Tab = 'dentistas' | 'notificacoes' | 'anotacoes';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

// ─── Tabs nav ────────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string; Icon: React.ElementType }[] = [
  { key: 'dentistas', label: 'Dentistas', Icon: Users },
  { key: 'notificacoes', label: 'Notificações', Icon: Bell },
  { key: 'anotacoes', label: 'Anotações', Icon: FileText },
];

// ─── Dentistas tab ──────────────────────────────────────────────────────────

function DentistasTab({ colaboradorId }: { colaboradorId: string }) {
  const dentistas = getDentistasByColaborador(colaboradorId);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-[#232323]">Dentistas Vinculados</h2>

      {dentistas.length === 0 && (
        <p className="text-center text-[#d4d4d4] py-10">Nenhum dentista vinculado.</p>
      )}

      {dentistas.map((d) => {
        const pacientes = getPacientesByDentista(d.id);
        const atendimentos = getAtendimentosByDentista(d.id);
        const realizados = atendimentos.filter((a) => a.status === 'Realizado').length;
        const agendados = atendimentos.filter((a) => a.status === 'Agendado').length;
        const open = expandedId === d.id;

        return (
          <div
            key={d.id}
            className="bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(open ? null : d.id)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <p className="font-semibold text-[#641226]">{d.nome}</p>
                <p className="text-xs text-[#d4d4d4]">
                  {d.especialidade} · CRO {d.cro}
                </p>
              </div>
              {open ? (
                <ChevronUp className="w-4 h-4 text-[#da345d] shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#da345d] shrink-0" />
              )}
            </button>

            {open && (
              <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <Stat label="Pacientes" value={pacientes.length} />
                  <Stat label="Realizados" value={realizados} />
                  <Stat label="Agendados" value={agendados} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#f1f1f1] rounded-lg p-3 text-center">
      <p className="text-xl font-bold text-[#da345d]">{value}</p>
      <p className="text-xs text-[#232323] mt-0.5">{label}</p>
    </div>
  );
}

// ─── Notificações tab ───────────────────────────────────────────────────────

type SendNotifForm = { destinatario_id: string; mensagem: string };

function NotificacoesTab({ colaboradorId }: { colaboradorId: string }) {
  const dentistas = getDentistasByColaborador(colaboradorId);
  const [notifs, setNotifs] = useState(() => getNotificacoesParaUser(colaboradorId));
  const unread = notifs.filter((n) => !n.lida).length;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SendNotifForm>();

  const onSend = (data: SendNotifForm) => {
    const n: Notificacao = {
      id: `not-${Date.now()}`,
      mensagem: data.mensagem,
      data_envio: new Date().toISOString(),
      lida: false,
      remetente_tipo: 'colaborador',
      remetente_id: colaboradorId,
      destinatario_tipo: 'dentista',
      destinatario_id: data.destinatario_id,
    };
    saveNotificacao(n);
    reset();
    alert('Notificação enviada!');
  };

  const handleMarkRead = (id: string) => {
    marcarNotificacaoLida(id);
    setNotifs(getNotificacoesParaUser(colaboradorId));
  };

  return (
    <div className="space-y-6">
      {/* Send form */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-[#641226] mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Enviar Notificação
        </h3>
        <form onSubmit={handleSubmit(onSend)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#232323] mb-1">Dentista</label>
            <select
              {...register('destinatario_id', { required: true })}
              className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
            >
              <option value="">Selecione...</option>
              {dentistas.map((d) => (
                <option key={d.id} value={d.id}>{d.nome}</option>
              ))}
            </select>
            {errors.destinatario_id && <p className="text-xs text-red-600 mt-1">Selecione um dentista.</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#232323] mb-1">Mensagem</label>
            <textarea
              {...register('mensagem', { required: 'Digite uma mensagem.' })}
              rows={3}
              placeholder="Escreva sua mensagem..."
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

// ─── Anotações tab ──────────────────────────────────────────────────────────

type AddNoteForm = { texto: string };

function AnotacoesTab({ colaboradorId }: { colaboradorId: string }) {
  const dentistas = getDentistasByColaborador(colaboradorId);
  const [selectedId, setSelectedId] = useState(dentistas[0]?.id ?? '');
  const [notes, setNotes] = useState(() =>
    selectedId ? getAnotacoesSobre(selectedId) : []
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddNoteForm>();

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setNotes(getAnotacoesSobre(id));
  };

  const onAdd = (data: AddNoteForm) => {
    if (!selectedId) return;
    const a: Anotacao = {
      id: `ano-${Date.now()}`,
      texto: data.texto,
      data: new Date().toISOString().slice(0, 10),
      autor_id: colaboradorId,
      autor_tipo: 'colaborador',
      sobre_tipo: 'dentista',
      sobre_id: selectedId,
    };
    saveAnotacao(a);
    reset();
    setNotes(getAnotacoesSobre(selectedId));
  };

  return (
    <div className="space-y-5">
      {/* Dentist selector */}
      <div>
        <label className="block text-sm font-medium text-[#232323] mb-1">Dentista</label>
        <select
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d]"
        >
          {dentistas.map((d) => (
            <option key={d.id} value={d.id}>{d.nome}</option>
          ))}
        </select>
      </div>

      {/* Add note */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-[#641226] mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nova Anotação
        </h3>
        <form
          onSubmit={handleSubmit(onAdd)}
          className="space-y-3"
        >
          <div>
            <textarea
              {...register('texto', { required: 'Escreva uma anotação.' })}
              rows={3}
              placeholder="Escreva sua anotação sobre este dentista..."
              className="w-full px-3 py-2 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d] resize-none"
            />
            {errors.texto && <p className="text-xs text-red-600 mt-1">{errors.texto.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-[#da345d] hover:bg-[#641226] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Salvar
          </button>
        </form>
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        {notes.length === 0 && (
          <p className="text-center text-[#d4d4d4] py-8">Nenhuma anotação para este dentista.</p>
        )}
        {notes.map((a) => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-[#232323]">{a.texto}</p>
            <p className="text-xs text-[#d4d4d4] mt-2">{formatDate(a.data)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Colaborador() {
  const { user } = useAuth();
  const colaboradorId = user!.id;
  const [tab, setTab] = useState<Tab>('dentistas');

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
        {tab === 'dentistas' && <DentistasTab colaboradorId={colaboradorId} />}
        {tab === 'notificacoes' && <NotificacoesTab colaboradorId={colaboradorId} />}
        {tab === 'anotacoes' && <AnotacoesTab colaboradorId={colaboradorId} />}
      </main>
    </div>
  );
}
