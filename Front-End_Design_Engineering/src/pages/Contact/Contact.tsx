import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

function Contact() {
  return (
    <>
      <Header/>

      <main >
        <section className="container_page my-10">
          <h1 className="title3 font-bold mb-4">Em caso de dúvidas ou para maiores informações</h1>
          <h2 className="font-bold mb-16">Entre em contato nos seguintes canais:</h2>
          
          <div className="flex flex-col gap-14">
            <p className="text-2xl">
              <span className="font-bold">E-mail (Geral):</span> tdb.fiap@gmail.com
            </p>
            <p className="text-2xl">
              <span className="font-bold">E-mail (UX, UI & Frontend):</span> tdb.fiap.frontend@gmail.com
            </p>
            <p className="text-2xl">
              <span className="font-bold">E-mail (Backend Development):</span>  tdb.fiap.backend@gmail.com
            </p>
            <p className="text-2xl">
              <span className="font-bold">E-mail (AI & Business):</span> tdb.fiap.business@gmail.com
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
