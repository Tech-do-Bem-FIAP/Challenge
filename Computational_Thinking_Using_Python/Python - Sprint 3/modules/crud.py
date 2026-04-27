"""
crud.py — Operações de CRUD para Colaborador, Dentista e Paciente.
Gerenciamento de solicitações de cadastro pendentes.
Todas as funções recebem o usuário logado para validação de permissões.
"""

from __future__ import annotations

from modules import storage, utils
from modules.auth import tem_permissao, nivel_colaborador, NIVEL_CARGO, _input_cargo


# ══════════════════════════════════════════════════════════
#  COLABORADORES
# ══════════════════════════════════════════════════════════

def menu_colaboradores(usuario_logado: dict) -> None:
    """Submenu de gestão de colaboradores (Administrador apenas)."""
    if not tem_permissao(usuario_logado, 4):
        print("  Acesso negado. Apenas o Administrador pode gerenciar colaboradores.")
        utils.pausar()
        return

    while True:
        utils.cabecalho("GESTÃO DE COLABORADORES")
        print("  [1] Listar colaboradores")
        print("  [2] Cadastrar colaborador")
        print("  [3] Editar colaborador")
        print("  [4] Excluir colaborador")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 4)

        if opcao == 0:
            break
        elif opcao == 1:
            listar_colaboradores()
        elif opcao == 2:
            cadastrar_colaborador(usuario_logado)
        elif opcao == 3:
            editar_colaborador(usuario_logado)
        elif opcao == 4:
            excluir_colaborador(usuario_logado)


def listar_colaboradores(pausar: bool = True) -> list:
    utils.cabecalho("COLABORADORES CADASTRADOS")
    lista = storage.carregar("colaboradores")
    if not lista:
        print("  Nenhum colaborador cadastrado.")
    for c in lista:
        print(f"  [{c['id']}] {c['nome']} — {c['cargo']} | {c['email']}")
    if pausar:
        utils.pausar()
    return lista


def cadastrar_colaborador(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 4):
        print("  Acesso negado.")
        utils.pausar()
        return

    utils.cabecalho("CADASTRAR COLABORADOR")
    nome = utils.input_texto("  Nome completo: ")
    cpf = utils.input_cpf(obrigatorio=True)
    cargo = _input_cargo(incluir_admin=True)
    email = utils.input_texto("  E-mail (login): ")

    # Verifica duplicatas
    lista = storage.carregar("colaboradores")
    if any(c["email"].lower() == email.lower() for c in lista):
        print("  Já existe um colaborador com esse e-mail.")
        utils.pausar()
        return
    if any(c.get("cpf") == cpf for c in lista):
        print("  Já existe um colaborador com esse CPF.")
        utils.pausar()
        return

    senha = utils.input_senha("  Senha: ")
    confirmacao = utils.input_senha("  Confirme a senha: ")
    if senha != confirmacao:
        print("  As senhas não coincidem. Cadastro cancelado.")
        utils.pausar()
        return

    novo = {
        "id": storage.proximo_id(lista),
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "senha": senha,
        "cargo": cargo,
        "disponibilidade": 1,
    }
    lista.append(novo)
    storage.salvar("colaboradores", lista)
    print(f"  Colaborador '{nome}' cadastrado com sucesso! (ID: {novo['id']})")
    utils.pausar()


