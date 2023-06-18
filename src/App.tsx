import { useEffect } from "react";

import globals from "./ui/scss/globals.module.scss";
import "./index.scss";
import Home from "./ui/components/Home";
import styles from "./App.module.scss";

export default function App() {
  useEffect(() => {
    document.body.className = globals.GLOBALS;
  }, []);

  return (
    <div className={styles.bg}>
      <Home />
    </div>
  );
}
