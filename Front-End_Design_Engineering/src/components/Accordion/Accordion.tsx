interface AccordionProps {
  question: string;
  answer: string;
}

export const Accordion = ({ question, answer }: AccordionProps) => {
  return (
    <details
      name="FAQ"
      className="w-full p-5 bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
    >
      <summary className="text-lg font-medium text-[#641226] list-none flex justify-between items-center">
        <span>{question}</span>
        <span className="text-[#da345d] ml-4 shrink-0">▾</span>
      </summary>
      <p className="text-[#232323] pt-4 leading-relaxed">{answer}</p>
    </details>
  );
};
