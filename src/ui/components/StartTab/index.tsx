import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.scss";

type StartTabProps = {
  faIcon?: IconProp;
  imgSrc?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text?: string;
};

export default function StartTab({
  faIcon,
  imgSrc,
  text,
  onClick,
}: StartTabProps) {
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
      className={classNames(styles.startTab, {
        [styles.pressed]: pressed,
      })}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
    >
      {faIcon && <FontAwesomeIcon icon={faIcon} />}
      {imgSrc && <img src={imgSrc} alt="" />}
      {text}
    </button>
  );
}
