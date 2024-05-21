import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.scss";

type WindowButtonProps = {
  icon?: IconProp;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
};

export function WindowButton({ icon, text, onClick }: WindowButtonProps) {
  const [pressed, setPressed] = useState(false);

  const onPointerUp = useCallback(() => {
    setPressed(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", onPointerUp);
    return () => window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerUp]);

  return (
    <button
      className={classNames(styles.windowButton, {
        [styles.pressed]: pressed,
      })}
      onClick={onClick}
      onPointerDown={(e) => {
        e.stopPropagation();
        setPressed(true);
      }}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
    </button>
  );
}
