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
    <>
      <section className="mb-16">
        <div>
          <img className="max-w-80 max-h-80 mb-4" src={src} alt={alt} />
        </div>
        <div>
          <h2 className="title3">{aluno}</h2>
          <p>RM: {rm}</p>
          <p>{turma}</p>
          <p className="text-2xl">{desc}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <a href={linkedin}>
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a href={github}>
            <FaGithub className="w-8 h-8" />
          </a>
        </div>
      </section>
    </>
  );
};
