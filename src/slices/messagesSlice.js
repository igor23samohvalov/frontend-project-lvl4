import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesReducer = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
});

export const { actions } = messagesReducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesReducer.reducer;
