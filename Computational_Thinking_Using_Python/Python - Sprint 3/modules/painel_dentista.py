"""
painel_dentista.py — Dashboard do dentista após login.
Inclui: visão dos pacientes, atendimentos, exames, notificações e anotações.
"""

from modules import storage, utils
from modules.auth import trocar_senha


# ── Menu principal do dentista ────────────────────────────

def menu_dentista(dentista: dict) -> None:
    while True:
        utils.cabecalho(f"PAINEL DO DENTISTA — Dr(a). {dentista['nome']}")
        print("  [1] Ver meus pacientes")
        print("  [2] Registrar atendimento (pré-consulta)")
        print("  [3] Atualizar atendimento (pós-consulta)")
        print("  [4] Solicitar exame")
        print("  [5] Notificações não lidas")
        print("  [6] Enviar notificação a paciente")
        print("  [7] Anotações sobre pacientes")
        print("  [8] Solicitar alteração de cadastro de paciente")
        print("  [9] Alterar senha")
        print("  [0] Logout")
        opcao = utils.input_inteiro("  Opção: ", 0, 9)

        if opcao == 0:
            print(f"\n  Até logo, Dr(a). {dentista['nome']}!")
            utils.pausar()
            break
        elif opcao == 1:
            ver_meus_pacientes(dentista)
        elif opcao == 2:
            registrar_atendimento(dentista)
        elif opcao == 3:
            atualizar_atendimento(dentista)
        elif opcao == 4:
            solicitar_exame(dentista)
        elif opcao == 5:
            ver_notificacoes_nao_lidas(dentista)
        elif opcao == 6:
            enviar_notificacao_paciente(dentista)
        elif opcao == 7:
            menu_anotacoes(dentista)
        elif opcao == 8:
            solicitar_alteracao_paciente(dentista)
        elif opcao == 9:
            trocar_senha("dentista", dentista)


# ── Visão dos pacientes ───────────────────────────────────

def ver_meus_pacientes(dentista: dict) -> None:
    utils.cabecalho("MEUS PACIENTES")
    pacientes = [p for p in storage.carregar("pacientes") if p.get("id_dentista") == dentista["id"]]

    if not pacientes:
        print("  Você não tem pacientes vinculados.")
        utils.pausar()
        return

    atendimentos = storage.carregar("atendimentos")

    for p in pacientes:
        ats_paciente = [a for a in atendimentos if a.get("id_paciente") == p["id"]]

        agendados = sorted(
            [a for a in ats_paciente if a.get("status") == "agendado"],
            key=lambda a: a.get("data", "")
        )
        proximo = utils.formatar_data(agendados[0]["data"]) if agendados else "—"

        realizados = sorted(
            [a for a in ats_paciente if a.get("status") == "realizado"],
            key=lambda a: a.get("data", ""),
            reverse=True
        )
        ultimo = utils.formatar_data(realizados[0]["data"]) if realizados else "—"

        exames_pendentes = any(
            e.get("resultado", "").strip() == ""
            for a in ats_paciente
            for e in a.get("exames", [])
        )
        flag_exames = "SIM" if exames_pendentes else "Não"

        nasc = utils.formatar_data(p.get("data_nasc", ""))
        print(f"\n  [{p['id']}] {p['nome']} | Nasc.: {nasc} | Tel.: {p['telefone']}")
        print(f"    Próx. atend.: {proximo} | Último atend.: {ultimo} | Exames pendentes: {flag_exames}")

    utils.pausar()


# ── Atendimentos ──────────────────────────────────────────

