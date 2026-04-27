# COMPUTATIONAL THINKING USING PYTHON

---

## SPRINT \[3\] — REPORT

**12 DE ABRIL DE 2026**

---

**Turma 1TDSPR**

RM 568542 — Hugo Souza de Jesus

RM 566815 — Lucas Campanhã dos Santos

RM 567010 — Lucas Marcelino Pompeu

**LINK PARA O VÍDEO NO YOUTUBE: https://youtu.be/_AhYDvwpjlc**

---

&nbsp;

---

# SUMÁRIO

**INTRODUÇÃO** .............................................................. 3

**OBJETIVOS** .................................................................. 4
- Objetivo Geral ................................................................ 4
- Objetivos Específicos ....................................................... 4

**JUSTIFICATIVA** ............................................................ 5

**ARQUITETURA DO SISTEMA** ......................................... 6
- Estrutura de Arquivos ...................................................... 6
- Responsabilidades dos Módulos ......................................... 7

**MODELO DE DADOS** ..................................................... 9
- Entidades e Campos ........................................................ 9
- Relacionamentos ........................................................... 11

**SISTEMA DE PERMISSÕES** ........................................... 12

**DESCRIÇÃO DAS FUNCIONALIDADES** ............................ 13
- Módulo de Acesso Público ................................................ 13
- Módulo Administrativo (Pós-Login) .................................... 14
- Painel do Colaborador ..................................................... 14
- Painel do Dentista .......................................................... 16

**ESTRUTURAS DE PROGRAMAÇÃO UTILIZADAS** .............. 18
- CRUD e Persistência em JSON ........................................... 18
- Funções com Parâmetros e Retorno ................................... 19
- Listas e Dicionários ........................................................ 20
- Validação de Entradas e Tratamento de Exceções .................. 21

**COMO EXECUTAR** ....................................................... 22

**CONCLUSÃO** .............................................................. 23

---

&nbsp;

---

# INTRODUÇÃO

O presente documento descreve o desenvolvimento da **Sprint 3** do projeto *Tech do Bem*, realizado no âmbito da disciplina **Computational Thinking Using Python** do curso de Tecnologia em Desenvolvimento de Software da FIAP, turma **1TDSPR**.

O projeto consiste na construção de um **sistema de gestão em modo texto** (via terminal) para a ONG *Turma do Bem*, organização dedicada ao atendimento odontológico gratuito a populações em situação de vulnerabilidade social. O sistema gerencia os três principais atores da organização — **Colaboradores**, **Dentistas voluntários** e **Pacientes** —, implementando regras de negócio, controle de acesso por cargo, persistência de dados e comunicação interna por notificações.

Esta sprint representa uma evolução significativa em relação ao protótipo inicial entregue na Sprint 1. Enquanto aquele demonstrava o fluxo básico de interação em memória, sem persistência e com apenas um usuário de cada tipo, o sistema atual implementa um **CRUD completo** para todas as entidades, **autenticação com controle de permissões por cargo**, **persistência de dados em arquivos JSON** e uma experiência de uso muito mais próxima de um sistema real.

A solução foi construída inteiramente com recursos da biblioteca padrão do Python, sem dependências externas, e organizada em módulos com responsabilidades bem definidas, refletindo boas práticas de programação e separação de responsabilidades.

---

&nbsp;

---

# OBJETIVOS

## Objetivo Geral

Evoluir o protótipo desenvolvido na Sprint 1 para um sistema de gestão funcional e completo, com persistência de dados em arquivos JSON, controle de acesso baseado em cargos, operações de CRUD para todas as entidades principais e comunicação interna entre os atores da ONG *Turma do Bem*.

## Objetivos Específicos

- Implementar um **CRUD completo** (inserção, consulta, alteração e exclusão) para as entidades Colaborador, Dentista e Paciente.
- Estruturar o código em **funções com passagem de parâmetros e retorno**, garantindo reutilização e clareza.
- Utilizar **listas e dicionários** como estruturas de dados centrais para armazenamento e manipulação em memória.
- Realizar **validações nas entradas do usuário** e tratar exceções com `try/except` em todas as leituras de dados.
- Implementar **persistência de dados em arquivos JSON**, garantindo que as informações sobrevivam ao encerramento do programa.
- Criar um **sistema de login** com autenticação para Colaboradores e Dentistas, roteando cada perfil ao seu painel correspondente.
- Implementar **controle de permissões por cargo**, restringindo o acesso às funcionalidades conforme a hierarquia organizacional.
- Desenvolver um sistema de **notificações internas** entre Colaboradores e Dentistas, e entre Dentistas e Pacientes.
- Permitir que **anotações compartilhadas** sobre Dentistas e Pacientes sejam criadas e consultadas pelos atores responsáveis.
- Garantir **boa experiência de uso** com menus claros, mensagens de feedback, confirmações e limpeza de tela.