def editar_colaborador(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 3):
        print("  Acesso negado. Necessário cargo Coordenador ou superior.")
        utils.pausar()
        return

    utils.cabecalho("EDITAR COLABORADOR")
    lista = listar_colaboradores(pausar=False)
    if not lista:
        utils.pausar()
        return

    uid = utils.input_inteiro("  ID do colaborador a editar: ", 1)
    alvo = next((c for c in lista if c["id"] == uid), None)
    if not alvo:
        print("  Colaborador não encontrado.")
        utils.pausar()
        return

    # Coordenador não pode editar Administrador
    if nivel_colaborador(usuario_logado) < 4 and alvo.get("cargo") == "Administrador":
        print("  Não é possível editar o Administrador.")
        utils.pausar()
        return

    print(f"\n  Editando: {alvo['nome']} [{alvo['cargo']}]")
    print("  (Deixe em branco para manter o valor atual)\n")

    nome = utils.input_texto(f"  Nome [{alvo['nome']}]: ", obrigatorio=False) or alvo["nome"]

    cpf_atual = alvo.get("cpf", "")
    novo_cpf = utils.input_cpf(
        prompt=f"  CPF [{cpf_atual}] (Enter para manter): ", obrigatorio=False
    )
    if novo_cpf:
        outros = [c for c in lista if c["id"] != alvo["id"]]
        if any(c.get("cpf") == novo_cpf for c in outros):
            print("  Já existe outro colaborador com esse CPF.")
            utils.pausar()
            return
        alvo["cpf"] = novo_cpf

    email = utils.input_texto(f"  E-mail [{alvo['email']}]: ", obrigatorio=False) or alvo["email"]

    # Só Admin pode alterar cargo
    if tem_permissao(usuario_logado, 4):
        alterar_cargo = utils.confirmar("  Deseja alterar o cargo? (S/N): ")
        if alterar_cargo:
            cargo = _input_cargo(incluir_admin=True)
        else:
            cargo = alvo["cargo"]
    else:
        cargo = alvo["cargo"]

    alvo["nome"] = nome
    alvo["email"] = email
    alvo["cargo"] = cargo
    storage.salvar("colaboradores", lista)
    print("  Colaborador atualizado com sucesso!")
    utils.pausar()


def excluir_colaborador(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 4):
        print("  Acesso negado. Apenas o Administrador pode excluir colaboradores.")
        utils.pausar()
        return

    utils.cabecalho("EXCLUIR COLABORADOR")
    lista = listar_colaboradores(pausar=False)
    if not lista:
        utils.pausar()
        return

    uid = utils.input_inteiro("  ID do colaborador a excluir: ", 1)
    alvo = next((c for c in lista if c["id"] == uid), None)
    if not alvo:
        print("  Colaborador não encontrado.")
        utils.pausar()
        return

    if alvo["id"] == usuario_logado["id"]:
        print("  Você não pode excluir a própria conta.")
        utils.pausar()
        return

    if alvo.get("cargo") == "Administrador":
        print("  Não é possível excluir o Administrador.")
        utils.pausar()
        return

    if not utils.confirmar(f"  Excluir '{alvo['nome']}'? (S/N): "):
        print("  Operação cancelada.")
        utils.pausar()
        return

    lista.remove(alvo)
    storage.salvar("colaboradores", lista)
    print("  Colaborador excluído com sucesso!")
    utils.pausar()


# ══════════════════════════════════════════════════════════
#  DENTISTAS
# ══════════════════════════════════════════════════════════

def menu_dentistas(usuario_logado: dict) -> None:
    """Submenu de gestão de dentistas (Coordenador+)."""
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    while True:
        utils.cabecalho("GESTÃO DE DENTISTAS")
        print("  [1] Listar dentistas")
        print("  [2] Cadastrar dentista")
        print("  [3] Editar dentista")
        print("  [4] Excluir dentista")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 4)

        if opcao == 0:
            break
        elif opcao == 1:
            listar_dentistas()
        elif opcao == 2:
            cadastrar_dentista(usuario_logado)
        elif opcao == 3:
            editar_dentista(usuario_logado)
        elif opcao == 4:
            excluir_dentista(usuario_logado)


def listar_dentistas(pausar: bool = True) -> list:
    utils.cabecalho("DENTISTAS CADASTRADOS")
    lista = storage.carregar("dentistas")
    colaboradores = storage.carregar("colaboradores")
    if not lista:
        print("  Nenhum dentista cadastrado.")
    for d in lista:
        colab = next((c for c in colaboradores if c["id"] == d.get("id_colaborador")), None)
        colab_nome = colab["nome"] if colab else "—"
        esp = d.get("especialidade") or "—"
        print(f"  [{d['id']}] {d['nome']} | CRO: {d['cro']} | Esp.: {esp} | Responsável: {colab_nome}")
    if pausar:
        utils.pausar()
    return lista