def registrar_atendimento(dentista: dict) -> None:
    """Fase 1 — Pré-consulta: sempre cria com status 'agendado'."""
    utils.cabecalho("REGISTRAR ATENDIMENTO — PRÉ-CONSULTA")

    # Campanha obrigatória
    campanhas = storage.carregar("campanhas")
    if not campanhas:
        print("  Nenhuma campanha disponível. Cadastre uma campanha antes de registrar um atendimento.")
        utils.pausar()
        return

    pacientes = [p for p in storage.carregar("pacientes") if p.get("id_dentista") == dentista["id"]]
    if not pacientes:
        print("  Você não tem pacientes vinculados.")
        utils.pausar()
        return

    for p in pacientes:
        print(f"  [{p['id']}] {p['nome']}")
    id_pac = utils.input_inteiro("  ID do paciente: ", 1)
    paciente = next((p for p in pacientes if p["id"] == id_pac), None)
    if not paciente:
        print("  Paciente não encontrado entre seus pacientes.")
        utils.pausar()
        return

    print("\n  Campanha:")
    for c in campanhas:
        print(f"    [{c['id']}] {c['nome']} — {c.get('local', '—')}")
    id_camp = utils.input_inteiro("  ID da campanha: ", 1)
    campanha = next((c for c in campanhas if c["id"] == id_camp), None)
    if not campanha:
        print("  Campanha não encontrada.")
        utils.pausar()
        return

    print("\n  Tipo de atendimento:")
    tipos = ["Avaliação", "Consulta de rotina", "Restauração", "Extração", "Limpeza", "Outro"]
    for i, t in enumerate(tipos, 1):
        print(f"    [{i}] {t}")
    idx_tipo = utils.input_inteiro("  Tipo: ", 1, len(tipos))
    tipo = tipos[idx_tipo - 1]

    data_str = utils.input_data("  Data do atendimento (DD/MM/AAAA): ")
    observacoes = utils.input_texto("  Observações pré-clínicas (opcional): ", obrigatorio=False)

    atendimentos = storage.carregar("atendimentos")
    novo = {
        "id": storage.proximo_id(atendimentos),
        "id_paciente": id_pac,
        "id_dentista": dentista["id"],
        "id_campanha": id_camp,
        "data": data_str,
        "tipo": tipo,
        "status": "agendado",
        "observacoes": observacoes,
        "exames": [],
    }
    atendimentos.append(novo)
    storage.salvar("atendimentos", atendimentos)

    data_fmt = utils.formatar_data(data_str)
    _criar_notificacao_colaborador(
        dentista,
        f"Dr(a). {dentista['nome']} agendou atendimento para {paciente['nome']} "
        f"em {data_fmt}. Tipo: {tipo}."
    )

    print(f"\n  Atendimento registrado com sucesso! (ID: {novo['id']})")
    utils.pausar()


