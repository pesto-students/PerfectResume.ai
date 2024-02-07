import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFormVisible: false,
  activeSection: "",
  formSchema: {},
  formData: {},
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setInitData: (state, action) => {
      const {
        isFormVisible = false,
        activeSection = "",
        formSchema = {},
        formData = {},
      } = action.payload;
      state = { isFormVisible, activeSection, formSchema, formData };
    },
    updateFormData: (state, action) => {
      const { formData } = action.payload;
      state.formData = formData;
    },
    setActiveSection: (state, action) => {
      const { activeSection } = action.payload;
      state.activeSection = activeSection;
    },
  },
});

export const { setInitData, updateFormData, setActiveSection } =
  editorSlice.actions;
const editorReducer = editorSlice.reducer;
export default editorReducer;