---

&nbsp;

---

# JUSTIFICATIVA

A gestão eficiente de uma organização do terceiro setor depende de informações bem organizadas, comunicação fluida entre seus membros e controle rigoroso sobre quem pode executar cada ação. No contexto da *Turma do Bem*, a falta de um sistema centralizado representa um risco operacional concreto: agendamentos perdidos, prontuários desatualizados e falta de visibilidade dos gestores sobre as atividades em campo.

O sistema desenvolvido nesta sprint endereça diretamente esses problemas. A **persistência em JSON** elimina a perda de dados entre sessões. O **controle de permissões por cargo** garante que cada usuário acesse apenas o que é pertinente à sua função, evitando alterações indevidas. As **notificações automáticas geradas ao registrar um atendimento** mantêm o colaborador responsável informado em tempo real, sem exigir comunicação manual.

Do ponto de vista técnico, a organização do código em módulos com responsabilidades bem definidas facilita a manutenção e a evolução do sistema. Cada módulo resolve um problema específico: `storage.py` abstrai o acesso ao disco, `auth.py` centraliza autenticação e permissões, `crud.py` concentra as operações de dados e os painéis encapsulam a lógica de apresentação de cada perfil. Essa arquitetura espelha padrões utilizados em sistemas reais, preparando o projeto para futuras integrações com banco de dados relacional e interfaces web.

A escolha do Python como linguagem e de arquivos JSON como mecanismo de persistência reflete o escopo da disciplina, ao mesmo tempo que demonstra como conceitos fundamentais — funções, estruturas de dados, I/O de arquivos e tratamento de exceções — são suficientes para construir soluções funcionais e de valor real.

---

&nbsp;

---

# ARQUITETURA DO SISTEMA

## Estrutura de Arquivos

O projeto está organizado da seguinte forma:

```
projeto_python/
│
├── main.py                       # Ponto de entrada e menu público
│
├── data/                         # Arquivos de persistência (criados automaticamente)
│   ├── colaboradores.json
│   ├── dentistas.json
│   ├── pacientes.json
│   ├── atendimentos.json
│   ├── campanhas.json
│   ├── notificacoes.json
│   ├── anotacoes.json
│   └── solicitacoes.json
│
└── modules/
    ├── __init__.py
    ├── storage.py                # Leitura e escrita de JSON; geração de IDs
    ├── utils.py                  # Entrada segura, formatação, utilitários de tela
    ├── auth.py                   # Login, troca de senha, solicitações, permissões
    ├── crud.py                   # CRUD: Colaborador, Dentista, Paciente, Solicitações
    ├── painel_colaborador.py     # Dashboard e funcionalidades do Colaborador
    └── painel_dentista.py        # Dashboard e funcionalidades do Dentista
```

A pasta `data/` e todos os arquivos JSON são criados automaticamente na primeira execução do programa, caso não existam. O usuário `ADMIN` também é inserido automaticamente nesse momento.

---

## Responsabilidades dos Módulos

### `main.py` — Ponto de Entrada

Ponto de entrada do sistema. É responsável por:

1. Chamar `storage.inicializar()` para garantir que os arquivos de dados existam.
2. Verificar se o usuário `ADMIN` está presente e criá-lo caso contrário.
3. Exibir o **menu público**, que é o único ponto de acesso antes do login.
4. Após autenticação bem-sucedida, rotear o usuário para o painel correto (`painel_colaborador` ou `painel_dentista`).

---

### `modules/storage.py` — Camada de Persistência

Abstrai completamente o acesso aos arquivos JSON. Contém três funções:

| Função | Descrição |
|---|---|
| `inicializar()` | Cria a pasta `data/` e todos os arquivos JSON caso não existam |
| `carregar(entidade)` | Lê e retorna a lista de registros do arquivo `data/<entidade>.json` |
| `salvar(entidade, dados)` | Serializa e grava a lista de registros de volta no arquivo |
| `proximo_id(lista)` | Calcula o próximo ID disponível como `max(ids) + 1` |

Todos os demais módulos interagem com os dados exclusivamente por meio dessas funções, garantindo um ponto único de acesso ao disco.

---

### `modules/utils.py` — Utilitários de Interface

