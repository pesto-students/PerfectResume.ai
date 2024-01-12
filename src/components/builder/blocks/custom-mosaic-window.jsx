import { MosaicWindow } from "react-mosaic-component";
import { useDrop, useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { propTypes } from "src/utils/props";
import { useState } from "react";

function getStyle(backgroundColor) {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
    minHeight: "8rem",
    minWidth: "8rem",
    color: "white",
    backgroundColor,
    padding: "2rem",
    paddingTop: "1rem",
    margin: "1rem",
    textAlign: "center",
    float: "left",
    fontSize: "1rem",
  };
}

const CustomWindow = ({ path, title, children, onDragOverWindow }) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "DRAGGABLE_BLOCK",
    item: { id: title, title, type: "row" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "DRAGGABLE_BLOCK",
      hover: () => {
        onDragOverWindow(path);
      },
      drop: (_item, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        if (monitor.isOver({ shallow: true })) {
          console.log("handle drop logice");
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild],
  );
  let backgroundColor = "rgba(0, 0, 0, .5)";
  if (isOverCurrent || isOver) {
    backgroundColor = "darkgreen";
  }
  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-orange-500 max-w-[250px] max-h-[300px]"
      style={getStyle(backgroundColor)}
    >
      <div className="w-[200px] h-[250px]">{children}</div>
    </div>
  );
};

CustomWindow.propTypes = {
  path: PropTypes.array,
  title: PropTypes.string,
  children: propTypes["children?"],
  onDragOverWindow: PropTypes.func,
};

export default CustomWindow;
