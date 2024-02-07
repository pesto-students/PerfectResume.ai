import { createSlice } from "@reduxjs/toolkit";
// import { dataSchema, metaData, template } from "src/utils/template";

const initialState = {
  template: {},
  resume: {},
  metaData: {},
  isTextApplied: false,
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setTemplateData: (state, action) => {
      const { template } = action.payload;
      state.template = template;
    },
    setResumeData: (state, action) => {
      const { resume } = action.payload;
      state.resume = resume;
      state.metaData = resume.metaData; //initial
    },
    updateResumeMetaData: (state, action) => {
      const { metaData } = action.payload;
      state.metaData = metaData;
    },
    updateMetaDataSection: (state, action) => {
      const { section, data, isTextApplied } = action.payload;
      state.metaData[section] = data;
      if (isTextApplied) {
        state.isTextApplied = !state.isTextApplied;
      }
    },
  },
});

export const {
  setTemplateData,
  setResumeData,
  updateResumeMetaData,
  updateMetaDataSection,
} = builderSlice.actions;
const builderReducer = builderSlice.reducer;
export default builderReducer;
