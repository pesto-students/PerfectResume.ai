import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { propTypes } from "src/utils/props";

const Box = ({ id, data, children }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: data.type,
      item: { id, ...data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id],
  );

  return (
    <div
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className=""
    >
      <div
        role="Handle"
        ref={drag}
        id={id}
        className="w-[100px] h-[120px] p-4 bg-orange-400"
      >
        {children}
      </div>
    </div>
  );
};

Box.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  children: propTypes["children?"],
};

export default Box;
