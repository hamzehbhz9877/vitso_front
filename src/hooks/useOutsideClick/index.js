'use client'

import { useEffect, useRef } from "react";

const useClickOutside = (ref, callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;

  const handleClick = (e) => {
    if (!ref.current?.contains(e.target) && callbackRef.current) {
      callbackRef.current(e);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callbackRef]);
};

export default useClickOutside;
