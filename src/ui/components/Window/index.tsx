import classNames from "classnames";
import { CSSProperties, useCallback, useState } from "react";

import {
  faClose,
  faMinimize,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "@use-gesture/react";

import { clamp } from "../../../utils/number";
import useWindowDims from "../../hooks/useWindowDims";
import WindowButton from "../WindowButton";
import styles from "./index.module.scss";

type WindowProps = {
  onClose: () => void;
  children?: any;
  title: string;
  defaultSize?: [number, number];
  resizable?: true; // boolean;
  closed: boolean;
  minimized: boolean;
};

export default function Window({
  onClose,
  children,
  title,
  defaultSize = [500, 600],
  resizable = true,
  closed,
  minimized,
}: WindowProps) {
  const windowDims = useWindowDims();

  const [size, setSize] = useState({
    width: defaultSize[0],
    height: defaultSize[1],
  });

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  // Callback in case I need to add behavior sometime
  const onChangeSize = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      setSize({
        width: width,
        height: height,
      });
    },
    []
  );

  // Callback in case I need to add behavior sometime
  const onChangePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    setPosition({
      x: x,
      y: y,
    });
  }, []);

  // binders for the drag handle
  const bindHandleDrag = useDrag(({ movement: [mx, my], first, memo }) => {
    if (first) {
      memo = { initX: position.x, initY: position.y };
    }
    const newPosition = { x: memo.initX + mx, y: memo.initY + my };
    onChangePosition(newPosition);
    return memo;
  });

  // resize handles
  const bindHandleResize = useCallback(
    ({
      vertical,
      horizontal,
    }: {
      vertical?: "top" | "bottom";
      horizontal?: "left" | "right";
    }) => {
      const bind = useDrag(({ movement: [mx, my], first, memo }) => {
        if (first) {
          memo = {
            initX: position.x,
            initY: position.y,
            initWidth: size.width,
            initHeight: size.height,
          };
        }
        // I don't like destructuring this so much
        const windowWidth = windowDims.current.width;
        const windowHeight = windowDims.current.height;

        let newWidth = memo.initWidth;
        let newHeight = memo.initHeight;

        // set new dims
        if (horizontal !== undefined) {
          newWidth = clamp(
            0,
            newWidth + (horizontal === "left" ? -mx : mx),
            windowWidth
          );
        }
        if (vertical !== undefined) {
          newHeight = clamp(
            0,
            newHeight + (vertical === "top" ? -my : my),
            windowHeight
          );
        }

        // set new position - translate based on what boundary was dragged
        let newX = memo.initX;
        let newY = memo.initY;

        if (horizontal !== undefined) {
          const atEdge = newWidth > windowWidth && newWidth < windowWidth;
          const boundaryTranslation =
            horizontal === "left" ? memo.initWidth - newWidth : 0;
          newX += atEdge ? mx / 2 : boundaryTranslation;
        }
        if (vertical !== undefined) {
          const atEdge = newHeight > windowHeight && newHeight < windowHeight;
          const boundaryTranslation =
            vertical === "top" ? memo.initHeight - newHeight : 0;
          newY += atEdge ? my / 2 : boundaryTranslation;

          console.log(newY);
        }

        // callbacks to set state
        onChangeSize({ width: newWidth, height: newHeight });
        onChangePosition({ x: newX, y: newY });

        return memo;
      });

      return bind();
    },
    [
      onChangePosition,
      onChangeSize,
      position.x,
      position.y,
      size.height,
      size.width,
      windowDims,
    ]
  );

  return (
    <div
      className={classNames(styles.container, {
        [styles.minimized]: minimized,
      })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      id="draggable_window"
    >
      <div
        className={classNames(styles.handle, styles.drag, {
          [styles.span]: !resizable,
        })}
        {...bindHandleDrag()}
      >
        {title}
        <div className={styles.buttons}>
          {resizable && (
            <WindowButton
              onClick={() => console.log("click")}
              icon={faWindowMinimize}
            />
          )}
          {resizable && (
            <WindowButton
              onClick={() => console.log("click")}
              icon={faWindowMaximize}
            />
          )}
          <WindowButton onClick={onClose} icon={faClose} />
        </div>
      </div>
      <>
        <div
          className={classNames(styles.handle, styles.topLeftResize)}
          {...bindHandleResize({ horizontal: "left", vertical: "top" })}
        />
        <div
          className={classNames(styles.handle, styles.topResize)}
          {...bindHandleResize({ vertical: "top" })}
        />
        <div
          className={classNames(styles.handle, styles.topRightResize)}
          {...bindHandleResize({ horizontal: "right", vertical: "top" })}
        />
        <div
          className={classNames(styles.handle, styles.leftResize)}
          {...bindHandleResize({ horizontal: "left" })}
        />
        <div
          className={classNames(styles.handle, styles.rightResize)}
          {...bindHandleResize({ horizontal: "right" })}
        />
        <div
          className={classNames(styles.handle, styles.bottomLeftResize)}
          {...bindHandleResize({ horizontal: "left", vertical: "bottom" })}
        />
        <div
          className={classNames(styles.handle, styles.bottomResize)}
          {...bindHandleResize({ vertical: "bottom" })}
        />
        <div
          className={classNames(styles.handle, styles.bottomRightResize)}
          {...bindHandleResize({ horizontal: "right", vertical: "bottom" })}
        />
      </>
      <div
        className={styles.body}
        style={
          {
            ...(resizable
              ? { width: `${size.width}px`, height: `${size.height}px` }
              : {}),
          } as CSSProperties
        }
      >
        {!closed ? children : null}
      </div>
    </div>
  );
}
