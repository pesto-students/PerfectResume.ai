import profile from "src/assets/templates/adeline.png";
import Icon from "src/components/icon";
import editIcon from "src/assets/icons/pencil.svg";
import { createJSONFromHTML } from "src/utils/template-parser";
import { useEffect } from "react";
import CreateTemplate from "src/components/create-template";

const CreateTemplatePage = () => {
  //   useEffect(() => {
  //     let json = createJSONFromHTML(document.getElementById("resume-root"));
  //     console.log("json: ", json);
  //   }, []);
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col items-center justify-start max-w-[600px] w-full h-full mb-8">
        <div data-title="header" className="w-full mb-4">
          <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-base text-primary font-medium">
                Create Template
              </h1>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-1.5 ml-2 text-xs font-semibold text-center uppercase inline-flex items-center text-white bg-accent rounded-md border-2 border-accent  hover:bg-accent-900 hover:border-accent-900 focus:ring-4 focus:outline-none focus:ring-accent-300"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div className=" w-full shadow-[0_6px_15px_#00000029] p-1 rounded border-t border-solid border-[#f3f3f3]">
          <div className="w-full h-full min-h-[842px] max-h-[890px] overflow-y-auto overflow-x-hidden custom-scrollbar">
            <CreateTemplate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
