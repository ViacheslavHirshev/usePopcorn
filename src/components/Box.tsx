import React, { useState } from "react";

export default function Box({ children }: { children: React.ReactNode }) {
  const [isOpen1, setIsOpen1] = useState(true);

  function handleIsOpen1Change(): void {
    setIsOpen1((open) => !open);
  }

  return (
    <div className="box">
      <ToggleButton
        isOpen1={isOpen1}
        handleIsOpen1Change={handleIsOpen1Change}
      />
      {isOpen1 && children}
    </div>
  );
}

function ToggleButton({
  isOpen1,
  handleIsOpen1Change,
}: {
  isOpen1: boolean;
  handleIsOpen1Change: () => void;
}) {
  return (
    <button className="btn-toggle" onClick={handleIsOpen1Change}>
      {isOpen1 ? "–" : "+"}
    </button>
  );
}