Centraliza todas as interações com o usuário de forma segura e padronizada:

| Função | Descrição |
|---|---|
| `input_texto(prompt, obrigatorio)` | Lê texto, com validação de campo obrigatório |
| `input_inteiro(prompt, minimo, maximo)` | Lê inteiro com validação de intervalo |
| `input_data(prompt)` | Lê data no formato `DD/MM/AAAA` e valida com `strptime` |
| `input_senha(prompt)` | Lê senha com `getpass` quando disponível |
| `confirmar(prompt)` | Loop `S/N` para confirmações |
| `cabecalho(titulo)` | Limpa a tela e exibe cabeçalho padronizado |
| `formatar_data(iso)` | Converte `AAAA-MM-DD` para `DD/MM/AAAA` |
| `pausar()` | Aguarda Enter do usuário |

---

### `modules/auth.py` — Autenticação e Permissões

Gerencia o controle de acesso ao sistema:

- **`fazer_login()`** — Busca as credenciais informadas em `colaboradores.json` e `dentistas.json`. Retorna o tipo do usuário e seu dicionário de dados, ou `None` em caso de falha.
- **`trocar_senha(tipo, usuario, admin_mode)`** — Permite ao usuário alterar a própria senha, confirmando a senha atual. No modo `admin_mode`, o Administrador pode alterar a senha de qualquer usuário.
- **`submeter_solicitacao()`** — Permite que dentistas ou colaboradores submetam uma solicitação de cadastro antes do login. Os dados são salvos em `solicitacoes.json` com status `pendente`.
- **`tem_permissao(colaborador, nivel_minimo)`** — Verifica se o cargo do colaborador possui nível hierárquico suficiente para executar uma ação.

A hierarquia de cargos é representada numericamente:

| Cargo | Nível |
|---|---|
| Estagiário | 1 |
| Auxiliar | 2 |
| Coordenador | 3 |
| Administrador | 4 |

---

### `modules/crud.py` — Operações de CRUD

Concentra todas as operações de criação, leitura, atualização e exclusão das três entidades principais. Cada entidade possui seu próprio submenu e conjunto de funções, todas recebendo o usuário logado como parâmetro para validação de permissões:

| Entidade | Cadastrar | Listar | Editar | Excluir |
|---|---|---|---|---|
| Colaborador | Administrador | Administrador | Coordenador+ | Administrador |
| Dentista | Administrador | Todos os colaboradores | Auxiliar+ | Administrador |
| Paciente | Auxiliar+ | Todos os colaboradores | Auxiliar+ | Coordenador+ |

Além do CRUD das entidades, `crud.py` gerencia as **solicitações de cadastro**, permitindo que Coordenadores e Administradores aprovem ou recusem pedidos pendentes. A aprovação de uma solicitação cria automaticamente o registro correspondente na entidade correta.

---

### `modules/painel_colaborador.py` — Painel do Colaborador

Implementa todas as funcionalidades do dashboard do colaborador após o login. O menu adapta as opções disponíveis ao cargo do usuário logado.

---

### `modules/painel_dentista.py` — Painel do Dentista

Implementa todas as funcionalidades do dashboard do dentista após o login.

---

&nbsp;

---

# MODELO DE DADOS

Todos os dados são armazenados em arquivos JSON como listas de dicionários. Cada registro possui um campo `id` numérico único, gerado de forma incremental pela função `proximo_id()`.

## Entidades e Campos

### Colaborador (`colaboradores.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `nome` | texto | Nome completo |
| `email` | texto | Usuário de login |
| `senha` | texto | Senha de acesso |
| `cargo` | texto | `Administrador`, `Coordenador`, `Auxiliar` ou `Estagiário` |
| `disponibilidade` | inteiro | `1` (ativo) ou `0` (inativo) |

---

### Dentista (`dentistas.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `nome` | texto | Nome completo |
| `email` | texto | Usuário de login |
| `senha` | texto | Senha de acesso |
| `cro` | texto | Número do CRO |
| `especialidade` | texto | Especialidade odontológica (opcional) |
| `disponibilidade` | inteiro | `1` (ativo) ou `0` (inativo) |
| `id_colaborador` | inteiro | FK para o colaborador responsável |

---

### Paciente (`pacientes.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `nome` | texto | Nome completo |
| `data_nasc` | texto | Data de nascimento (`AAAA-MM-DD`) |
| `telefone` | texto | Telefone para contato |
| `email` | texto | E-mail do paciente |
| `id_dentista` | inteiro | FK para o dentista responsável |