def atualizar_atendimento(dentista: dict) -> None:
    """Fase 2 — Pós-consulta: atualiza status, observações e exames."""
    utils.cabecalho("ATUALIZAR ATENDIMENTO — PÓS-CONSULTA")
    atendimentos = storage.carregar("atendimentos")
    pacientes = storage.carregar("pacientes")

    agendados = [
        a for a in atendimentos
        if a.get("id_dentista") == dentista["id"] and a.get("status") == "agendado"
    ]

    if not agendados:
        print("  Nenhum atendimento com status 'agendado' encontrado.")
        utils.pausar()
        return

    for a in agendados:
        pac = next((p for p in pacientes if p["id"] == a.get("id_paciente")), None)
        pac_nome = pac["nome"] if pac else "—"
        data = utils.formatar_data(a.get("data", ""))
        print(f"  [{a['id']}] {data} — {pac_nome} — {a['tipo']}")

    id_at = utils.input_inteiro("  ID do atendimento: ", 1)
    atendimento = next((a for a in agendados if a["id"] == id_at), None)
    if not atendimento:
        print("  Atendimento não encontrado.")
        utils.pausar()
        return

    paciente = next((p for p in pacientes if p["id"] == atendimento.get("id_paciente")), None)
    pac_nome = paciente["nome"] if paciente else "—"
    data_fmt = utils.formatar_data(atendimento["data"])

    if not utils.confirmar("  Paciente compareceu à consulta? (S/N): "):
        atendimento["status"] = "cancelado"
        storage.salvar("atendimentos", atendimentos)
        _criar_notificacao_colaborador(
            dentista,
            f"Atendimento de {pac_nome} com Dr(a). {dentista['nome']} em {data_fmt} foi cancelado."
        )
        print("  Atendimento marcado como cancelado.")
        utils.pausar()
        return

    # Paciente compareceu
    atendimento["status"] = "realizado"
    observacoes = utils.input_texto("  Observações clínicas finais (opcional): ", obrigatorio=False)
    if observacoes:
        atendimento["observacoes"] = observacoes

    # Exames pendentes — oferecer registro de resultado
    exames_pendentes = [e for e in atendimento.get("exames", []) if not e.get("resultado", "").strip()]
    if exames_pendentes:
        print(f"\n  {len(exames_pendentes)} exame(s) pendente(s):")
        for e in exames_pendentes:
            print(f"    • {e['tipo']} — {e.get('requisitos') or '—'}")
        if utils.confirmar("  Registrar resultado de algum exame? (S/N): "):
            for e in exames_pendentes:
                print(f"\n  Exame: {e['tipo']}")
                resultado = utils.input_texto("  Resultado (Enter para pular): ", obrigatorio=False)
                if resultado:
                    e["resultado"] = resultado

    # Novo exame
    if utils.confirmar("  Solicitar novo exame? (S/N): "):
        tipo_exame = utils.input_texto("  Tipo de exame: ")
        requisitos = utils.input_texto("  Requisitos (opcional): ", obrigatorio=False)
        atendimento.setdefault("exames", []).append(
            {"tipo": tipo_exame, "requisitos": requisitos, "resultado": ""}
        )

    storage.salvar("atendimentos", atendimentos)

    obs_resumo = f" Obs.: {observacoes}" if observacoes else ""
    _criar_notificacao_colaborador(
        dentista,
        f"Atendimento realizado: Dr(a). {dentista['nome']} atendeu {pac_nome} em {data_fmt}.{obs_resumo}"
    )

    print("  Atendimento atualizado com sucesso!")
    utils.pausar()


def solicitar_exame(dentista: dict) -> None:
    utils.cabecalho("SOLICITAR EXAME")
    pacientes = [p for p in storage.carregar("pacientes") if p.get("id_dentista") == dentista["id"]]

    if not pacientes:
        print("  Você não tem pacientes vinculados.")
        utils.pausar()
        return

    for p in pacientes:
        print(f"  [{p['id']}] {p['nome']}")

    id_pac = utils.input_inteiro("  ID do paciente: ", 1)
    paciente = next((p for p in pacientes if p["id"] == id_pac), None)
    if not paciente:
        print("  Paciente não encontrado entre seus pacientes.")
        utils.pausar()
        return

    atendimentos = storage.carregar("atendimentos")
    ats_paciente = [a for a in atendimentos if a.get("id_paciente") == id_pac]

    if not ats_paciente:
        print("  Nenhum atendimento registrado para este paciente.")
        utils.pausar()
        return

    print("\n  Atendimentos disponíveis:")
    for a in ats_paciente:
        data = utils.formatar_data(a["data"])
        print(f"    [{a['id']}] {data} — {a['tipo']} ({a['status']})")

    id_at = utils.input_inteiro("  ID do atendimento: ", 1)
    atendimento = next((a for a in ats_paciente if a["id"] == id_at), None)
    if not atendimento:
        print("  Atendimento não encontrado.")
        utils.pausar()
        return

    tipo_exame = utils.input_texto("  Tipo de exame: ")
    requisitos = utils.input_texto("  Requisitos (opcional): ", obrigatorio=False)

    exame = {"tipo": tipo_exame, "requisitos": requisitos, "resultado": ""}
    atendimento["exames"].append(exame)
    storage.salvar("atendimentos", atendimentos)
    print("  Exame solicitado com sucesso!")
    utils.pausar()


# ── Notificações ──────────────────────────────────────────

