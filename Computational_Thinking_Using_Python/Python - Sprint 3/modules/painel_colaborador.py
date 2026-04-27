"""
painel_colaborador.py — Dashboard do colaborador após login.
Inclui: visão dos dentistas, notificações, anotações compartilhadas e acesso ao CRUD.
"""

from modules import storage, utils, crud
from modules.auth import tem_permissao, nivel_colaborador, trocar_senha


# ── Menu principal do colaborador ─────────────────────────

def menu_colaborador(colaborador: dict) -> None:
    while True:
        utils.cabecalho(f"PAINEL DO COLABORADOR — {colaborador['nome']} [{colaborador['cargo']}]")
        print("  [1] Ver meus dentistas")
        print("  [2] Notificações não lidas")
        print("  [3] Enviar notificação a dentista")
        print("  [4] Anotações sobre dentistas")
        print("  [5] Gestão de cadastros")
        print("  [6] Alterar senha")
        print("  [0] Logout")
        opcao = utils.input_inteiro("  Opção: ", 0, 6)

        if opcao == 0:
            print(f"\n  Até logo, {colaborador['nome']}!")
            utils.pausar()
            break
        elif opcao == 1:
            ver_meus_dentistas(colaborador)
        elif opcao == 2:
            ver_notificacoes_nao_lidas(colaborador)
        elif opcao == 3:
            enviar_notificacao_dentista(colaborador)
        elif opcao == 4:
            menu_anotacoes(colaborador)
        elif opcao == 5:
            menu_gestao_cadastros(colaborador)
        elif opcao == 6:
            admin_mode = tem_permissao(colaborador, 4)
            trocar_senha("colaborador", colaborador, admin_mode=admin_mode)


# ── Visão dos dentistas ───────────────────────────────────

def ver_meus_dentistas(colaborador: dict) -> None:
    utils.cabecalho("MEUS DENTISTAS")
    dentistas = [d for d in storage.carregar("dentistas") if d.get("id_colaborador") == colaborador["id"]]

    if not dentistas:
        print("  Você não tem dentistas vinculados.")
        utils.pausar()
        return

    pacientes = storage.carregar("pacientes")
    atendimentos = storage.carregar("atendimentos")

    for d in dentistas:
        qtd_pacientes = sum(1 for p in pacientes if p.get("id_dentista") == d["id"])
        realizados = sum(
            1 for a in atendimentos
            if a.get("id_dentista") == d["id"] and a.get("status") == "realizado"
        )
        agendados = sum(
            1 for a in atendimentos
            if a.get("id_dentista") == d["id"] and a.get("status") == "agendado"
        )
        cancelados = sum(
            1 for a in atendimentos
            if a.get("id_dentista") == d["id"] and a.get("status") == "cancelado"
        )
        esp = d.get("especialidade") or "—"
        print(f"\n  ID: {d['id']} | {d['nome']} | CRO: {d['cro']} | Esp.: {esp}")
        print(f"    Pacientes: {qtd_pacientes} | Realizados: {realizados} | Agendados: {agendados} | Cancelados: {cancelados}")

    utils.pausar()


# ── Notificações ──────────────────────────────────────────

def ver_notificacoes_nao_lidas(colaborador: dict) -> None:
    utils.cabecalho("NOTIFICAÇÕES RECENTES")
    notificacoes = storage.carregar("notificacoes")

    # Notificações dirigidas a este colaborador (de seus dentistas)
    minhas = [
        n for n in notificacoes
        if n.get("id_colaborador") == colaborador["id"]
    ]

    # Ordena da mais nova para a mais antiga
    minhas.sort(key=lambda n: n.get("data_envio", ""), reverse=True)

    if not minhas:
        print("  Nenhuma notificação.")
        utils.pausar()
        return

    dentistas = storage.carregar("dentistas")
    for n in minhas:
        dent = next((d for d in dentistas if d["id"] == n.get("id_dentista")), None)
        dent_nome = f"Dr(a). {dent['nome']}" if dent else "Desconhecido"
        status = n.get("status_envio", "enviado")
        canal = n.get("canal", "—")
        data = n.get("data_envio", "")[:16]
        print(f"\n  [{n['id']}] {data} — De: {dent_nome} [{status}]")
        print(f"    Canal: {canal}")
        print(f"    {n['mensagem']}")

    print(f"\n  Total: {len(minhas)} notificação(ões).")
    utils.pausar()


