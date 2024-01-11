import { useDrop } from "react-dnd";
import { Responsive, WidthProvider } from "react-grid-layout";
import PropTypes from "prop-types";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DragAndDropArea = ({ blocks }) => {
  const [, drop] = useDrop({
    accept: "DRAGGABLE_BLOCK",
  });
  return (
    <div className="bg-white">
      <div ref={drop} className="border border-solid border-red-600 p-4">
        <ResponsiveGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={{ lg: blocks }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        >
          {blocks.map((block) => (
            <div key={block.i}>{block.component}</div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
DragAndDropArea.propTypes = {
  blocks: PropTypes.array,
};
export default DragAndDropArea;
