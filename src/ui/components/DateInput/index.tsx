import { useRef } from "react";
import styles from "./index.scss";

export default function DateInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      type="date"
      onChange={(e) => {
        console.log(e.target.value);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }}
    />
  );
}