---

### Atendimento (`atendimentos.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `id_paciente` | inteiro | FK para o paciente |
| `id_dentista` | inteiro | FK para o dentista |
| `id_campanha` | inteiro | FK para a campanha odontológica (obrigatório) |
| `dt_atendimento` | texto | Data do atendimento (`AAAA-MM-DD`) |
| `tipo` | texto | Ex.: `Avaliação`, `Restauração`, `Extração` |
| `status` | texto | `agendado`, `realizado` ou `cancelado` |
| `observacoes` | texto | Observações clínicas (opcional) |
| `exames` | lista | Lista de dicionários de exames solicitados |

Cada exame dentro da lista `exames` possui:

| Campo | Tipo | Descrição |
|---|---|---|
| `tipo` | texto | Tipo do exame (ex.: `Radiografia`) |
| `requisitos` | texto | Requisitos do exame (opcional) |
| `resultado` | texto | Resultado preenchido posteriormente (inicia vazio) |

---

### Notificação (`notificacoes.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `mensagem` | texto | Conteúdo da notificação |
| `data_envio` | texto | Data e hora de envio (`AAAA-MM-DD HH:MM:SS`) |
| `lida` | booleano | `false` enquanto não visualizada |
| `remetente_tipo` | texto | `colaborador` ou `dentista` |
| `remetente_id` | inteiro | ID do remetente |
| `destinatario_tipo` | texto | `colaborador`, `dentista` ou `paciente` |
| `destinatario_id` | inteiro | ID do destinatário |

---

### Anotação (`anotacoes.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `texto` | texto | Conteúdo da anotação |
| `data` | texto | Data e hora da criação |
| `autor_id` | inteiro | ID do autor |
| `autor_tipo` | texto | `colaborador` ou `dentista` |
| `sobre_tipo` | texto | `dentista` ou `paciente` |
| `sobre_id` | inteiro | ID do sujeito da anotação |

---

### Solicitação (`solicitacoes.json`)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Identificador único |
| `tipo` | texto | `dentista`, `colaborador` ou `alteracao_paciente` |
| `dados` | dicionário | Dados submetidos na solicitação |
| `status` | texto | `pendente`, `aprovado` ou `recusado` |
| `data` | texto | Data e hora da criação |

---

## Relacionamentos

```
Colaborador ──< Dentista ──< Paciente ──< Atendimento ──< Exame
     │               │            │
     │               └──< Anotação (sobre dentista ou paciente)
     │
     └──< Notificação (de/para colaborador ou dentista)
```

A hierarquia central é: **Colaborador → Dentista → Paciente**. Cada dentista é vinculado a um colaborador responsável e cada paciente é vinculado a um dentista. Atendimentos pertencem a um paciente e a um dentista. Notificações registram comunicação entre qualquer par de atores.

---

&nbsp;

---

# SISTEMA DE PERMISSÕES

O controle de acesso é implementado pela função `tem_permissao(colaborador, nivel_minimo)` no módulo `auth.py`. Cada cargo possui um nível numérico associado, e as operações exigem um nível mínimo para serem executadas.

| Ação | Estagiário (1) | Auxiliar (2) | Coordenador (3) | Administrador (4) | Dentista |
|---|:---:|:---:|:---:|:---:|:---:|
| Visualizar dentistas | ✓ | ✓ | ✓ | ✓ | — |
| Visualizar pacientes | ✓ | ✓ | ✓ | ✓ | — |
| Cadastrar paciente | — | ✓ | ✓ | ✓ | — |
| Editar paciente | — | ✓ | ✓ | ✓ | Solicitação |
| Excluir paciente | — | — | ✓ | ✓ | — |
| Cadastrar dentista | — | — | — | ✓ | — |
| Editar dentista | — | ✓ | ✓ | ✓ | — |
| Excluir dentista | — | — | — | ✓ | — |
| Cadastrar colaborador | — | — | — | ✓ | — |
| Editar colaborador | — | — | ✓ | ✓ | — |
| Excluir colaborador | — | — | — | ✓ | — |
| Aprovar solicitações | — | — | ✓ | ✓ | — |
| Alterar senha alheia | — | — | — | ✓ | — |
| Alterar própria senha | ✓ | ✓ | ✓ | ✓ | ✓ |
| Registrar atendimento | — | — | — | — | ✓ |
| Solicitar exame | — | — | — | — | ✓ |
| Enviar notificação | ✓ | ✓ | ✓ | ✓ | ✓ |
| Criar anotações | ✓ | ✓ | ✓ | ✓ | ✓ |

