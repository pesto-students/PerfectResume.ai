import { useRef } from "react";
import { debounce, isArray } from "src/utils/utils";
import TextArea from "./form/text-area";
import InputField from "./form/input-field";
import { v4 as uuidv4 } from "uuid";

import AiRephraseBox from "./ai-box";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "src/store/editorSlice";
import TimesIcon from "src/assets/icons/times.svg?react";
import {
  updateMetaDataSection,
  updateResumeMetaData,
} from "src/store/builderSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

const TemplateForm = () => {
  const { activeSection } = useSelector((state) => state.editorState);
  const {
    template: templateData,
    metaData,
    isTextApplied,
  } = useSelector((state) => state.builderState);
  const [formSchema, setFormSchema] = useState(null);
  const dispatch = useDispatch();
  const formRef = useRef();
  const resetKey = useMemo(() => Date.now(), [isTextApplied]);

  const updateMetaData = (newMetaData) => {
    const updatedMetaData = { ...metaData, ...newMetaData };
    dispatch(updateResumeMetaData({ metaData: updatedMetaData }));
  };

  const onApplyText = ({ field, value }) => {
    dispatch(
      updateMetaDataSection({
        section: activeSection,
        data: { ...metaData[activeSection], [field]: value },
        isTextApplied: true,
      }),
    );
  };
  const onFormClose = () => {
    dispatch(setActiveSection({ activeSection: "" }));
  };

  const onFormChange = () => {
    debounceUpdateFormData();
  };

  const deleteBlock = (blockId) => {
    const data = metaData[activeSection];
    if (isArray(data)) {
      let newData = data.filter((item) => item.order !== blockId);
      let finalData = { [activeSection]: newData };
      updateMetaData(finalData);
    }
  };

  function mergeItemsByOrder(arr) {
    return Object.values(
      arr.reduce((acc, item) => {
        const order = item.order;

        // If the order doesn't exist in the accumulator, initialize an empty object
        acc[order] = acc[order] || {};

        // Merge the current item into the object for this order
        Object.assign(acc[order], item);

        return acc;
      }, {}),
    );
  }
  const updateFormData = () => {
    const formData = formRef.current;

    const finalData = {};
    if (formSchema.fieldType.repeatable && formSchema.fieldType.isBlock) {
      const newFormData = new FormData(formRef.current);
      let tempData = [];
      for (let [key, value] of newFormData.entries()) {
        let order = formData[key].dataset.order;
        let actualKey = formData[key].dataset.key;
        value = value ? value.replace(/[{}]/g, "") : "";
        tempData.push({ [actualKey]: value, order: parseInt(order) });
      }
      let newData = mergeItemsByOrder(tempData);
      finalData[activeSection] = newData;
    }
    if (formSchema.fieldType.repeatable && !formSchema.fieldType.isBlock) {
      const newFormData = new FormData(formRef.current);
      let newData = [];
      for (let [key, value] of newFormData.entries()) {
        let order = formData[key].dataset.order;
        let actualKey = formData[key].dataset.key;
        value = value ? value.replace(/[{}]/g, "") : "";
        newData.push({ [actualKey]: value, order: parseInt(order) });
      }
      finalData[activeSection] = newData;
    }
    if (!formSchema.fieldType.repeatable) {
      let newData = {};
      const data = metaData[activeSection];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          let value = formData[key].value;
          value = value ? value.replace(/[{}]/g, "") : "";
          newData[key] = value;
        }
      }

      finalData[activeSection] = { ...data, ...newData };
    }

    // console.log("newData: ", finalData[activeSection]);
    updateMetaData(finalData);
  };

  const generateNewBlock = (formSchema, order) => {
    const { schema } = formSchema;
    const newBlock = schema.reduce((acc, current) => {
      acc[current.key] = current.placeholder;
      return acc;
    }, {});
    newBlock["order"] = order + 1;
    const data = metaData[activeSection];
    const finalData = { [activeSection]: [...data, newBlock] };
    updateMetaData(finalData);
  };

  const generateForm = (formSchema, metaData) => {
    const data = metaData[activeSection];
    if (formSchema.fieldType.repeatable && isArray(data)) {
      let formFields = [];
      data.forEach((item) => {
        formSchema.schema.forEach((fieldData) => {
          let field = null;
          if (fieldData.type === "input") {
            field = (
              <div key={`${fieldData.label}-${item["order"]}`} className="mb-6">
                <InputField
                  field={fieldData}
                  data={item}
                  order={item["order"]}
                />
              </div>
            );
          }
          if (fieldData.type === "textarea") {
            field = (
              <div key={`${fieldData.label}-${item["order"]}`} className="mb-6">
                <TextArea field={fieldData} data={item} order={item["order"]}>
                  {fieldData.includeAi ? (
                    <div className="absolute right-0 bottom-[9px]  z-50">
                      <AiRephraseBox
                        metaData={metaData}
                        activeSection={activeSection}
                        field={fieldData.key}
                        data={item[fieldData.key]}
                        rephraseCacheId={uuidv4()}
                        onApplyText={onApplyText}
                      />
                    </div>
                  ) : null}
                </TextArea>
              </div>
            );
          }
          formFields.push(field);
        });
        if (formSchema.fieldType.isBlock) {
          let action = (
            <div key={`Delete-block-${item.order}`} className="mt-4 mb-20">
              <button
                type="button"
                onClick={() => deleteBlock(item.order)}
                className="rounded py-1.5 text-sm text-red-500 uppercase font-semibold border border-red-500 border-dashed w-full"
              >
                Delete Block
              </button>
            </div>
          );
          formFields.push(action);
        }
      });
      if (
        formSchema.fieldType.isBlock &&
        data.length < formSchema.fieldType.max
      ) {
        let largestOrder = data.reduce(
          (max, item) => (item.order > max ? item.order : max),
          data[0].order,
        );
        let action = (
          <div key={`Add-block`} className="mt-4 mb-2">
            <button
              type="button"
              className="rounded py-1.5 text-sm text-primary uppercase font-semibold border border-accent-900 border-dashed w-full"
              onClick={() => {
                generateNewBlock(formSchema, largestOrder);
              }}
            >
              Add Block
            </button>
          </div>
        );
        formFields.push(action);
      }
      return formFields;
    }
    if (!(formSchema.fieldType.repeatable || isArray(data))) {
      return formSchema.schema.map((fieldData) => {
        if (fieldData.type === "input") {
          return (
            <div key={fieldData.label} className="mb-6">
              <InputField field={fieldData} data={data} />
            </div>
          );
        }
        if (fieldData.type === "textarea") {
          return (
            <div key={fieldData.label} className="mb-6">
              <TextArea field={fieldData} data={data}>
                {fieldData.includeAi ? (
                  <div className="absolute right-0 bottom-[9px]  z-50">
                    <AiRephraseBox
                      metaData={metaData}
                      activeSection={activeSection}
                      field={fieldData.key}
                      data={data[fieldData.key]}
                      rephraseCacheId={uuidv4()}
                      onApplyText={onApplyText}
                    />
                  </div>
                ) : null}
              </TextArea>
            </div>
          );
        }
      });
    }

    return "loading...";
  };
  const debounceUpdateFormData = debounce(updateFormData, 400);

  useEffect(() => {
    if (activeSection) {
      setFormSchema(templateData.formSchema[activeSection]);
    } else {
      setFormSchema(null);
    }
  }, [activeSection]);

  return (
    <>
      {!(activeSection && formSchema) ? (
        <div className=" w-full h-96 p-8 flex justify-center items-center rounded border-2 border-dashed border-gray-300">
          <h1 className="text-2xl font-semibold text-gray-400 text-center">
            Click edit button of any <br /> block in the template
          </h1>
        </div>
      ) : (
        <div className="w-full relative shadow-[0_6px_15px_#00000029] rounded border-t border-solid border-[#f3f3f3]">
          <div className="absolute right-0 top-0">
            <button
              onClick={() => onFormClose()}
              className="bg-gray-200 hover:bg-gray-300 font-semibold m-1 p-1.5"
            >
              <TimesIcon />
            </button>
          </div>
          <div className="max-h-[840px] p-8 overflow-auto mb-10 custom-scrollbar">
            {/* <Loader openModal={isLoading} setOpenModal={setIsLoading} /> */}
            <form key={resetKey} onChange={onFormChange} ref={formRef}>
              {generateForm(formSchema, metaData)}
            </form>
          </div>
          <div className="absolute bottom-2 flex justify-center items-center w-full bg-transparent">
            <button
              onClick={() => onFormClose("")}
              className="text-sm text-accent-800 bg-white hover:text-accent font-semibold m-1 px-3 py-2 border border-gray-200 rounded-md"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateForm;
