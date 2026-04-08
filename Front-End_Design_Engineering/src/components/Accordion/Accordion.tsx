interface AccordionProps {
  question: string;
  answer: string;
}

export const Accordion = ({ question, answer }: AccordionProps) => {
  return (
    <>
      <details
        name="FAQ"
        className="max-w-full p-6 bg-(--brand-secondary) text-(--brand-tertiary) rounded-xl cursor-pointer"
      >
        <summary className="text-lg">{question}</summary>
        <p className="text-(--text-secondary-color) pt-4">{answer}</p>
      </details>
    </>
  );
};