> **Regra especial:** O dentista pode submeter uma *solicitação de alteração de cadastro* de seus pacientes. Essa solicitação fica pendente até ser aprovada por qualquer colaborador com cargo Auxiliar ou superior.

---

&nbsp;

---

# DESCRIÇÃO DAS FUNCIONALIDADES

## Módulo de Acesso Público

O sistema inicia sempre pela tela pública, acessível a qualquer pessoa sem necessidade de autenticação. As opções disponíveis são:

### Fazer Login

O usuário informa seu e-mail (ou `ADMIN`) e senha. O sistema busca as credenciais simultaneamente em `colaboradores.json` e `dentistas.json`. Em caso de sucesso, o usuário é redirecionado ao painel correspondente ao seu perfil. Em caso de falha, uma mensagem de erro é exibida sem indicar se foi o e-mail ou a senha que estavam incorretos.

> **Credenciais padrão do administrador:**
> - Usuário: `ADMIN`
> - Senha: `ADMIN`

### Solicitar Cadastro

Permite que qualquer pessoa submeta uma solicitação de cadastro como dentista voluntário ou colaborador, antes mesmo de possuir acesso ao sistema. O interessado preenche seus dados pessoais e profissionais, cria um e-mail de login e uma senha. A solicitação é salva em `solicitacoes.json` com status `pendente` e só pode ser aprovada ou recusada por um Coordenador ou Administrador após o login.

---

## Módulo Administrativo (Pós-Login)

Após autenticação, o sistema redireciona o usuário ao painel correspondente ao seu tipo. Os painéis de Colaborador e Dentista possuem funcionalidades distintas, refletindo os papéis de cada ator na organização.

---

## Painel do Colaborador

O painel do colaborador é o mesmo para todos os cargos; o que diferencia o acesso às funcionalidades é o nível do cargo. As opções disponíveis são:

### [1] Ver Meus Dentistas

Exibe um resumo operacional de cada dentista vinculado ao colaborador logado. Para cada dentista, são apresentados:

- Nome completo e ID único
- Número do CRO e especialidade
- Quantidade total de pacientes vinculados
- Quantidade de atendimentos com status `realizado`
- Quantidade de atendimentos com status `agendado`
- Quantidade de atendimentos com status `cancelado`

Essa visão permite ao colaborador monitorar a carga de trabalho e a atividade de seus dentistas sem precisar consultar registros individuais.

### [2] Notificações Não Lidas

Lista todas as notificações recebidas pelo colaborador que ainda não foram visualizadas. As notificações são exibidas em **ordem cronológica decrescente** (da mais recente para a mais antiga) e incluem a data/hora de envio, o nome do dentista remetente e o conteúdo da mensagem. Ao sair dessa tela, todas as notificações exibidas são automaticamente marcadas como lidas em `notificacoes.json`.

As notificações automáticas geradas pelo ciclo de atendimento são:

| Momento | Conteúdo da mensagem |
|---|---|
| Agendamento registrado | Dentista [X] agendou atendimento para paciente [Y] em [data]. Tipo: [tipo] |
| Atendimento cancelado | Atendimento de [Y] com Dr(a). [X] em [data] foi cancelado |
| Atendimento realizado | Atendimento realizado: Dr(a). [X] atendeu [Y] em [data] + resumo clínico |
| Solicitação de edição de paciente | Dr(a). [X] solicitou alteração de dados de [Y] (status: pendente) |

### [3] Enviar Notificação a Dentista

Permite ao colaborador enviar uma mensagem direta a qualquer um de seus dentistas vinculados. A notificação é criada em `notificacoes.json` com status `lida: false` e aparecerá no painel de notificações do dentista destinatário.

### [4] Anotações sobre Dentistas

Submenu com duas opções:

- **Ver anotações:** Exibe todas as anotações registradas sobre um dentista selecionado, independentemente de qual colaborador as criou. Isso permite que o histórico de observações seja consultado mesmo quando o colaborador responsável está ausente.
- **Adicionar anotação:** Registra uma nova anotação livre sobre um dentista. A anotação é **compartilhada entre todos os colaboradores**, garantindo continuidade no gerenciamento.

### [5] Gestão de Cadastros

Submenu de CRUD cujas opções variam conforme o cargo do colaborador logado:

| Cargo | Opções disponíveis |
|---|---|
| Estagiário | Sem acesso |
| Auxiliar | Gerenciar dentistas, Gerenciar pacientes |
| Coordenador | + Solicitações de cadastro |
| Administrador | + Gerenciar colaboradores |

