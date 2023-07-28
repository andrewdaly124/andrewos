import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./index.module.scss";

type WindowButtonProps = {
  icon?: IconProp;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
};

export default function WindowButton({
  icon,
  text,
  onClick,
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
      className={classNames(classes.windowButton, {
        [classes.pressed]: pressed,
      })}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
    </button>
  );
}
