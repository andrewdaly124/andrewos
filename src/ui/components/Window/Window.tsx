import classNames from "classnames";
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import {
  faClose,
  faWindowMaximize,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import { useDrag } from "@use-gesture/react";

import { appWindowClicked } from "../../../redux/actions";
import { AppIds } from "../../../types/shortcuts";
import { clamp } from "../../../utils/number";
import { WINDOW_BOUNDARIES } from "../../assets/constants/ui";
import { useWindowDims } from "../../hooks/useWindowDims";
import { WindowButton } from "../WindowButton";
import styles from "./Window.module.scss";

type WindowProps = {
  onClose: () => void;
  children?: ReactNode;
  title: string;
  defaultSize?: [number, number];
  minimumSize?: [number, number];
  resizable?: true; // boolean;
  hidden: boolean;
  // non-react, please keep optional
  appId?: AppIds;
};

const HEADER_SIZE = 32;

export function Window({
  onClose,
  children,
  title,
  defaultSize = [500, 600],
  minimumSize = [240, 180],
  resizable = true,
  hidden,
  appId,
}: WindowProps) {
  // I'd like it if this were a fully controlled React component, but alas we have a dispatch
  const dispatch = useDispatch();

  const { state: windowDims } = useWindowDims();

  // This is a memo cause its attached to rendering
  const maximizeProps = useMemo(() => {
    return {
      width:
        windowDims.width - WINDOW_BOUNDARIES.left - WINDOW_BOUNDARIES.right,
      height:
        windowDims.height -
        WINDOW_BOUNDARIES.top -
        WINDOW_BOUNDARIES.bottom -
        HEADER_SIZE,
      x: 0,
      y: 0,
    };
  }, [windowDims]);

  const [size, setSize] = useState({
    width: defaultSize[0],
    height: defaultSize[1],
  });
  const [position, setPosition] = useState({
    x: (maximizeProps.width - defaultSize[0]) / 2,
    y: (maximizeProps.height - defaultSize[1]) / 2,
  });

  const minimizeProps = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ ...position, ...size });

  const maximized = useMemo(() => {
    return (
      maximizeProps.x === position.x &&
      maximizeProps.y === position.y &&
      maximizeProps.width === size.width &&
      maximizeProps.height === size.height
    );
  }, [
    maximizeProps.height,
    maximizeProps.width,
    maximizeProps.x,
    maximizeProps.y,
    position.x,
    position.y,
    size.height,
    size.width,
  ]);

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

  const onMaximize = useCallback(() => {
    minimizeProps.current = { ...position, ...size };
    console.log("setting");
    onChangeSize({
      width: maximizeProps.width,
      height: maximizeProps.height,
    });
    onChangePosition({ x: maximizeProps.x, y: maximizeProps.y });
  }, [
    maximizeProps.height,
    maximizeProps.width,
    maximizeProps.x,
    maximizeProps.y,
    onChangePosition,
    onChangeSize,
    position,
    size,
  ]);

  const onMinimize = useCallback(() => {
    onChangeSize({
      width: minimizeProps.current.width,
      height: minimizeProps.current.height,
    });
    onChangePosition({
      x: minimizeProps.current.x,
      y: minimizeProps.current.y,
    });
  }, [onChangePosition, onChangeSize]);

  // I'm just gonna bind this to the
  const onCleanupPosition = useCallback(() => {
    const newX = position.x;
    const newY = clamp(
      0,
      position.y,
      windowDims.height - WINDOW_BOUNDARIES.bottom - HEADER_SIZE
    );
    setPosition({
      x: newX,
      y: newY,
    });
  }, [position.x, position.y, windowDims]);

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
        const windowWidth = windowDims.width;
        const windowHeight = windowDims.height;

        let newWidth = memo.initWidth;
        let newHeight = memo.initHeight;

        // set new dims
        if (horizontal !== undefined) {
          newWidth = clamp(
            minimumSize[0],
            newWidth + (horizontal === "left" ? -mx : mx),
            windowWidth
          );
        }
        if (vertical !== undefined) {
          newHeight = clamp(
            minimumSize[1],
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
        }

        // callbacks to set state
        onChangeSize({ width: newWidth, height: newHeight });
        onChangePosition({ x: newX, y: newY });

        return memo;
      });

      return bind();
    },
    [
      minimumSize,
      onChangePosition,
      onChangeSize,
      position.x,
      position.y,
      size.height,
      size.width,
      windowDims,
    ]
  );

  const onPointerDown = useCallback(() => {
    if (appId) dispatch(appWindowClicked(appId));
  }, [appId, dispatch]);

  // I might be able to bind this to components instead of the document
  useEffect(() => {
    document.addEventListener("pointerup", onCleanupPosition);
    return () => document.removeEventListener("pointerup", onCleanupPosition);
  }, [onCleanupPosition]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.hidden]: hidden,
      })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onPointerDown={onPointerDown}
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
              onClick={(e) => {
                e.stopPropagation();
                if (maximized) {
                  onMinimize();
                } else {
                  onMaximize();
                }
              }}
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
        {children}
      </div>
      <div className={styles.windowBorder} />
    </div>
  );
}