Cada submenu de entidade oferece as operações de Listar, Cadastrar, Editar e Excluir, com as restrições de permissão descritas na tabela do Sistema de Permissões. O gerenciamento de solicitações (disponível a partir do cargo Coordenador) permite aprovar ou recusar pedidos pendentes, com a aprovação resultando na criação imediata do registro no sistema.

### [6] Alterar Senha

Permite ao colaborador alterar sua própria senha, confirmando a senha atual antes de definir a nova. O Administrador possui a opção adicional de alterar a senha de qualquer outro usuário do sistema (colaborador ou dentista).

### [0] Logout

Encerra a sessão e retorna ao menu público.

---

## Painel do Dentista

O painel do dentista concentra as funcionalidades de gestão clínica e comunicação com seus pacientes e colaborador responsável.

### [1] Ver Meus Pacientes

Exibe uma ficha resumida de cada paciente vinculado ao dentista logado. Para cada paciente, são apresentados:

- Nome completo, data de nascimento e telefone
- Data do **próximo atendimento agendado** (ou `—` se não houver)
- Data do **último atendimento realizado** (ou `—` se não houver)
- Indicador de **exames pendentes**: `SIM` se houver algum exame sem resultado preenchido, `Não` caso contrário

### [2] Registrar Atendimento — Fase 1 (Pré-atendimento)

Permite ao dentista agendar um atendimento **antes da consulta presencial**. O dentista informa:

- O paciente (selecionado da sua lista de pacientes)
- A campanha odontológica à qual o atendimento pertence (obrigatório — vínculo `id_campanha`)
- O tipo de atendimento: Avaliação / Consulta de rotina / Restauração / Extração / Limpeza / Outro
- A data do atendimento (`DD/MM/AAAA`)
- O status inicial é sempre **`agendado`** (fixo — o atendimento ainda não ocorreu)
- Observações pré-clínicas (opcional)

Ao confirmar o registro, o sistema **cria automaticamente uma notificação** para o colaborador responsável, informando: nome do dentista, nome do paciente, data e tipo do atendimento (`canal: email`, `status_envio: enviado`).

> **Nota:** O dentista pode opcionalmente solicitar um exame pré-atendimento nesta etapa. Nesse caso, o sistema cria um registro de exame vinculado ao atendimento com resultado em branco.

### [2a] Atualizar Atendimento — Fase 2 (Pós-atendimento)

Após a consulta presencial, o dentista retorna ao sistema para registrar o que ocorreu. O dentista localiza o atendimento com status `agendado` e atualiza:

- **Paciente compareceu?**
  - **Não:** Status atualizado para `cancelado`. O sistema notifica o colaborador automaticamente com: nome do paciente, nome do dentista e data do atendimento.
  - **Sim:** Status atualizado para `realizado`. O dentista registra as observações clínicas finais (procedimento realizado, intercorrências, recomendações).

Após confirmar a realização, o sistema salva o atendimento completo e **gera notificação automática** ao colaborador com o resumo clínico (`canal: email`, `status_envio: enviado`).

### [3] Solicitar Exame / Registrar Resultado

Gerencia exames vinculados a um atendimento em dois momentos distintos do ciclo:

- **Solicitação (Fase 1 ou Fase 2):** O dentista informa o tipo de exame e os requisitos necessários. O registro de exame é criado com resultado em branco e contabilizado como "pendente" na visão do painel de pacientes.
- **Registro de resultado (Fase 2):** Quando o resultado de um exame já solicitado está disponível, o dentista registra o resultado no campo correspondente do exame vinculado ao atendimento.

### [4] Notificações Não Lidas

Exibe as notificações recebidas pelo dentista vindas do seu colaborador responsável, em **ordem cronológica decrescente**. Ao sair da tela, as notificações são marcadas como lidas.

### [5] Enviar Notificação a Paciente

Permite ao dentista enviar uma mensagem de texto a qualquer um de seus pacientes, registrada em `notificacoes.json` com `destinatario_tipo: "paciente"`.

### [6] Anotações sobre Pacientes

Submenu análogo ao do colaborador, mas com escopo nos pacientes do dentista:

- **Ver anotações:** Exibe o histórico de anotações de um paciente. Essas anotações também são visíveis pelo colaborador responsável pelo dentista.
- **Adicionar anotação:** Registra uma nova observação sobre o paciente.

### [7] Solicitar Alteração de Cadastro de Paciente

