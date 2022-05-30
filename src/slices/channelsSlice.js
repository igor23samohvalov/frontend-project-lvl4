import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    try {
      const response = await axios.get('/api/v1/data', { headers: token });
      if (response.status !== 200) throw new Error(`Response Error, code: ${response.status}`);

      return response.data;
    } catch (error) {
      return console.log(error.message);
    }
  },
);

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
  extraReducers: {
    [fetchChannels.fulfilled]: (state, { payload }) => {
      channelsAdapter.setAll(state, payload.channels);
    },
  },
});

export const { actions } = channelsReducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsReducer.reducer;
