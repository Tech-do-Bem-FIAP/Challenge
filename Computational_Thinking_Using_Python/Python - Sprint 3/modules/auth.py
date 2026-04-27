from __future__ import annotations

from modules import storage, utils

# Hierarquia numérica de cargos de colaborador
NIVEL_CARGO = {
    "Estagiário": 1,
    "Auxiliar": 2,
    "Coordenador": 3,
    "Administrador": 4,
}


# ── Permissões ────────────────────────────────────────────

def nivel_colaborador(colaborador: dict) -> int:
    """Retorna o nível hierárquico do cargo de um colaborador."""
    return NIVEL_CARGO.get(colaborador.get("cargo", ""), 0)


def tem_permissao(colaborador: dict, nivel_minimo: int) -> bool:
    """Retorna True se o colaborador tiver nível >= nivel_minimo."""
    return nivel_colaborador(colaborador) >= nivel_minimo


# ── Login ─────────────────────────────────────────────────

def fazer_login() -> tuple[str, dict] | None:
    """
    Solicita credenciais e busca em colaboradores e dentistas.
    Retorna ("colaborador", objeto) ou ("dentista", objeto), ou None em caso de falha.
    """
    utils.cabecalho("LOGIN")
    usuario = utils.input_texto("Usuário (e-mail): ")
    senha = utils.input_senha("Senha: ")

    # Busca em colaboradores
    for colab in storage.carregar("colaboradores"):
        if colab["email"].lower() == usuario.lower() and colab["senha"] == senha:
            print(f"\n  Bem-vindo(a), {colab['nome']}! [{colab['cargo']}]")
            utils.pausar()
            return ("colaborador", colab)

    # Busca em dentistas
    for dent in storage.carregar("dentistas"):
        if dent["email"].lower() == usuario.lower() and dent["senha"] == senha:
            print(f"\n  Bem-vindo(a), Dr(a). {dent['nome']}!")
            utils.pausar()
            return ("dentista", dent)

    print("\n  Usuário ou senha incorretos.")
    utils.pausar()
    return None


# ── Troca de senha ────────────────────────────────────────

def trocar_senha(tipo: str, usuario: dict, admin_mode: bool = False) -> None:
    """
    Permite ao usuário trocar a própria senha.
    Se admin_mode=True (apenas Administrador), permite trocar a senha de outro usuário.
    """
    utils.cabecalho("ALTERAR SENHA")

    if admin_mode:
        _trocar_senha_admin()
        return

    # Confirma senha atual
    atual = utils.input_senha("Senha atual: ")
    if atual != usuario["senha"]:
        print("  Senha atual incorreta.")
        utils.pausar()
        return

    nova = utils.input_senha("Nova senha: ")
    confirmacao = utils.input_senha("Confirme a nova senha: ")
    if nova != confirmacao:
        print("  As senhas não coincidem.")
        utils.pausar()
        return
    if not nova:
        print("  A senha não pode ser vazia.")
        utils.pausar()
        return

    entidade = "colaboradores" if tipo == "colaborador" else "dentistas"
    lista = storage.carregar(entidade)
    for item in lista:
        if item["id"] == usuario["id"]:
            item["senha"] = nova
            break
    storage.salvar(entidade, lista)
    # Atualiza o dict em memória
    usuario["senha"] = nova
    print("  Senha alterada com sucesso!")
    utils.pausar()