O dentista pode propor alterações nos dados de um paciente (nome, data de nascimento, telefone ou e-mail). A solicitação é salva em `solicitacoes.json` com `tipo: "alteracao_paciente"` e fica pendente até ser aprovada por um colaborador com cargo Auxiliar ou superior. A aprovação, quando implementada na gestão de solicitações, aplicará as alterações diretamente em `pacientes.json`.

### [8] Alterar Senha

Permite ao dentista alterar sua própria senha, confirmando a senha atual antes de definir a nova.

### [0] Logout

Encerra a sessão e retorna ao menu público.

---

&nbsp;

---

# ESTRUTURAS DE PROGRAMAÇÃO UTILIZADAS

## CRUD e Persistência em JSON

O sistema implementa operações completas de **Create, Read, Update e Delete** para as entidades Colaborador, Dentista e Paciente, todas com persistência em arquivos JSON.

### Exemplo — Cadastro de Paciente (Create)

```python
def cadastrar_paciente(usuario_logado: dict) -> dict | None:
    if not tem_permissao(usuario_logado, 2):
        print("  Acesso negado.")
        utils.pausar()
        return None

    nome = utils.input_texto("  Nome completo: ")
    data_nasc = utils.input_data("  Data de nascimento (DD/MM/AAAA): ")
    telefone = utils.input_texto("  Telefone: ")
    email = utils.input_texto("  E-mail: ")
    # ... seleção de dentista responsável ...

    lista = storage.carregar("pacientes")
    novo = {
        "id": storage.proximo_id(lista),
        "nome": nome,
        "data_nasc": data_nasc,
        "telefone": telefone,
        "email": email,
        "id_dentista": id_dent,
    }
    lista.append(novo)
    storage.salvar("pacientes", lista)
    return novo
```

### Exemplo — Edição de Dentista (Update)

```python
def editar_dentista(usuario_logado: dict) -> None:
    lista = storage.carregar("dentistas")
    uid = utils.input_inteiro("  ID do dentista a editar: ", 1)
    alvo = next((d for d in lista if d["id"] == uid), None)
    if not alvo:
        print("  Dentista não encontrado.")
        return

    alvo["nome"] = utils.input_texto(
        f"  Nome [{alvo['nome']}]: ", obrigatorio=False
    ) or alvo["nome"]
    alvo["cro"] = utils.input_texto(
        f"  CRO [{alvo['cro']}]: ", obrigatorio=False
    ) or alvo["cro"]

    storage.salvar("dentistas", lista)
    print("  Dentista atualizado com sucesso!")
```

### Exemplo — Exclusão de Colaborador (Delete)

```python
def excluir_colaborador(usuario_logado: dict) -> None:
    lista = storage.carregar("colaboradores")
    alvo = next((c for c in lista if c["id"] == uid), None)

    if utils.confirmar(f"  Excluir '{alvo['nome']}'? (S/N): "):
        lista.remove(alvo)
        storage.salvar("colaboradores", lista)
        print("  Colaborador excluído com sucesso!")
```

---

## Funções com Parâmetros e Retorno

Todas as operações do sistema são encapsuladas em funções com parâmetros nomeados e valores de retorno explícitos. Isso garante reutilização, testabilidade e clareza de responsabilidades.

```python
# storage.py — funções com parâmetros e retorno
def carregar(entidade: str) -> list:
    caminho = os.path.join(DATA_DIR, f"{entidade}.json")
    with open(caminho, "r", encoding="utf-8") as f:
        return json.load(f)

def proximo_id(lista: list) -> int:
    if not lista:
        return 1
    return max(item["id"] for item in lista) + 1

# auth.py — função de verificação de permissão
def tem_permissao(colaborador: dict, nivel_minimo: int) -> bool:
    return nivel_colaborador(colaborador) >= nivel_minimo
```

---

## Listas e Dicionários

Toda a camada de dados do sistema opera sobre **listas de dicionários** Python. Cada registro é um dicionário com campos nomeados, e o conjunto de registros de uma entidade é uma lista.

