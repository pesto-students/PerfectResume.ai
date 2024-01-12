import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { propTypes } from "src/utils/props";

const DraggableBox = ({ id, left, top, children }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "box",
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  if (isDragging) {
    return <div ref={dragRef} />;
  }

  return (
    <div
      ref={dragRef}
      style={{ position: "absolute", left, top }}
      className="w-[20px] h-[30px] bg-orange-400"
    >
      {children}
    </div>
  );
};

DraggableBox.propTypes = {
  id: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number,
  children: propTypes["children?"],
};

export default DraggableBox;
