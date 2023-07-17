import classnames from "classnames";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import { ShortcutIds } from "../../../types/shortcuts";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import { clamp } from "../../../utils/number";
import { deepCopy } from "../../../utils/typeUtils";
import { PositionAnchors, WINDOW_BOUNDARIES } from "../../assets/constants/ui";
import classes from "./index.module.scss";

const SHORTCUTS_BUCKET = "shortcuts";
const SHORTCUT_SIZE = { x: 88, y: 106 };

type ShortcutProps = {
  /** url */
  image: string;
  name: string;
  id: ShortcutIds;
  onClick: () => void;
};

function setPositionLocalStorage(
  id: ShortcutIds,
  positioning: { x: number; y: number }
) {
  let quadrant: PositionAnchors = "topLeft";
  const { x, y } = positioning;
  const { innerWidth, innerHeight } = window;
  if (x >= innerWidth / 2 && y < innerHeight / 2) {
    quadrant = "topRight";
  } else if (x < innerWidth / 2 && y >= innerHeight / 2) {
    quadrant = "bottomLeft";
  } else if (x >= innerWidth / 2 && y >= innerHeight / 2) {
    quadrant = "bottomRight";
  }
  switch (quadrant) {
    case "topLeft":
      setLocalStorage(
        id,
        {
          x: Math.max(WINDOW_BOUNDARIES.left, x),
          y: Math.max(WINDOW_BOUNDARIES.top, y),
          quadrant: quadrant,
        },
        SHORTCUTS_BUCKET
      );
      break;
    case "topRight":
      setLocalStorage(
        id,
        {
          x: Math.max(
            WINDOW_BOUNDARIES.right + SHORTCUT_SIZE.x,
            innerWidth - x
          ),
          y: Math.max(WINDOW_BOUNDARIES.top, y),
          quadrant: quadrant,
        },
        SHORTCUTS_BUCKET
      );
      break;
    case "bottomLeft":
      setLocalStorage(
        id,
        {
          x: Math.max(WINDOW_BOUNDARIES.left, x),
          y: Math.max(
            WINDOW_BOUNDARIES.bottom + SHORTCUT_SIZE.y,
            innerHeight - y
          ),
          quadrant: quadrant,
        },
        SHORTCUTS_BUCKET
      );
      break;
    case "bottomRight":
      setLocalStorage(
        id,
        {
          x: Math.max(
            WINDOW_BOUNDARIES.right + SHORTCUT_SIZE.x,
            innerWidth - x
          ),
          y: Math.max(
            WINDOW_BOUNDARIES.bottom + SHORTCUT_SIZE.y,
            innerHeight - y
          ),
          quadrant: quadrant,
        },
        SHORTCUTS_BUCKET
      );
      break;
    default:
    // exhaustive
  }
}

function getPositionFromLocalStorage(id: ShortcutIds) {
  const stored: { x: number; y: number; quadrant: PositionAnchors } =
    getLocalStorage(id, SHORTCUTS_BUCKET);
  if (stored !== null) {
    const { x, y, quadrant } = stored;
    const { innerWidth, innerHeight } = window;
    let newPos = { x: x, y: y };
    switch (quadrant) {
      case "topLeft":
        newPos = { x: x, y: y };
        break;
      case "topRight":
        newPos = { x: innerWidth - x, y: y };
        break;
      case "bottomLeft":
        newPos = { x: x, y: innerHeight - y };
        break;
      case "bottomRight":
        newPos = { x: innerWidth - x, y: innerHeight - y };
        break;
      default:
      // exhaustive
    }
    return {
      x: clamp(
        WINDOW_BOUNDARIES.left,
        newPos.x,
        innerWidth - WINDOW_BOUNDARIES.right - SHORTCUT_SIZE.x
      ),
      y: clamp(
        WINDOW_BOUNDARIES.top,
        newPos.y,
        innerHeight - WINDOW_BOUNDARIES.bottom - SHORTCUT_SIZE.y
      ),
    };
  }
  return {
    x: 0,
    y: 0,
  };
}

const INIT_DRAG_MEMO = {
  clientX: 0 as number,
  clientY: 0 as number,
  initX: 0 as number,
  initY: 0 as number,
} as const;

export default function Shortcut({ image, name, id, onClick }: ShortcutProps) {
  const dragMemo = useRef(deepCopy(INIT_DRAG_MEMO));
  const shortcutRef = useRef<HTMLDivElement | null>(null);

  const [movingShortcut, setMovingShortcut] = useState(false);
  const [positioning, setPositioning] = useState(
    getPositionFromLocalStorage(id)
  );
  const [decoyPositioning, setDecoyPositioning] = useState(
    getPositionFromLocalStorage(id)
  );
  const [highlighted, setHighlighted] = useState(false);

  const onSelectHandler = useCallback(() => {
    onClick();
  }, [onClick]);

  const onPointerMove = useCallback((e: any) => {
    const { clientX, clientY, initX, initY } = dragMemo.current;
    setDecoyPositioning({
      x: e.clientX - clientX + initX,
      y: e.clientY - clientY + initY,
    });
  }, []);

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

  const onPointerUp = useCallback(() => {
    setMovingShortcut(false);
    setPositionLocalStorage(id, decoyPositioning);
    // Not ideal but it handles clamping for me
    setPositioning(getPositionFromLocalStorage(id));
  }, [decoyPositioning, id]);

  const onResize = useCallback(() => {
    setPositioning(getPositionFromLocalStorage(id));
    setDecoyPositioning(getPositionFromLocalStorage(id));
  }, [id]);

  // Don't like any but whatever
  const onHighlight = useCallback((e: any) => {
    if (shortcutRef?.current?.contains(e?.target)) {
      setHighlighted(true);
    } else {
      setHighlighted(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", onHighlight);
    return () => {
      window.removeEventListener("pointerdown", onHighlight);
    };
  }, [onHighlight]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

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
        className={classNames(classes.shortcut, {
          [classes.highlighted]: highlighted,
        })}
        onPointerDown={onPointerDown}
        onDoubleClick={onSelectHandler}
        onClick={onHighlight}
        style={{ top: positioning.y, left: positioning.x }}
        ref={shortcutRef}
      >
        <div className={classes.icon}>
          <img src={image} />
        </div>
        <div className={classes.name}>
          <span>{name}</span>
        </div>
      </div>
      {movingShortcut && (
        <div
          className={classnames(classes.shortcut, classes.decoy)}
          style={{ top: decoyPositioning.y, left: decoyPositioning.x }}
        >
          <div className={classes.icon}>
            <img src={image} />
          </div>
          <div className={classes.name}>
            <span>{name}</span>
          </div>
        </div>
      )}
    </>
  );
}
