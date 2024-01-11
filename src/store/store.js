import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import builderReducer from "./builderSlice";
import userReducer from "./userSlice";
import openAiReducer from "./openAiSlice";
import editorReducer from "./editorSlice";

export const store = configureStore({
  reducer: {
    navbarState: navbarReducer,
    builderState: builderReducer,
    editorState: editorReducer,
    userState: userReducer,
    openAiState: openAiReducer,
  },
});