def cadastrar_dentista(usuario_logado: dict) -> dict | None:
    """Cadastra um dentista. Retorna o dict criado (útil para aprovação de solicitações)."""
    if not tem_permissao(usuario_logado, 4):
        print("  Acesso negado. Apenas o Administrador pode cadastrar dentistas.")
        utils.pausar()
        return None

    utils.cabecalho("CADASTRAR DENTISTA")
    nome = utils.input_texto("  Nome completo: ")
    cpf = utils.input_cpf(obrigatorio=True)
    cro = utils.input_cro()
    especialidade = utils.input_texto("  Especialidade (opcional): ", obrigatorio=False)
    email = utils.input_texto("  E-mail (login): ")

    lista = storage.carregar("dentistas")
    if any(d["email"].lower() == email.lower() for d in lista):
        print("  Já existe um dentista com esse e-mail.")
        utils.pausar()
        return None
    if any(d.get("cpf") == cpf for d in lista):
        print("  Já existe um dentista com esse CPF.")
        utils.pausar()
        return None

    senha = utils.input_senha("  Senha: ")
    confirmacao = utils.input_senha("  Confirme a senha: ")
    if senha != confirmacao:
        print("  As senhas não coincidem. Cadastro cancelado.")
        utils.pausar()
        return None

    # Vincula a um colaborador
    colaboradores = storage.carregar("colaboradores")
    if not colaboradores:
        print("  Nenhum colaborador disponível para vincular.")
        utils.pausar()
        return None

    print("\n  Colaborador responsável:")
    for c in colaboradores:
        print(f"    [{c['id']}] {c['nome']} — {c['cargo']}")
    id_colab = utils.input_inteiro("  ID do colaborador: ", 1)
    if not any(c["id"] == id_colab for c in colaboradores):
        print("  Colaborador não encontrado.")
        utils.pausar()
        return None

    novo = {
        "id": storage.proximo_id(lista),
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "senha": senha,
        "cro": cro,
        "especialidade": especialidade,
        "disponibilidade": 1,
        "id_colaborador": id_colab,
    }
    lista.append(novo)
    storage.salvar("dentistas", lista)
    print(f"  Dentista '{nome}' cadastrado com sucesso! (ID: {novo['id']})")
    utils.pausar()
    return novo


def editar_dentista(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado. Necessário cargo Auxiliar ou superior.")
        utils.pausar()
        return

    utils.cabecalho("EDITAR DENTISTA")
    lista = listar_dentistas(pausar=False)
    if not lista:
        utils.pausar()
        return

    uid = utils.input_inteiro("  ID do dentista a editar: ", 1)
    alvo = next((d for d in lista if d["id"] == uid), None)
    if not alvo:
        print("  Dentista não encontrado.")
        utils.pausar()
        return

    print(f"\n  Editando: {alvo['nome']} | CRO: {alvo['cro']}")
    print("  (Deixe em branco para manter o valor atual)\n")

    alvo["nome"] = utils.input_texto(f"  Nome [{alvo['nome']}]: ", obrigatorio=False) or alvo["nome"]

    cpf_atual = alvo.get("cpf", "")
    novo_cpf = utils.input_cpf(
        prompt=f"  CPF [{cpf_atual}] (Enter para manter): ", obrigatorio=False
    )
    if novo_cpf:
        outros = [d for d in lista if d["id"] != alvo["id"]]
        if any(d.get("cpf") == novo_cpf for d in outros):
            print("  Já existe outro dentista com esse CPF.")
            utils.pausar()
            return
        alvo["cpf"] = novo_cpf

    novo_cro = utils.input_cro_opcional(
        prompt=f"  CRO [{alvo['cro']}] (Enter para manter): "
    )
    if novo_cro:
        alvo["cro"] = novo_cro

    alvo["especialidade"] = utils.input_texto(
        f"  Especialidade [{alvo.get('especialidade') or '—'}]: ", obrigatorio=False
    ) or alvo.get("especialidade", "")
    alvo["email"] = utils.input_texto(f"  E-mail [{alvo['email']}]: ", obrigatorio=False) or alvo["email"]

    storage.salvar("dentistas", lista)
    print("  Dentista atualizado com sucesso!")
    utils.pausar()


def excluir_dentista(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 4):
        print("  Acesso negado. Apenas o Administrador pode excluir dentistas.")
        utils.pausar()
        return

    utils.cabecalho("EXCLUIR DENTISTA")
    lista = listar_dentistas(pausar=False)
    if not lista:
        utils.pausar()
        return

    uid = utils.input_inteiro("  ID do dentista a excluir: ", 1)
    alvo = next((d for d in lista if d["id"] == uid), None)
    if not alvo:
        print("  Dentista não encontrado.")
        utils.pausar()
        return

    if not utils.confirmar(f"  Excluir '{alvo['nome']}'? (S/N): "):
        print("  Operação cancelada.")
        utils.pausar()
        return

    lista.remove(alvo)
    storage.salvar("dentistas", lista)
    print("  Dentista excluído com sucesso!")
    utils.pausar()


# ══════════════════════════════════════════════════════════
#  PACIENTES
# ══════════════════════════════════════════════════════════

def menu_pacientes(usuario_logado: dict) -> None:
    """Submenu de gestão de pacientes (Auxiliar+)."""
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    while True:
        utils.cabecalho("GESTÃO DE PACIENTES")
        print("  [1] Listar pacientes")
        print("  [2] Cadastrar paciente")
        print("  [3] Editar paciente")
        print("  [4] Excluir paciente")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 4)

        if opcao == 0:
            break
        elif opcao == 1:
            listar_pacientes()
        elif opcao == 2:
            cadastrar_paciente(usuario_logado)
        elif opcao == 3:
            editar_paciente(usuario_logado)
        elif opcao == 4:
            excluir_paciente(usuario_logado)


