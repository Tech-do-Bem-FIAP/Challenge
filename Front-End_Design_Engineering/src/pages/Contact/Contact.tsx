import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Mail } from "lucide-react";

const contacts = [
  { label: "Geral", email: "tdb.fiap@gmail.com" },
  { label: "UX, UI & Frontend", email: "tdb.fiap.frontend@gmail.com" },
  { label: "Backend Development", email: "tdb.fiap.backend@gmail.com" },
  { label: "AI & Business", email: "tdb.fiap.business@gmail.com" },
];

function Contact() {
  return (
    <>
      <Header />

      <main className="bg-[#f1f1f1] min-h-screen">
        <section className="container_page py-16">
          <h1 className="title3 font-bold mb-2">Fale conosco</h1>
          <p className="text-[#232323] mb-10">
            Em caso de dúvidas ou para mais informações, entre em contato por um dos canais abaixo.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map(({ label, email }) => (
              <div
                key={email}
                className="bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl shadow-sm p-6 flex items-start gap-4"
              >
                <Mail className="w-5 h-5 text-[#da345d] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#641226] mb-1">{label}</p>
                  <p className="text-[#232323] text-sm">{email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
