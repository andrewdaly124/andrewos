import { useCallback, useEffect, useRef, useState } from "react";

import { ShortcutIds } from "../../../types/shortcuts";
import { deepCopy } from "../../../utils/typeUtils";
import classes from "./index.module.scss";

type ShortcutProps = {
  /** url */
  image: string;
  name: string;
  id: ShortcutIds;
  onClick: () => void;
};

function setPositionLocalStorage(id: ShortcutIds) {}

function getPositionFromLocalStorage(id: ShortcutIds) {}

const INIT_DRAG_MEMO = {
  clientX: 0 as number,
  clientY: 0 as number,
  initX: 0 as number,
  initY: 0 as number,
} as const;

export default function Shortcut({ image, name, id, onClick }: ShortcutProps) {
  const dragMemo = useRef(deepCopy(INIT_DRAG_MEMO));

  const [movingShortcut, setMovingShortcut] = useState(false);
  const [positioning, setPositioning] = useState({
    x: 0,
    y: 0,
    positioning: "topleft",
  });

  const onPointerMove = useCallback((e: any) => {
    console.log(e.clientX, e.clientY, dragMemo.current);

    const { clientX, clientY, initX, initY } = dragMemo.current;

    setPositioning({
      x: e.clientX - clientX + initX,
      y: e.clientY - clientY + initY,
      positioning: "topleft",
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPointerDown = useCallback(
    (e: any) => {
      setMovingShortcut(true);
      dragMemo.current = {
        clientX: e.clientX,
        clientY: e.clientY,
        initX: positioning.x,
        initY: positioning.y,
      };
    },
    [positioning.x, positioning.y]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPointerUp = useCallback((e: any) => {
    setMovingShortcut(false);
  }, []);

  useEffect(() => {
    if (movingShortcut) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [movingShortcut, onPointerMove, onPointerUp]);

  return (
    <>
      <div
        className={classes.shortcut}
        onPointerDown={onPointerDown}
        onDoubleClick={onClick}
        style={{ top: positioning.y, left: positioning.x }}
      >
        <div className={classes.icon}>
          <img src={image} />
        </div>
        <div className={classes.name}>
          <span>{name}</span>
        </div>
      </div>
      <div
        className={classes.shortcut}
        onPointerDown={onPointerDown}
        onDoubleClick={onClick}
        style={{ top: positioning.y, left: positioning.x }}
      >
        <div className={classes.icon}>
          <img src={image} />
        </div>
        <div className={classes.name}>
          <span>{name}</span>
        </div>
      </div>
    </>
  );
}
