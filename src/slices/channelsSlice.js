import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsReducer = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
  },
});

export const { actions } = channelsReducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsReducer.reducer;