def _criar_notificacao_colaborador(dentista: dict, mensagem: str) -> None:
    """Cria notificação automática para o colaborador responsável pelo dentista."""
    id_colab = dentista.get("id_colaborador")
    if not id_colab:
        return
    notificacoes = storage.carregar("notificacoes")
    notificacoes.append({
        "id": storage.proximo_id(notificacoes),
        "mensagem": mensagem,
        "data_envio": utils.datetime_agora_iso(),
        "status_envio": "enviado",
        "canal": "email",
        "id_colaborador": id_colab,
        "id_dentista": dentista["id"],
    })
    storage.salvar("notificacoes", notificacoes)


def ver_notificacoes_nao_lidas(dentista: dict) -> None:
    utils.cabecalho("NOTIFICAÇÕES DO COLABORADOR")
    notificacoes = storage.carregar("notificacoes")
    id_colab = dentista.get("id_colaborador")

    minhas = [
        n for n in notificacoes
        if n.get("id_dentista") == dentista["id"]
        and n.get("id_colaborador") == id_colab
    ]
    minhas.sort(key=lambda n: n.get("data_envio", ""), reverse=True)

    if not minhas:
        print("  Nenhuma notificação do seu colaborador responsável.")
        utils.pausar()
        return

    colaboradores = storage.carregar("colaboradores")
    for n in minhas:
        colab = next((c for c in colaboradores if c["id"] == n.get("id_colaborador")), None)
        colab_nome = colab["nome"] if colab else "Colaborador"
        data = n.get("data_envio", "")[:16]
        print(f"\n  [{n['id']}] {data} — De: {colab_nome}")
        print(f"    {n['mensagem']}")

    print(f"\n  Total: {len(minhas)} notificação(ões).")
    utils.pausar()


def enviar_notificacao_paciente(dentista: dict) -> None:
    utils.cabecalho("NOTIFICAÇÕES A PACIENTES")
    print("  Aviso: Sistema de notificações a pacientes não está disponível no modelo atual.")
    print("  O sistema atualmente suporta notificações apenas entre colaboradores e dentistas.")
    print("\n  Para comunicar com seus pacientes, considere:")
    print("    • Anotações no sistema (vistas pelo colaborador responsável)")
    print("    • Contato direto via telefone/e-mail (registrados no sistema)")
    utils.pausar()


# ── Anotações sobre pacientes ─────────────────────────────

def menu_anotacoes(dentista: dict) -> None:
    while True:
        utils.cabecalho("ANOTAÇÕES SOBRE PACIENTES")
        print("  [1] Ver anotações de um paciente")
        print("  [2] Adicionar anotação")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 2)

        if opcao == 0:
            break
        elif opcao == 1:
            _ver_anotacoes_paciente(dentista)
        elif opcao == 2:
            _adicionar_anotacao_paciente(dentista)


def _ver_anotacoes_paciente(dentista: dict) -> None:
    utils.cabecalho("ANOTAÇÕES — PACIENTE")
    pacientes = [p for p in storage.carregar("pacientes") if p.get("id_dentista") == dentista["id"]]

    if not pacientes:
        print("  Nenhum paciente vinculado.")
        utils.pausar()
        return

    for p in pacientes:
        print(f"  [{p['id']}] {p['nome']}")

    id_pac = utils.input_inteiro("  ID do paciente: ", 1)
    pac = next((p for p in pacientes if p["id"] == id_pac), None)
    if not pac:
        print("  Paciente não encontrado.")
        utils.pausar()
        return

    anotacoes = [
        a for a in storage.carregar("anotacoes")
        if a.get("sobre_tipo") == "paciente" and a.get("sobre_id") == id_pac
    ]

    utils.cabecalho(f"ANOTAÇÕES — {pac['nome']}")
    if not anotacoes:
        print("  Nenhuma anotação registrada.")
    else:
        dentistas = storage.carregar("dentistas")
        for a in anotacoes:
            autor = next((d for d in dentistas if d["id"] == a.get("autor_id")), None)
            autor_nome = f"Dr(a). {autor['nome']}" if autor else "Desconhecido"
            print(f"\n  {a['data'][:16]} — por {autor_nome}")
            print(f"    {a['texto']}")
    utils.pausar()


