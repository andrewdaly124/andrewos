import { useLayoutEffect, useRef, useState } from "react";

/**
 * @returns a ref or state
 */
export default function useWindowDims() {
  const dimsRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [windowDims, setWindowDims] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    function setDimsRef() {
      dimsRef.current.width = window.innerWidth;
      dimsRef.current.height = window.innerHeight;
      setWindowDims({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", setDimsRef);
    return () => {
      window.removeEventListener("resize", setDimsRef);
    };
  }, []);

  return { ref: dimsRef, state: windowDims };
}
