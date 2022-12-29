import React from "react";

interface LetterProps {
  letter: string;
}

function LetterIcon(props: LetterProps) {
  const { letter } = props;

  return (
    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-light-purple">
      <span className="text-lg text-white font-bold">{ letter.toUpperCase() }</span>
    </div>
  );
};

export default LetterIcon;