import { useEffect } from "react";

import styles from "./App.module.scss";
import "./index.scss";
import { Home } from "./ui/components/Home";
import globals from "./ui/scss/globals.module.scss";

export function App() {
  useEffect(() => {
    document.body.className = globals.GLOBALS;
  }, []);

  return (
    <div className={styles.bg}>
      <Home />
    </div>
  );
}
