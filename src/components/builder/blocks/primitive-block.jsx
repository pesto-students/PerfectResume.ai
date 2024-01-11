import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

const DraggableBlock = ({ id, title }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "DRAGGABLE_BLOCK",
    item: { id, title, type: "row" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`border border-solid border-gray-500 p-2 m-2 cursor-move`}
    >
      <div>{title}</div>
    </div>
  );
};

DraggableBlock.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default DraggableBlock;
