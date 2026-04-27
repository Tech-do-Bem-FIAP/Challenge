import json
import os

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

ENTIDADES = [
    "colaboradores",
    "dentistas",
    "pacientes",
    "atendimentos",
    "campanhas",
    "notificacoes",
    "anotacoes",
    "solicitacoes",
]


def inicializar():
    """Cria a pasta data/ e os arquivos JSON caso não existam."""
    os.makedirs(DATA_DIR, exist_ok=True)
    for entidade in ENTIDADES:
        caminho = os.path.join(DATA_DIR, f"{entidade}.json")
        if not os.path.exists(caminho):
            with open(caminho, "w", encoding="utf-8") as f:
                json.dump([], f)


def carregar(entidade: str) -> list:
    """Carrega e retorna a lista de registros de uma entidade."""
    caminho = os.path.join(DATA_DIR, f"{entidade}.json")
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def salvar(entidade: str, dados: list) -> None:
    """Persiste a lista de registros de uma entidade."""
    caminho = os.path.join(DATA_DIR, f"{entidade}.json")
    with open(caminho, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)


def proximo_id(lista: list) -> int:
    """Retorna o próximo ID disponível para uma lista de registros."""
    if not lista:
        return 1
    return max(item["id"] for item in lista) + 1
