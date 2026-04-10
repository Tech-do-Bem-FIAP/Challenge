import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import hugo from "../../assets/fotoHugo.png";
import campanha from "../../assets/FotoLucasCampanha.png";
import pompeu from "../../assets/fotoLucasPompeu.png";
import { Biography } from "../../components/Biography/Biography";

function Who() {
  return (
    <>
      <Header />

      <main className="bg-(--brand-tertiary) min-h-screen">
        <section className="container_page py-16">
          <h1 className="title3 font-bold mb-2">Quem somos</h1>
          <p className="text-(--text-color) mb-10">
            A Tech do Bem foi desenvolvida por três estudantes de Análise e
            Desenvolvimento de Sistemas da FIAP, unidos pelo propósito de
            transformar vidas através da tecnologia.
          </p>

          <Biography
            src={hugo}
            alt="Hugo Souza de Jesus, camiseta polo preta, cabelo black power e braços cruzados."
            aluno="Hugo Souza de Jesus"
            rm={568542}
            turma="1TDSPR"
            desc="Hugo é o coração da equipe. Obstinado por experiência de usuário, Hugo viu na tecnologia mais uma forma de melhorar o mundo, com soluções que unem a usabilidade ao design moderno, mas sem perder a familiaridade e o aspecto humano. Sendo o mais jovem de todos, está naturalmente mais próximo das inovações, o que, junto de seu forte senso de responsabilidade, o faz capaz de realmente fazer a diferença."
            linkedin="https://www.linkedin.com/in/hugo-souza-34482222a"
            github="https://github.com/hgsouz"
          />

          <Biography
            src={campanha}
            alt="Lucas Campanhã dos Santos sorrindo com mochila vermelha e a torre eiffel ao fundo."
            aluno="Lucas Campanhã dos Santos"
            rm={566815}
            turma="1TDSPR"
            desc="Lucas Campanhã é o irmão do meio: inspirado pela inovação e experiência de seus colegas, agrega com a interdisciplinaridade que sua trajetória lhe trouxe. Advogado de formação, passou boa parte de sua carreira buscando devolver esperança para pessoas com problemas reais. Hoje, vê a tecnologia como sua melhor ferramenta para atingir e transformar ainda mais seres humanos."
            linkedin="https://www.linkedin.com/in/lucas-campanh%C3%A3-342707193/"
            github="https://github.com/Labs-LCS"
          />

          <Biography
            src={pompeu}
            alt="Lucas Marcelino Pompeu sorrindo com as mãos na mesa."
            aluno="Lucas Marcelino Pompeu"
            rm={567010}
            turma="1TDSPR"
            desc="Lucas Marcelino traz não só a experiência como o conhecimento de causa. Movido pela empatia desde suas raízes, já atuou em ONGs e sabe quais são as dores sentidas por quem vive para ajudar o próximo. Formado na área da saúde, também viu na tecnologia uma forma de expandir sua trajetória voltada ao outro. É o mais velho da equipe e agrega com a sabedoria de quem sabe praticar, de verdade, a empatia."
            linkedin="https://www.linkedin.com/in/lucaspompeu/"
            github="https://github.com/PompeuDev"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Who;
