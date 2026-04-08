import { Accordion } from "../../components/Accordion/Accordion";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

function Faq() {
  return (
    <>
      <Header />

      <main>
        <section className="container_page my-12">
          <div>
            <h1 className="title3 mb-6">Perguntas frenquentes (FAQ)</h1>
          </div>

          <div className="flex flex-col gap-4">
            <Accordion
              question="Como poderei acessar o sistema e quais dispositivos são
              compatíveis?"
              answer="O sistema foi desenvolvido para acesso via navegador web,
              permitindo que você acesse de qualquer dispositivo (computador,
              tablet ou smartphone) a qualquer momento. Basta ter conexão com
              internet para visualizar dados de pacientes, andamento de
              atendimentos, dentistas relacionados e outras informações de forma
              intuitiva."
            />

            <Accordion
              question="Como o sistema ajudará no acompanhamento de pacientes e no envio
              de comunicados?"
              answer="Desenvolvemos uma interface intuitiva que unifica todas as
              informações do paciente, incluindo histórico, próximas consultas,
              exames e cirurgias. Você poderá enviar comunicados diretamente
              pelo sistema para pacientes e responsáveis, com datas de exames,
              informações sobre campanhas e outros avisos importantes, tudo de
              forma centralizada."
            />

            <Accordion
              question="Existe suporte disponível para resolver dúvidas burocráticas
              rapidamente?"
              answer="Sim! Implementamos um suporte alternativo baseado em Inteligência
              Artificial para agilizar questões burocráticas e solucionar
              dúvidas operacionais rapidamente. Casos mais complexos são
              automaticamente encaminhados para nossa equipe humana, garantindo
              que todas as demandas recebam a devida atenção sem atrasos."
            />

            <Accordion
              question="Como ficará o armazenamento de documentos e dados no novo sistema?
              Haverá risco de perda de informações durante a transição?"
              answer="Implementamos uma reestruturação completa do banco de dados com
              foco máximo em segurança e robustez. Todos os documentos e dados
              de pacientes e voluntários serão armazenados de forma centralizada
              e protegida. A transição será gradual e supervisionada, mantendo
              os sistemas atuais funcionando em paralelo durante a migração, o
              que garante que nenhuma informação se perca. Além disso, os
              dentistas voluntários terão um canal específico para envio de
              documentos e dados de forma organizada e vinculada aos respectivos
              pacientes."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Faq;
