from __future__ import annotations

import os
import re
from datetime import datetime

LINHA = "=" * 55
LINHA_FINA = "-" * 55


# ── Exibição ──────────────────────────────────────────────

def limpar_tela():
    os.system("cls" if os.name == "nt" else "clear")


def cabecalho(titulo: str):
    limpar_tela()
    print(LINHA)
    print(f"  {titulo}")
    print(LINHA)


def pausar():
    input("\nPressione Enter para continuar...")


def separador():
    print(LINHA_FINA)


# ── Entradas seguras ──────────────────────────────────────

def input_texto(prompt: str, obrigatorio: bool = True) -> str:
    """Lê uma string, opcionalmente rejeitando entradas em branco."""
    while True:
        try:
            valor = input(prompt).strip()
        except (EOFError, KeyboardInterrupt):
            print()
            return ""
        if obrigatorio and not valor:
            print("  Campo obrigatório. Tente novamente.")
            continue
        return valor


def input_inteiro(prompt: str, minimo: int = None, maximo: int = None) -> int:
    """Lê um inteiro dentro de um intervalo opcional."""
    while True:
        try:
            valor = int(input(prompt).strip())
        except ValueError:
            print("  Entrada inválida. Digite um número inteiro.")
            continue
        except (EOFError, KeyboardInterrupt):
            print()
            return minimo if minimo is not None else 0
        if minimo is not None and valor < minimo:
            print(f"  Valor mínimo: {minimo}.")
            continue
        if maximo is not None and valor > maximo:
            print(f"  Valor máximo: {maximo}.")
            continue
        return valor


def input_data(prompt: str) -> str:
    """Lê uma data no formato DD/MM/AAAA e retorna como string ISO (AAAA-MM-DD)."""
    while True:
        raw = input_texto(prompt)
        try:
            dt = datetime.strptime(raw, "%d/%m/%Y")
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            print("  Formato inválido. Use DD/MM/AAAA.")


def input_cpf(prompt: str = "  CPF (XXX.XXX.XXX-XX): ", obrigatorio: bool = True) -> str | None:
    """Lê e valida CPF no formato XXX.XXX.XXX-XX. Retorna None se opcional e em branco."""
    _CPF_RE = re.compile(r"^\d{3}\.\d{3}\.\d{3}-\d{2}$")
    while True:
        valor = input(prompt).strip()
        if not valor:
            if obrigatorio:
                print("  CPF obrigatório. Tente novamente.")
                continue
            return None
        if not _CPF_RE.match(valor):
            print("  CPF inválido. Use o formato XXX.XXX.XXX-XX (ex: 123.456.789-00).")
            continue
        return valor


def input_cro(prompt: str = "  CRO (XXXXXX-UF, ex: 123456-SP): ") -> str:
    """Lê e valida CRO no formato XXXXXX-UF."""
    _CRO_RE = re.compile(r"^\d{6}-[A-Z]{2}$")
    while True:
        valor = input(prompt).strip().upper()
        if not valor:
            print("  CRO obrigatório. Tente novamente.")
            continue
        if not _CRO_RE.match(valor):
            print("  CRO inválido. Use o formato XXXXXX-UF (ex: 123456-SP).")
            continue
        return valor


def input_cro_opcional(prompt: str = "  CRO (XXXXXX-UF, ex: 123456-SP): ") -> str | None:
    """Lê e valida CRO no formato XXXXXX-UF. Retorna None se deixado em branco."""
    _CRO_RE = re.compile(r"^\d{6}-[A-Z]{2}$")
    while True:
        valor = input(prompt).strip().upper()
        if not valor:
            return None
        if not _CRO_RE.match(valor):
            print("  CRO inválido. Use o formato XXXXXX-UF (ex: 123456-SP).")
            continue
        return valor


def input_senha(prompt: str = "Senha: ") -> str:
    """Lê senha com getpass quando disponível, senão usa input normal."""
    try:
        import getpass
        return getpass.getpass(prompt)
    except Exception:
        return input_texto(prompt)


def confirmar(prompt: str = "Confirmar? (S/N): ") -> bool:
    """Retorna True se o usuário digitar S ou s."""
    while True:
        resp = input(prompt).strip().upper()
        if resp in ("S", "N"):
            return resp == "S"
        print("  Digite S para sim ou N para não.")


# ── Formatação de data ────────────────────────────────────

def formatar_data(iso: str) -> str:
    """Converte AAAA-MM-DD para DD/MM/AAAA. Retorna o valor original em caso de erro."""
    try:
        return datetime.strptime(iso, "%Y-%m-%d").strftime("%d/%m/%Y")
    except (ValueError, TypeError):
        return iso or "—"


def data_hoje_iso() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def datetime_agora_iso() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


# ── Menu genérico ─────────────────────────────────────────

def exibir_menu(opcoes: list[str]) -> None:
    """Exibe uma lista numerada de opções. O índice 0 é reservado para 'Voltar/Sair'."""
    for i, opcao in enumerate(opcoes):
        prefixo = "0" if i == len(opcoes) - 1 else str(i + 1)
        print(f"  [{prefixo}] {opcao}")
