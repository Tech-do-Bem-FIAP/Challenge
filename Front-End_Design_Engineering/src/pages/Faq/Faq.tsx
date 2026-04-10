import { Accordion } from "../../components/Accordion/Accordion";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

function Faq() {
  return (
    <>
      <Header />

      <main className="bg-(--brand-tertiary) min-h-screen">
        <section className="container_page py-16">
          <h1 className="title3 font-bold mb-2">Perguntas frequentes (FAQ)</h1>
          <p className="text-(--text-color) mb-10">
            Tire suas dúvidas sobre a plataforma Tech do Bem.
          </p>

          <div className="flex flex-col gap-4 max-w-3xl">
            <Accordion
              question="Como poderei acessar o sistema e quais dispositivos são compatíveis?"
              answer="O sistema foi desenvolvido para acesso via navegador web, permitindo que você acesse de qualquer dispositivo (computador, tablet ou smartphone) a qualquer momento. Basta ter conexão com internet para visualizar dados de pacientes, andamento de atendimentos, dentistas relacionados e outras informações de forma intuitiva."
            />

            <Accordion
              question="Como o sistema ajudará no acompanhamento de pacientes e no envio de comunicados?"
              answer="Desenvolvemos uma interface intuitiva que unifica todas as informações do paciente, incluindo histórico, próximas consultas e exames. Você poderá enviar notificações diretamente pelo sistema para dentistas e colaboradores, com informações sobre atendimentos e avisos importantes — tudo centralizado e sem depender de WhatsApp ou planilhas."
            />

            <Accordion
              question="Existe suporte disponível para resolver dúvidas burocráticas rapidamente?"
              answer="Sim! Planejamos implementar um suporte alternativo baseado em Inteligência Artificial para agilizar questões burocráticas e solucionar dúvidas operacionais rapidamente. Casos mais complexos serão encaminhados para nossa equipe, garantindo que todas as demandas recebam a devida atenção sem atrasos."
            />

            <Accordion
              question="Como ficará o armazenamento de dados? Haverá risco de perda de informações durante a transição?"
              answer="Implementamos uma estrutura de banco de dados com foco máximo em segurança e robustez. Todos os dados de pacientes, dentistas e colaboradores são armazenados de forma centralizada e protegida. A transição é supervisionada e os sistemas legados continuam operando em paralelo durante a migração, garantindo que nenhuma informação se perca."
            />

            <Accordion
              question="Quem pode usar a plataforma e quais são os níveis de acesso?"
              answer="A plataforma possui três perfis: Administrador (acesso total), Colaborador (gestão de dentistas, pacientes e atendimentos) e Dentista Voluntário (gestão dos próprios pacientes e registro de atendimentos). Cada perfil vê apenas o que é relevante para sua função, mantendo a segurança e privacidade dos dados."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Faq;
