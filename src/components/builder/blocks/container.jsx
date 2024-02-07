import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { propTypes } from "src/utils/props";

const DropContainer = ({ onDrop, children }) => {
  const [, dropRef] = useDrop(() => ({
    accept: "box",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      onDrop(item.id, left, top);
      return undefined;
    },
  }));

  return (
    <div ref={dropRef} className="w-[700px] h-[700px] bg-gray-200">
      {children}
    </div>
  );
};
DropContainer.propTypes = {
  onDrop: PropTypes.func,
  children: propTypes["children?"],
};
export default DropContainer;