def _trocar_senha_admin() -> None:
    """Fluxo exclusivo do Administrador para trocar senha de qualquer usuário."""
    print("  [1] Colaborador")
    print("  [2] Dentista")
    tipo_num = utils.input_inteiro("  Tipo de usuário: ", 1, 2)
    entidade = "colaboradores" if tipo_num == 1 else "dentistas"

    lista = storage.carregar(entidade)
    if not lista:
        print("  Nenhum usuário cadastrado nessa categoria.")
        utils.pausar()
        return

    for item in lista:
        rotulo = item.get("cargo", "Dentista") if entidade == "colaboradores" else "Dentista"
        print(f"  [{item['id']}] {item['nome']} — {rotulo}")

    uid = utils.input_inteiro("  ID do usuário: ", 1)
    alvo = next((i for i in lista if i["id"] == uid), None)
    if not alvo:
        print("  Usuário não encontrado.")
        utils.pausar()
        return

    nova = utils.input_senha(f"  Nova senha para {alvo['nome']}: ")
    confirmacao = utils.input_senha("  Confirme: ")
    if nova != confirmacao:
        print("  As senhas não coincidem.")
        utils.pausar()
        return
    if not nova:
        print("  A senha não pode ser vazia.")
        utils.pausar()
        return

    alvo["senha"] = nova
    storage.salvar(entidade, lista)
    print(f"  Senha de {alvo['nome']} alterada com sucesso!")
    utils.pausar()


# ── Solicitação de cadastro (pré-login) ───────────────────

def submeter_solicitacao() -> None:
    """Qualquer pessoa pode submeter uma solicitação de cadastro."""
    utils.cabecalho("SOLICITAR CADASTRO")
    print("  [1] Dentista voluntário")
    print("  [2] Colaborador")
    print("  [0] Voltar")
    opcao = utils.input_inteiro("  Opção: ", 0, 2)

    if opcao == 0:
        return

    if opcao == 1:
        dados = _coletar_dados_dentista()
        tipo = "dentista"
    else:
        dados = _coletar_dados_colaborador()
        tipo = "colaborador"

    if not dados:
        return

    solicitacoes = storage.carregar("solicitacoes")
    nova = {
        "id": storage.proximo_id(solicitacoes),
        "tipo": tipo,
        "dados": dados,
        "status": "pendente",
        "data": utils.datetime_agora_iso(),
    }
    solicitacoes.append(nova)
    storage.salvar("solicitacoes", solicitacoes)
    print("\n  Solicitação enviada! Aguarde a aprovação de um administrador ou coordenador.")
    utils.pausar()


def _coletar_dados_dentista() -> dict | None:
    utils.separador()
    print("  Preencha os dados para cadastro como dentista:")
    nome = utils.input_texto("  Nome completo: ")
    cpf = utils.input_cpf(obrigatorio=True)
    cro = utils.input_cro()
    especialidade = utils.input_texto("  Especialidade (opcional): ", obrigatorio=False)
    email = utils.input_texto("  E-mail (será seu usuário de login): ")
    senha = utils.input_senha("  Crie uma senha: ")
    confirmacao = utils.input_senha("  Confirme a senha: ")
    if senha != confirmacao:
        print("  As senhas não coincidem. Solicitação cancelada.")
        utils.pausar()
        return None
    return {"nome": nome, "cpf": cpf, "cro": cro, "especialidade": especialidade,
            "email": email, "senha": senha, "disponibilidade": 1}


def _coletar_dados_colaborador() -> dict | None:
    utils.separador()
    print("  Preencha os dados para cadastro como colaborador:")
    print("  Cargos disponíveis: Estagiário, Auxiliar, Coordenador")
    nome = utils.input_texto("  Nome completo: ")
    cpf = utils.input_cpf(obrigatorio=True)
    cargo = _input_cargo(incluir_admin=False)
    email = utils.input_texto("  E-mail (será seu usuário de login): ")
    senha = utils.input_senha("  Crie uma senha: ")
    confirmacao = utils.input_senha("  Confirme a senha: ")
    if senha != confirmacao:
        print("  As senhas não coincidem. Solicitação cancelada.")
        utils.pausar()
        return None
    return {"nome": nome, "cpf": cpf, "cargo": cargo, "email": email,
            "senha": senha, "disponibilidade": 1}


def _input_cargo(incluir_admin: bool = False) -> str:
    cargos = ["Estagiário", "Auxiliar", "Coordenador"]
    if incluir_admin:
        cargos.append("Administrador")
    for i, c in enumerate(cargos, 1):
        print(f"  [{i}] {c}")
    idx = utils.input_inteiro("  Cargo: ", 1, len(cargos))
    return cargos[idx - 1]
