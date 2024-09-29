import classNames from "classnames";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

import { WindowButton } from "../WindowButton";
import styles from "./SimpleDrawer.module.scss";

type SimpleDrawerProps = {
  buttonText: string;
  onClick: () => void;
  children: React.ReactNode;

  disableShow?: boolean;
  openByDefault?: boolean;
};

export const SimpleDrawer = forwardRef(function SimpleDrawer(
  {
    buttonText,
    onClick,
    children,
    disableShow = false,
    openByDefault = false,
  }: SimpleDrawerProps,
  ref
) {
  const [hidden, setHidden] = useState(!openByDefault);

  useImperativeHandle(
    ref,
    () => ({
      setHidden,
    }),
    []
  );

  const toggleHidden = useCallback(() => {
    setHidden(!hidden);
  }, [hidden]);

  return (
    <div className={styles.simpleDrawer}>
      <div className={styles.buttons}>
        <WindowButton onClick={onClick}>{buttonText}</WindowButton>
        <WindowButton onClick={toggleHidden} disabled={disableShow}>
          {hidden ? "Show" : "Hide"}
        </WindowButton>
      </div>
      <div className={classNames(styles.body, { [styles.hidden]: hidden })}>
        {children}
      </div>
    </div>
  );
});
