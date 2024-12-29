import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./WindowButton.module.scss";

// TODO (ada): adapt component to extend default props
type WindowButtonProps = {
  icon?: IconProp;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
  disabled?: boolean;
  selected?: boolean;
  children?: ReactNode;
  imgType?: "svg" | "ico";
  size?: "small" | "medium";
};

export function WindowButton({
  icon,
  text,
  onClick,
  disabled = false,
  selected = false,
  children,
  imgType = "svg",
  size = "small",
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
      className={classNames(
        styles.windowButton,
        styles[`contain-${imgType}`],
        styles[size],
        {
          [styles.pressed]: pressed,
          [styles.disabled]: disabled,
          [styles.selected]: selected,
        }
      )}
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
