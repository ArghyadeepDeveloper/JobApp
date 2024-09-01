import React, { useEffect, useState } from "react";

export default function VariableText({ text, speed = 1000, className }) {
  const [visibleText, setVisibleText] = useState(text);
  const [currentLength, setCurrentLength] = useState(text.length);
  const [isDecreasing, setIsDecreasing] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  function animateText() {
    const intervalId = setInterval(() => {
      if (isDecreasing) {
        if (currentLength > 0) {
          setCurrentLength((prev) => prev - 1);
        } else {
          setIsDecreasing(false);
        }
      } else {
        if (currentLength < text.length) {
          setCurrentLength((prev) => prev + 1);
        } else {
          setIsDecreasing(true);
        }
      }
      setVisibleText(text.slice(0, currentLength));
    }, speed);

    return () => clearInterval(intervalId);
  }

  function toggleCursor() {
    const cursorIntervalId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500); // Toggle cursor visibility every 500ms

    return () => clearInterval(cursorIntervalId);
  }

  useEffect(() => {
    animateText();
    toggleCursor();
  }, [currentLength]);

  return (
    <div className={className}>
      {visibleText}
      <span
        style={{
          visibility: cursorVisible ? "visible" : "hidden",
          borderLeft: "2px solid black",
          marginLeft: "2px",
        }}
      >
        &nbsp;
      </span>
    </div>
  );
}
