import classNames from "classnames";
import { ReactNode } from "react";

import styles from "./Section.module.scss";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return (
    <div className={classNames(styles.section, className)}>{children}</div>
  );
}