def enviar_notificacao_dentista(colaborador: dict) -> None:
    utils.cabecalho("ENVIAR NOTIFICAÇÃO AO DENTISTA")
    dentistas = [d for d in storage.carregar("dentistas") if d.get("id_colaborador") == colaborador["id"]]

    if not dentistas:
        print("  Você não tem dentistas vinculados.")
        utils.pausar()
        return

    for d in dentistas:
        print(f"  [{d['id']}] Dr(a). {d['nome']}")

    id_dent = utils.input_inteiro("  ID do dentista destinatário: ", 1)
    dent = next((d for d in dentistas if d["id"] == id_dent), None)
    if not dent:
        print("  Dentista não encontrado.")
        utils.pausar()
        return

    mensagem = utils.input_texto("  Mensagem: ")

    print("\n  Canal de envio:")
    print("  [1] E-mail")
    print("  [2] SMS")
    print("  [3] Push")
    canal_num = utils.input_inteiro("  Escolha: ", 1, 3)
    canais = {1: "email", 2: "sms", 3: "push"}
    canal = canais[canal_num]

    notificacoes = storage.carregar("notificacoes")
    nova = {
        "id": storage.proximo_id(notificacoes),
        "mensagem": mensagem,
        "data_envio": utils.datetime_agora_iso(),
        "status_envio": "enviado",
        "canal": canal,
        "id_colaborador": colaborador["id"],
        "id_dentista": id_dent,
    }
    notificacoes.append(nova)
    storage.salvar("notificacoes", notificacoes)
    print(f"  Notificação enviada para Dr(a). {dent['nome']} via {canal}!")
    utils.pausar()


# ── Anotações compartilhadas sobre dentistas ─────────────

def menu_anotacoes(colaborador: dict) -> None:
    while True:
        utils.cabecalho("ANOTAÇÕES SOBRE DENTISTAS")
        print("  [1] Ver anotações de um dentista")
        print("  [2] Adicionar anotação")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 2)

        if opcao == 0:
            break
        elif opcao == 1:
            _ver_anotacoes_dentista(colaborador)
        elif opcao == 2:
            _adicionar_anotacao_dentista(colaborador)


def _ver_anotacoes_dentista(colaborador: dict) -> None:
    utils.cabecalho("ANOTAÇÕES — DENTISTA")
    dentistas = storage.carregar("dentistas")
    if not dentistas:
        print("  Nenhum dentista cadastrado.")
        utils.pausar()
        return

    for d in dentistas:
        print(f"  [{d['id']}] {d['nome']}")

    id_dent = utils.input_inteiro("  ID do dentista: ", 1)
    dent = next((d for d in dentistas if d["id"] == id_dent), None)
    if not dent:
        print("  Dentista não encontrado.")
        utils.pausar()
        return

    anotacoes = [
        a for a in storage.carregar("anotacoes")
        if a.get("sobre_tipo") == "dentista" and a.get("sobre_id") == id_dent
    ]

    utils.cabecalho(f"ANOTAÇÕES — {dent['nome']}")
    if not anotacoes:
        print("  Nenhuma anotação registrada.")
    else:
        colaboradores = storage.carregar("colaboradores")
        for a in anotacoes:
            autor = next((c for c in colaboradores if c["id"] == a.get("autor_id")), None)
            autor_nome = autor["nome"] if autor else "Desconhecido"
            print(f"\n  {a['data'][:16]} — por {autor_nome}")
            print(f"    {a['texto']}")
    utils.pausar()


def _adicionar_anotacao_dentista(colaborador: dict) -> None:
    utils.cabecalho("ADICIONAR ANOTAÇÃO — DENTISTA")
    dentistas = storage.carregar("dentistas")
    if not dentistas:
        print("  Nenhum dentista cadastrado.")
        utils.pausar()
        return

    for d in dentistas:
        print(f"  [{d['id']}] {d['nome']}")

    id_dent = utils.input_inteiro("  ID do dentista: ", 1)
    if not any(d["id"] == id_dent for d in dentistas):
        print("  Dentista não encontrado.")
        utils.pausar()
        return

    texto = utils.input_texto("  Anotação: ")

    anotacoes = storage.carregar("anotacoes")
    nova = {
        "id": storage.proximo_id(anotacoes),
        "texto": texto,
        "data": utils.datetime_agora_iso(),
        "autor_id": colaborador["id"],
        "autor_tipo": "colaborador",
        "sobre_tipo": "dentista",
        "sobre_id": id_dent,
    }
    anotacoes.append(nova)
    storage.salvar("anotacoes", anotacoes)
    print("  Anotação salva com sucesso!")
    utils.pausar()


# ── Gestão de cadastros (CRUD) ────────────────────────────

def menu_gestao_cadastros(colaborador: dict) -> None:
    nivel = nivel_colaborador(colaborador)

    while True:
        utils.cabecalho("GESTÃO DE CADASTROS")

        opcoes = []
        if nivel >= 2:
            opcoes.append(("Gerenciar dentistas", lambda: crud.menu_dentistas(colaborador)))
            opcoes.append(("Gerenciar pacientes", lambda: crud.menu_pacientes(colaborador)))
            opcoes.append(("Gerenciar campanhas", lambda: crud.menu_campanhas(colaborador)))
        if nivel >= 3:
            opcoes.append(("Solicitações de cadastro", lambda: crud.menu_solicitacoes(colaborador)))
        if nivel >= 4:
            opcoes.append(("Gerenciar colaboradores", lambda: crud.menu_colaboradores(colaborador)))

        if not opcoes:
            print("  Seu cargo não permite gerenciar cadastros.")
            utils.pausar()
            return

        for i, (label, _) in enumerate(opcoes, 1):
            print(f"  [{i}] {label}")
        print("  [0] Voltar")

        opcao = utils.input_inteiro("  Opção: ", 0, len(opcoes))
        if opcao == 0:
            break
        opcoes[opcao - 1][1]()