def listar_pacientes(pausar: bool = True) -> list:
    utils.cabecalho("PACIENTES CADASTRADOS")
    lista = storage.carregar("pacientes")
    dentistas = storage.carregar("dentistas")
    if not lista:
        print("  Nenhum paciente cadastrado.")
    for p in lista:
        dent = next((d for d in dentistas if d["id"] == p.get("id_dentista")), None)
        dent_nome = f"Dr(a). {dent['nome']}" if dent else "—"
        nasc = utils.formatar_data(p.get("data_nasc", ""))
        print(f"  [{p['id']}] {p['nome']} | Nasc.: {nasc} | Tel.: {p['telefone']} | Dentista: {dent_nome}")
    if pausar:
        utils.pausar()
    return lista


def cadastrar_paciente(usuario_logado: dict) -> dict | None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return None

    utils.cabecalho("CADASTRAR PACIENTE")
    nome = utils.input_texto("  Nome completo: ")
    cpf = utils.input_cpf(
        prompt="  CPF (XXX.XXX.XXX-XX) — opcional, Enter para pular: ", obrigatorio=False
    )
    data_nasc = utils.input_data("  Data de nascimento (DD/MM/AAAA): ")
    telefone = utils.input_texto("  Telefone: ")
    email = utils.input_texto("  E-mail: ")

    # Vincula a um dentista
    dentistas = storage.carregar("dentistas")
    if not dentistas:
        print("  Nenhum dentista disponível para vincular.")
        utils.pausar()
        return None

    print("\n  Dentista responsável:")
    for d in dentistas:
        print(f"    [{d['id']}] {d['nome']} | CRO: {d['cro']}")
    id_dent = utils.input_inteiro("  ID do dentista: ", 1)
    dent = next((d for d in dentistas if d["id"] == id_dent), None)
    if not dent:
        print("  Dentista não encontrado.")
        utils.pausar()
        return None

    lista = storage.carregar("pacientes")
    if cpf and any(p.get("cpf") == cpf for p in lista):
        print("  Já existe um paciente com esse CPF.")
        utils.pausar()
        return None

    novo = {
        "id": storage.proximo_id(lista),
        "nome": nome,
        "cpf": cpf,
        "data_nasc": data_nasc,
        "telefone": telefone,
        "email": email,
        "id_dentista": id_dent,
    }
    lista.append(novo)
    storage.salvar("pacientes", lista)
    print(f"  Paciente '{nome}' cadastrado com sucesso! (ID: {novo['id']})")
    utils.pausar()
    return novo


