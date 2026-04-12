<div align="center">

<img src="https://img.shields.io/badge/FIAP-Challenge-ED1C24?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg==" />
<img src="https://img.shields.io/badge/Sprint-3-0066CC?style=for-the-badge" />
<img src="https://img.shields.io/badge/Turma-1TDSPR-00AA44?style=for-the-badge" />

<br/><br/>

# 💙 Tech do Bem

### Portal Digital da Turma do Bem — Tecnologia a Serviço do Propósito Social

<p>
  Plataforma web desenvolvida para otimizar a gestão e o acompanhamento dos atendimentos da ONG <strong>Turma do Bem</strong>, unindo tecnologia moderna e impacto humano real.
</p>

<br/>

[![GitHub Repo](https://img.shields.io/badge/🔗%20Repositório-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Tech-do-Bem-FIAP/Challenge/tree/main/Front-End_Design_Engineering)
[![YouTube Demo](https://img.shields.io/badge/▶%20Vídeo-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/GSyIEn6itNU)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Usar](#-como-usar)
- [Autores](#-autores)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

O **Tech do Bem** é o portal digital da ONG **Turma do Bem**, uma iniciativa que oferece tratamento odontológico gratuito a jovens em situação de vulnerabilidade social por meio de dentistas voluntários.

A plataforma foi desenvolvida para ser o principal ponto de contato digital da organização, e oferece:

- **Gestão de Pacientes, Dentistas e Colaboradores** — cadastro e acompanhamento individual de cada pessoa atendida
- **Controle de Tratamentos** — visão clara do progresso de cada caso (concluído, em andamento ou a iniciar)
- **Centralização de Informações** — canal organizado para dentistas voluntários enviarem documentos
- **Acesso Multiplataforma** — compatível com computadores, tablets e smartphones
- **Suporte com Inteligência Artificial** — automação de processos burocráticos e agilidade no atendimento de dúvidas

> 💬 _"Unir tecnologia e propósito social para gerar impacto real e transformar vidas."_

<div align="center">

<!-- Substitua pelas imagens reais do projeto -->

|                                                              Página Inicial                                                               |                                                          Página de Login                                                          |                                                                       Dashboard                                                                       |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![Home](https://github.com/Tech-do-Bem-FIAP/Challenge/blob/React/Front-End_Design_Engineering/src/assets/pagina-inicial-tdb.png?raw=true) | ![Login](https://github.com/Tech-do-Bem-FIAP/Challenge/blob/React/Front-End_Design_Engineering/src/assets/login-tdb.png?raw=true) | ![Dashboard](https://github.com/Tech-do-Bem-FIAP/Challenge/blob/React/Front-End_Design_Engineering/src/assets/dashboard-colaborador-tdb.png?raw=true) |

</div>

---

## 🛠 Tecnologias Utilizadas

<div align="center">

|                                                     Tecnologia                                                     | Descrição                                                                  |
| :----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------- |
|      <img src="https://img.shields.io/badge/React.js-20232A?style=flat-square&logo=react&logoColor=61DAFB" />      | Biblioteca para construção de interfaces SPA com componentes reutilizáveis |
|   <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />   | Superset tipado do JavaScript para maior segurança e manutenibilidade      |
|        <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" />        | Estruturação semântica do conteúdo                                         |
| <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />  | Framework utilitário para estilização e design responsivo                  |
| <img src="https://img.shields.io/badge/Font_Awesome-528DD7?style=flat-square&logo=font-awesome&logoColor=white" /> | Biblioteca de ícones para a interface                                      |
|          <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" />          | Controle de versão e versionamento do projeto                              |
|       <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />       | Hospedagem e colaboração no repositório                                    |

</div>

---

## 📁 Estrutura de Pastas

```
Front-End_Design_Engineering/
│
├── public/
│   └── index.html              # HTML raiz da aplicação React
│
├── src/
│   ├── assets/                 # Imagens, ícones e recursos estáticos
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Navbar/
│   │
│   ├── pages/                  # Páginas principais da aplicação
│   │   ├── Home/               # Página Inicial — missão e valores
│   │   ├── About/              # Sobre o Projeto — funcionalidades
│   │   ├── Who/                # Quem Somos — equipe de desenvolvimento
│   │   ├── Contact/            # Contato — canais de comunicação
│   │   ├── FAQ/                # Perguntas Frequentes
│   │   └── Login/              # Autenticação de usuários
│   │
│   ├── styles/                 # Arquivos CSS globais e variáveis
│   │
│   ├── App.tsx                 # Componente raiz com rotas
│   └── main.tsx                # Ponto de entrada da aplicação
│
├── package.json                # Dependências e scripts do projeto
└── README.md                   # Documentação do projeto
```

---

## 🚀 Como Usar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/Tech-do-Bem-FIAP/Challenge.git

# 2. Acesse a branch React
git checkout React

# 3. Entre na pasta do projeto
cd Front-End_Design_Engineering

# 4. Instale as dependências
npm install

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: **http://localhost:5173**

### Links Importantes

| Recurso                  | Link                                                                                                                          |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| 🔗 Repositório GitHub    | [github.com/Tech-do-Bem-FIAP/Challenge](https://github.com/Tech-do-Bem-FIAP/Challenge/tree/main/Front-End_Design_Engineering) |
| ▶️ Vídeo de Demonstração | [YouTube — Assistir](https://youtu.be/GSyIEn6itNU)                                                                            |

---

## 👥 Autores

<div align="center">

<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/Tech-do-Bem-FIAP/Challenge/React/Front-End_Design_Engineering/src/assets/fotoHugo.png" width="100px" style="border-radius:50%" /><br/>
      <strong>Hugo Souza de Jesus</strong><br/>
      <sub>RM: 568542 | Turma: 1TDSPR</sub><br/><br/>
      <sub>Focado em experiência de usuário, une usabilidade e design moderno com aspecto humano. Responsável por trazer inovações à equipe.</sub><br/><br/>
      <a href="https://www.linkedin.com/in/SEU_LINKEDIN">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/SEU_GITHUB">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
    <td align="center">
      <img src="https://github.com/Tech-do-Bem-FIAP/Challenge/blob/React/Front-End_Design_Engineering/src/assets/FotoLucasCampanha.png?raw=true" width="100px" style="border-radius:50%" /><br/>
      <strong>Lucas Campanhã dos Santos</strong><br/>
      <sub>RM: 566815 | Turma: 1TDSPR</sub><br/><br/>
      <sub>Advogado de formação, agrega visão interdisciplinar ao projeto, utilizando tecnologia como ferramenta para transformar vidas reais.</sub><br/><br/>
      <a href="https://www.linkedin.com/in/SEU_LINKEDIN">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/SEU_GITHUB">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/Tech-do-Bem-FIAP/Challenge/React/Front-End_Design_Engineering/src/assets/fotoLucasPompeu.png" width="100px" style="border-radius:50%" /><br/>
      <strong>Lucas Marcelino Pompeu</strong><br/>
      <sub>RM: 567010 | Turma: 1TDSPR</sub><br/><br/>
      <sub>Com experiência em ONGs e formação na área da saúde, contribui com empatia e sabedoria de quem conhece as dores do setor.</sub><br/><br/>
      <a href="https://www.linkedin.com/in/SEU_LINKEDIN">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" />
      </a>
      <a href="https://github.com/SEU_GITHUB">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

</div>

---

## 📬 Contato

Tem alguma dúvida ou quer saber mais sobre o projeto? Fale com a equipe:

| Área     | E-mail             |
| :------- | :----------------- |
| 📩 Geral | tdb.fiap@gmail.com |

---

<div align="center">

Feito com 💙 pela equipe **Tech do Bem** — FIAP 2026

<sub>Front-End Design Engineering · Sprint 3 · Turma 1TDSPR</sub>

</div>