```python
# Exemplo de estrutura em memória após carregar("dentistas")
dentistas = [
    {
        "id": 1,
        "nome": "Ana Paula Ferreira",
        "email": "ana@email.com",
        "cro": "12345-SP",
        "especialidade": "Ortodontia",
        "disponibilidade": 1,
        "id_colaborador": 1
    },
    {
        "id": 2,
        "nome": "Carlos Eduardo Lima",
        "email": "carlos@email.com",
        "cro": "67890-SP",
        "especialidade": "Endodontia",
        "disponibilidade": 1,
        "id_colaborador": 1
    }
]

# Busca por ID usando compreensão de lista e next()
alvo = next((d for d in dentistas if d["id"] == uid), None)

# Filtragem de subconjunto
meus_dentistas = [d for d in dentistas if d["id_colaborador"] == colaborador["id"]]

# Ordenação por campo
realizados = sorted(
    [a for a in atendimentos if a["status"] == "realizado"],
    key=lambda a: a["dt_atendimento"],
    reverse=True
)
```

---

## Validação de Entradas e Tratamento de Exceções

Todas as leituras de dados do usuário passam por funções de entrada segura definidas em `utils.py`. Essas funções utilizam `try/except` para capturar erros de tipo e laços `while` para repetir a solicitação até que um valor válido seja fornecido.

### Leitura de Inteiro com Validação de Intervalo

```python
def input_inteiro(prompt: str, minimo: int = None, maximo: int = None) -> int:
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
```

### Leitura e Validação de Data

```python
def input_data(prompt: str) -> str:
    while True:
        raw = input_texto(prompt)
        try:
            dt = datetime.strptime(raw, "%d/%m/%Y")
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            print("  Formato inválido. Use DD/MM/AAAA.")
```

### Leitura Segura de Arquivo JSON

```python
def carregar(entidade: str) -> list:
    caminho = os.path.join(DATA_DIR, f"{entidade}.json")
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
```

---

&nbsp;

---

# COMO EXECUTAR

## Pré-requisitos

- **Python 3.9** ou superior
- Nenhuma biblioteca externa é necessária — o sistema utiliza apenas módulos da biblioteca padrão: `json`, `os`, `datetime` e `getpass`

## Execução

No terminal, a partir da pasta raiz do projeto:

```bash
python3 main.py
```

Na primeira execução, a pasta `data/` e os arquivos JSON serão criados automaticamente. O usuário administrador padrão também será inserido.

## Credenciais Iniciais

| Campo | Valor |
|---|---|
| Usuário | `ADMIN` |
| Senha | `ADMIN` |

> Recomenda-se alterar a senha do administrador no primeiro acesso pelo menu **[6] Alterar Senha** do painel do colaborador.

## Fluxo Recomendado para Demonstração

1. **Login** com `ADMIN / ADMIN`
2. **Gestão de Cadastros → Gerenciar Colaboradores** → Cadastrar um colaborador de cargo Coordenador ou Auxiliar
3. **Gestão de Cadastros → Gerenciar Dentistas** → Cadastrar um dentista vinculado ao colaborador criado
4. **Gestão de Cadastros → Gerenciar Pacientes** → Cadastrar um paciente vinculado ao dentista criado
5. **Logout** e fazer login com o dentista recém-criado
6. **Registrar Atendimento** para o paciente criado e verificar a notificação automática
7. **Solicitar Exame** em um atendimento existente
8. **Logout** e fazer login novamente com o colaborador
9. **Notificações Não Lidas** → verificar a notificação gerada pelo atendimento

---

&nbsp;

---

# CONCLUSÃO

O sistema desenvolvido nesta Sprint 3 representa uma evolução substancial em relação ao protótipo inicial, transformando um conjunto de variáveis globais e estruturas simplificadas em uma aplicação modular, persistente e com regras de negócio bem definidas.

Do ponto de vista técnico, a solução demonstra que conceitos fundamentais da linguagem Python — funções, listas, dicionários, leitura/escrita de arquivos, tratamento de exceções e organização em módulos — são suficientes para construir sistemas funcionais de valor real. A ausência de bibliotecas externas evidencia o poder expressivo da linguagem em sua forma mais essencial.

Do ponto de vista do negócio, o sistema endereça diretamente os desafios operacionais da *Turma do Bem*: centraliza o cadastro de todos os atores, garante que cada usuário acesse apenas o que é pertinente à sua função, mantém os colaboradores informados sobre as atividades clínicas por meio de notificações automáticas e preserva o histórico de anotações mesmo em casos de rotatividade de pessoal.

A arquitetura modular adotada — com separação clara entre persistência, validação, autenticação, CRUD e apresentação — estabelece uma base sólida para a Sprint 4, na qual o sistema poderá ser estendido com novas funcionalidades sem necessidade de reestruturação profunda.

&nbsp;

---

> *O privilégio de poder mudar vidas, a compaixão como valor.*
> *A tecnologia para impulsionar — isso é Turma do Bem, isso é Tech do Bem.*

---
