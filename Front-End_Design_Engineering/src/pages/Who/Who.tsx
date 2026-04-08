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

      <main>
        <section className="container_page my-12">
          <Biography
            src={hugo}
            alt=""
            aluno="Hugo Souza de Jesus"
            rm={568542}
            turma="1TDSPR"
            desc="Hugo é o coração da equipe. Obstinado por experiência de usuário, Hugo viu na tecnologia mais uma forma de melhorar o mundo, com soluções que unem a usabilidade ao design moderno, mas sem perder a familiaridade e o aspecto humano. Sendo o mais jovem de todos, está naturalmente mais próximo das inovações, o que, junto de seu forte senso de responsabilidade, o faz capaz de realmente fazer a diferença."
            linkedin=""
            github=""
          />

          <Biography
            src={campanha}
            alt=""
            aluno="Lucas Campanhã dos Santos"
            rm={566815}
            turma="1TDSPR"
            desc="Lucas Campanhã é o irmão do meio: inspirado pela inovação e experiência de seus colegas, agrega com interdisciplinaridade que suas experiências passadas lhe trouxeram. Advogado de formação, passou boa parte de sua trajetória buscando devolver esperança para pessoas com problemas reais. Hoje, vê a tecnologia como sua melhor ferramenta para atingir e transformar ainda mais seres humanos."
            linkedin=""
            github=""
          />

          <Biography
            src={pompeu}
            alt=""
            aluno="Lucas Marcelino Pompeu"
            rm={567010}
            turma="1TDSPR"
            desc="Lucas Marcelino traz não só a experiência como o conhecimento de causa. Movido pela empatia desde suas raízes, Lucas já atuou em ONGs e sabe quais são as dores sentidas por quem vive para ajudar o próximo. Formado na área da saúde, também viu na tecnologia uma forma de expandir sua trajetória voltada ao outro. É o mais velho da equipe e agrega com a sabedoria de quem sabe praticar, de verdade, a empatia."
            linkedin=""
            github=""
          />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Who;
