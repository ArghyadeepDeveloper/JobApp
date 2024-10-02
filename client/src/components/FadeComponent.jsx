import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const FadeComponent = ({ children, duration = 500 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger fade-in when component is mounted
    setShow(true);

    return () => {
      // Trigger fade-out when component is unmounted
      setShow(false);
    };
  }, []);

  return (
    <CSSTransition
      in={show}
      timeout={duration}
      classNames={{
        enter: "opacity-0",
        enterActive: "animate-fade-in",
        exit: "opacity-100",
        exitActive: "animate-fade-out",
      }}
      unmountOnExit
    >
      <div>{children}</div>
    </CSSTransition>
  );
};

export default FadeComponent;