def editar_paciente(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    utils.cabecalho("EDITAR PACIENTE")
    lista = listar_pacientes(pausar=False)
    if not lista:
        utils.pausar()
        return

    uid = utils.input_inteiro("  ID do paciente a editar: ", 1)
    alvo = next((p for p in lista if p["id"] == uid), None)
    if not alvo:
        print("  Paciente não encontrado.")
        utils.pausar()
        return

    print(f"\n  Editando: {alvo['nome']}")
    print("  (Deixe em branco para manter o valor atual)\n")

    alvo["nome"] = utils.input_texto(f"  Nome [{alvo['nome']}]: ", obrigatorio=False) or alvo["nome"]

    cpf_atual = alvo.get("cpf") or "não informado"
    novo_cpf = utils.input_cpf(
        prompt=f"  CPF [{cpf_atual}] (Enter para manter): ", obrigatorio=False
    )
    if novo_cpf:
        outros = [p for p in lista if p["id"] != alvo["id"]]
        if any(p.get("cpf") == novo_cpf for p in outros):
            print("  Já existe outro paciente com esse CPF.")
            utils.pausar()
            return
        alvo["cpf"] = novo_cpf

    alterar_nasc = utils.confirmar("  Alterar data de nascimento? (S/N): ")
    if alterar_nasc:
        alvo["data_nasc"] = utils.input_data("  Nova data (DD/MM/AAAA): ")

    alvo["telefone"] = utils.input_texto(f"  Telefone [{alvo['telefone']}]: ", obrigatorio=False) or alvo["telefone"]
    alvo["email"] = utils.input_texto(f"  E-mail [{alvo['email']}]: ", obrigatorio=False) or alvo["email"]

    storage.salvar("pacientes", lista)
    print("  Paciente atualizado com sucesso!")
    utils.pausar()


def excluir_paciente(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 3):
        print("  Acesso negado. Necessário cargo Coordenador ou superior.")
        utils.pausar()
        return

    utils.cabecalho("EXCLUIR PACIENTE")
    lista = listar_pacientes(pausar=False)
    if not lista:
        utils.pausar()
        return

    uid = utils.input_inteiro("  ID do paciente a excluir: ", 1)
    alvo = next((p for p in lista if p["id"] == uid), None)
    if not alvo:
        print("  Paciente não encontrado.")
        utils.pausar()
        return

    if not utils.confirmar(f"  Excluir '{alvo['nome']}'? (S/N): "):
        print("  Operação cancelada.")
        utils.pausar()
        return

    lista.remove(alvo)
    storage.salvar("pacientes", lista)
    print("  Paciente excluído com sucesso!")
    utils.pausar()


# ══════════════════════════════════════════════════════════
#  CAMPANHAS
# ══════════════════════════════════════════════════════════

def menu_campanhas(usuario_logado: dict) -> None:
    """Submenu de gestão de campanhas (Coordenador+)."""
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    while True:
        utils.cabecalho("GESTÃO DE CAMPANHAS")
        print("  [1] Listar campanhas")
        print("  [2] Cadastrar campanha")
        print("  [3] Editar campanha")
        print("  [4] Excluir campanha")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 4)

        if opcao == 0:
            break
        elif opcao == 1:
            listar_campanhas()
        elif opcao == 2:
            cadastrar_campanha(usuario_logado)
        elif opcao == 3:
            editar_campanha(usuario_logado)
        elif opcao == 4:
            excluir_campanha(usuario_logado)


def listar_campanhas(pausar: bool = True) -> list:
    utils.cabecalho("CAMPANHAS CADASTRADAS")
    lista = storage.carregar("campanhas")
    colaboradores = storage.carregar("colaboradores")
    if not lista:
        print("  Nenhuma campanha cadastrada.")
    for c in lista:
        colab = next((col for col in colaboradores if col["id"] == c.get("id_colaborador")), None)
        colab_nome = colab["nome"] if colab else "—"
        data_inicio = utils.formatar_data(c.get("data_inicio", ""))
        data_fim = utils.formatar_data(c.get("data_fim", ""))
        print(f"  [{c['id']}] {c['nome']} | {c['local']} | {data_inicio} a {data_fim} | Responsável: {colab_nome}")
    if pausar:
        utils.pausar()
    return lista


