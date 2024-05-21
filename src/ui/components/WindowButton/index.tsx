import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.scss";

type WindowButtonProps = {
  icon?: IconProp;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  disabled?: boolean;
  children?: ReactNode;
};

export function WindowButton({
  icon,
  text,
  onClick,
  disabled = false,
  children,
}: WindowButtonProps) {
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
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
      onPointerDown={(e) => {
        e.stopPropagation();
        setPressed(true);
      }}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
      {children}
    </button>
  );
}
