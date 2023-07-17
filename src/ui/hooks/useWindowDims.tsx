import { useLayoutEffect, useRef } from "react";

/**
 * @returns A REF!! Doesn't update hooks
 */
export default function useWindowDims() {
  const dimsRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    function setDimsRef() {
      dimsRef.current.width = window.innerWidth;
      dimsRef.current.height = window.innerHeight;
    }
    window.addEventListener("resize", setDimsRef);
    return () => {
      window.removeEventListener("resize", setDimsRef);
    };
  }, []);

  return dimsRef;
}