def cadastrar_campanha(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    utils.cabecalho("CADASTRAR CAMPANHA")
    nome = utils.input_texto("  Nome da campanha: ")
    local = utils.input_texto("  Local: ")
    data_inicio = utils.input_data("  Data de início (DD/MM/AAAA): ")
    data_fim = utils.input_data("  Data de fim (DD/MM/AAAA): ")

    # Valida datas
    from datetime import datetime
    try:
        d_inicio = datetime.strptime(data_inicio, "%Y-%m-%d")
        d_fim = datetime.strptime(data_fim, "%Y-%m-%d")
        if d_fim < d_inicio:
            print("  Data de fim não pode ser anterior à data de início.")
            utils.pausar()
            return
    except ValueError:
        print("  Datas inválidas.")
        utils.pausar()
        return

    lista = storage.carregar("campanhas")
    novo = {
        "id": storage.proximo_id(lista),
        "nome": nome,
        "local": local,
        "data_inicio": data_inicio,
        "data_fim": data_fim,
        "id_colaborador": usuario_logado["id"],
    }
    lista.append(novo)
    storage.salvar("campanhas", lista)
    print(f"  Campanha '{nome}' cadastrada com sucesso! (ID: {novo['id']})")
    utils.pausar()


def editar_campanha(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    utils.cabecalho("EDITAR CAMPANHA")
    lista = listar_campanhas(pausar=False)
    id_camp = utils.input_inteiro("  ID da campanha a editar: ", 1)
    alvo = next((c for c in lista if c["id"] == id_camp), None)
    if not alvo:
        print("  Campanha não encontrada.")
        utils.pausar()
        return

    print(f"\n  Editando: {alvo['nome']}")
    print("  [1] Nome")
    print("  [2] Local")
    print("  [3] Data de início")
    print("  [4] Data de fim")
    print("  [0] Cancelar")
    campo = utils.input_inteiro("  Campo a editar: ", 0, 4)

    if campo == 0:
        utils.pausar()
        return
    elif campo == 1:
        alvo["nome"] = utils.input_texto("  Novo nome: ")
    elif campo == 2:
        alvo["local"] = utils.input_texto("  Novo local: ")
    elif campo == 3:
        alvo["data_inicio"] = utils.input_data("  Nova data de início (DD/MM/AAAA): ")
    elif campo == 4:
        alvo["data_fim"] = utils.input_data("  Nova data de fim (DD/MM/AAAA): ")

    storage.salvar("campanhas", lista)
    print("  Campanha atualizada com sucesso!")
    utils.pausar()


def excluir_campanha(usuario_logado: dict) -> None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return

    utils.cabecalho("EXCLUIR CAMPANHA")
    lista = listar_campanhas(pausar=False)
    id_camp = utils.input_inteiro("  ID da campanha a excluir: ", 1)
    alvo = next((c for c in lista if c["id"] == id_camp), None)
    if not alvo:
        print("  Campanha não encontrada.")
        utils.pausar()
        return

    # Check if campaign is in use
    atendimentos = storage.carregar("atendimentos")
    em_uso = any(a.get("id_campanha") == id_camp for a in atendimentos)
    if em_uso:
        print("  Esta campanha está vinculada a atendimentos e não pode ser excluída.")
        utils.pausar()
        return

    lista.remove(alvo)
    storage.salvar("campanhas", lista)
    print("  Campanha excluída com sucesso!")
    utils.pausar()


# ══════════════════════════════════════════════════════════
#  SOLICITAÇÕES DE CADASTRO
# ══════════════════════════════════════════════════════════

def menu_solicitacoes(usuario_logado: dict) -> None:
    """Submenu de solicitações pendentes (Coordenador+)."""
    if not tem_permissao(usuario_logado, 3):
        print("  Acesso negado.")
        utils.pausar()
        return

    while True:
        utils.cabecalho("SOLICITAÇÕES DE CADASTRO")
        solicitacoes = storage.carregar("solicitacoes")
        pendentes = [s for s in solicitacoes if s["status"] == "pendente"]
        print(f"  Pendentes: {len(pendentes)}")
        print("  [1] Ver solicitações pendentes")
        print("  [2] Aprovar solicitação")
        print("  [3] Recusar solicitação")
        print("  [0] Voltar")
        opcao = utils.input_inteiro("  Opção: ", 0, 3)

        if opcao == 0:
            break
        elif opcao == 1:
            _listar_solicitacoes(solicitacoes)
        elif opcao == 2:
            _aprovar_solicitacao(usuario_logado, solicitacoes)
        elif opcao == 3:
            _recusar_solicitacao(solicitacoes)


def _listar_solicitacoes(solicitacoes: list) -> None:
    utils.cabecalho("SOLICITAÇÕES")
    if not solicitacoes:
        print("  Nenhuma solicitação registrada.")
        utils.pausar()
        return
    for s in solicitacoes:
        dados = s["dados"]
        print(f"  [{s['id']}] {s['tipo'].upper()} — {dados.get('nome', '?')} | "
              f"Status: {s['status']} | Data: {s['data'][:10]}")
    utils.pausar()


def _aprovar_solicitacao(usuario_logado: dict, solicitacoes: list) -> None:
    pendentes = [s for s in solicitacoes if s["status"] == "pendente"]
    if not pendentes:
        print("  Nenhuma solicitação pendente.")
        utils.pausar()
        return

    _listar_solicitacoes(pendentes)
    sid = utils.input_inteiro("  ID da solicitação a aprovar: ", 1)
    sol = next((s for s in pendentes if s["id"] == sid), None)
    if not sol:
        print("  Solicitação não encontrada.")
        utils.pausar()
        return

    dados = sol["dados"]
    tipo = sol["tipo"]

    if tipo == "dentista":
        # Necessita vincular a um colaborador
        colaboradores = storage.carregar("colaboradores")
        if not colaboradores:
            print("  Nenhum colaborador disponível para vincular.")
            utils.pausar()
            return
        print("\n  Colaborador responsável:")
        for c in colaboradores:
            print(f"    [{c['id']}] {c['nome']} — {c['cargo']}")
        id_colab = utils.input_inteiro("  ID do colaborador: ", 1)
        if not any(c["id"] == id_colab for c in colaboradores):
            print("  Colaborador inválido.")
            utils.pausar()
            return

        lista_dent = storage.carregar("dentistas")
        novo = {
            "id": storage.proximo_id(lista_dent),
            "nome": dados["nome"],
            "cpf": dados.get("cpf"),
            "email": dados["email"],
            "senha": dados["senha"],
            "cro": dados.get("cro", ""),
            "especialidade": dados.get("especialidade", ""),
            "disponibilidade": 1,
            "id_colaborador": id_colab,
        }
        lista_dent.append(novo)
        storage.salvar("dentistas", lista_dent)

    else:  # colaborador
        lista_colab = storage.carregar("colaboradores")
        novo = {
            "id": storage.proximo_id(lista_colab),
            "nome": dados["nome"],
            "cpf": dados.get("cpf"),
            "email": dados["email"],
            "senha": dados["senha"],
            "cargo": dados.get("cargo", "Estagiário"),
            "disponibilidade": 1,
        }
        lista_colab.append(novo)
        storage.salvar("colaboradores", lista_colab)

    # Atualiza status da solicitação
    for s in solicitacoes:
        if s["id"] == sid:
            s["status"] = "aprovado"
    storage.salvar("solicitacoes", solicitacoes)
    print(f"  Solicitação aprovada! {tipo.capitalize()} '{dados['nome']}' cadastrado.")
    utils.pausar()


def _recusar_solicitacao(solicitacoes: list) -> None:
    pendentes = [s for s in solicitacoes if s["status"] == "pendente"]
    if not pendentes:
        print("  Nenhuma solicitação pendente.")
        utils.pausar()
        return

    _listar_solicitacoes(pendentes)
    sid = utils.input_inteiro("  ID da solicitação a recusar: ", 1)
    sol = next((s for s in pendentes if s["id"] == sid), None)
    if not sol:
        print("  Solicitação não encontrada.")
        utils.pausar()
        return

    for s in solicitacoes:
        if s["id"] == sid:
            s["status"] = "recusado"
    storage.salvar("solicitacoes", solicitacoes)
    print("  Solicitação recusada.")
    utils.pausar()
