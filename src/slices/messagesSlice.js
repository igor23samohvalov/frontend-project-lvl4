import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions, fetchChannels } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesReducer = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
      messagesAdapter.setAll(state, restEntities);
    });
    builder.addCase(fetchChannels.fulfilled, (state, { payload }) => {
      messagesAdapter.setAll(state, payload.messages);
    });
  },
});

export const { actions } = messagesReducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesReducer.reducer;
