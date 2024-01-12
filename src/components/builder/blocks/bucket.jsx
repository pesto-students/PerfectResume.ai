import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { propTypes } from "src/utils/props";

const Bucket = ({ onDrop, children, type }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: type,
      canDrop: () => {
        return true;
      },
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        console.log("delta: ", delta);
        console.log("item: ", item);
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        // if (snapToGrid) {
        //   [left, top] = doSnapToGrid(left, top);
        // }
        onDrop({ ...item, left, top });
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop, children],
  );

  const getActiveColor = () => {
    if (!canDrop) return "bg-white";
    if (!isOver) return "bg-yellow-100";
    return "bg-green-300";
  };

  console.log("canDrop: ", canDrop);
  console.log("isOver: ", isOver);

  return (
    <div
      ref={drop}
      role={"Dustbin"}
      className={`${getActiveColor()} relative  min-w-[400px] min-h-[400px] border border-solid border-gray-600`}
    >
      <div>{canDrop ? "Release to drop" : "Drag a box here"}</div>
      {children}
    </div>
  );
};
Bucket.propTypes = {
  onDrop: PropTypes.func,
  children: propTypes["children?"],
  type: PropTypes.string,
};

export default Bucket;