def _adicionar_anotacao_paciente(dentista: dict) -> None:
    utils.cabecalho("ADICIONAR ANOTAÇÃO — PACIENTE")
    pacientes = [p for p in storage.carregar("pacientes") if p.get("id_dentista") == dentista["id"]]

    if not pacientes:
        print("  Nenhum paciente vinculado.")
        utils.pausar()
        return

    for p in pacientes:
        print(f"  [{p['id']}] {p['nome']}")

    id_pac = utils.input_inteiro("  ID do paciente: ", 1)
    if not any(p["id"] == id_pac for p in pacientes):
        print("  Paciente não encontrado.")
        utils.pausar()
        return

    texto = utils.input_texto("  Anotação: ")

    anotacoes = storage.carregar("anotacoes")
    nova = {
        "id": storage.proximo_id(anotacoes),
        "texto": texto,
        "data": utils.datetime_agora_iso(),
        "autor_id": dentista["id"],
        "autor_tipo": "dentista",
        "sobre_tipo": "paciente",
        "sobre_id": id_pac,
    }
    anotacoes.append(nova)
    storage.salvar("anotacoes", anotacoes)
    print("  Anotação salva com sucesso!")
    utils.pausar()


# ── Solicitação de alteração de cadastro de paciente ──────

def solicitar_alteracao_paciente(dentista: dict) -> None:
    utils.cabecalho("SOLICITAR ALTERAÇÃO DE CADASTRO — PACIENTE")
    pacientes = [p for p in storage.carregar("pacientes") if p.get("id_dentista") == dentista["id"]]

    if not pacientes:
        print("  Você não tem pacientes vinculados.")
        utils.pausar()
        return

    for p in pacientes:
        print(f"  [{p['id']}] {p['nome']}")

    id_pac = utils.input_inteiro("  ID do paciente: ", 1)
    pac = next((p for p in pacientes if p["id"] == id_pac), None)
    if not pac:
        print("  Paciente não encontrado.")
        utils.pausar()
        return

    print(f"\n  Preencha os novos dados para {pac['nome']}.")
    print("  (Deixe em branco para não solicitar alteração no campo)\n")

    dados_novos = {}
    nome = utils.input_texto(f"  Nome [{pac['nome']}]: ", obrigatorio=False)
    if nome:
        dados_novos["nome"] = nome

    if utils.confirmar("  Alterar data de nascimento? (S/N): "):
        dados_novos["data_nasc"] = utils.input_data("  Nova data (DD/MM/AAAA): ")

    telefone = utils.input_texto(f"  Telefone [{pac['telefone']}]: ", obrigatorio=False)
    if telefone:
        dados_novos["telefone"] = telefone

    email = utils.input_texto(f"  E-mail [{pac['email']}]: ", obrigatorio=False)
    if email:
        dados_novos["email"] = email

    if not dados_novos:
        print("  Nenhuma alteração informada. Solicitação cancelada.")
        utils.pausar()
        return

    solicitacoes = storage.carregar("solicitacoes")
    nova = {
        "id": storage.proximo_id(solicitacoes),
        "tipo": "alteracao_paciente",
        "dados": {"id_paciente": id_pac, "nome_paciente": pac["nome"], **dados_novos},
        "status": "pendente",
        "data": utils.datetime_agora_iso(),
    }
    solicitacoes.append(nova)
    storage.salvar("solicitacoes", solicitacoes)

    _criar_notificacao_colaborador(
        dentista,
        f"Dr(a). {dentista['nome']} solicitou alteração de dados de {pac['nome']}."
    )

    print("  Solicitação de alteração enviada! Aguarde aprovação de um colaborador.")
    utils.pausar()
