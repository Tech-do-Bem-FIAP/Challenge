import { FaGithub, FaLinkedin } from "react-icons/fa";

interface BiographyProps {
  src: string;
  alt: string;
  aluno: string;
  rm: number;
  turma: string;
  desc: string;
  linkedin: string;
  github: string;
}

export const Biography = ({
  src,
  alt,
  aluno,
  rm,
  turma,
  desc,
  linkedin,
  github,
}: BiographyProps) => {
  return (
    <section className="mb-8 bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl shadow-sm p-6 flex flex-col sm:flex-row gap-6">
      <div className="shrink-0">
        <img
          className="w-28 h-28 rounded-full object-cover border-2 border-[#da345d]"
          src={src}
          alt={alt}
        />
      </div>
      <div className="flex-1">
        <h2 className="title3 mb-1">{aluno}</h2>
        <p className="text-sm text-[#d4d4d4] mb-3">RM: {rm} · {turma}</p>
        <p className="text-base text-[#232323] leading-relaxed mb-4">{desc}</p>
        <div className="flex gap-3">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[#da345d] hover:text-[#641226] transition-colors">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-[#da345d] hover:text-[#641226] transition-colors">
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};
