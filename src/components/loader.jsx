import { Modal } from "flowbite-react";
import { useContext } from "react";
import BotIcon from "src/assets/icons/bot.svg?react";
import { LoaderContext } from "src/contexts/loader-context";

const Loader = () => {
  const { showLoader, setShowLoader, loaderContext } =
    useContext(LoaderContext);
  return (
    <>
      <Modal
        show={showLoader}
        onClose={() => setShowLoader(false)}
        size={"2xl"}
      >
        <Modal.Body>
          <div className="h-96">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                <span className="inline-block pb-2 mx-1">
                  <BotIcon className="w-7 h-7" />
                </span>
                <h1 className="text-2xl font-semibold text-center">
                  Resume.AI
                </h1>
              </div>
              <div className="mt-4">
                <h1 className="text-lg font-medium text-gray-700 text-center">
                  {loaderContext || "Loading..."}
                </h1>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Loader;
