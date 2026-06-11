// store/audioQueueSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { IBeat } from '../models/Beat';

const audioQueueSlice = createSlice({
  name: 'audioQueue',
  initialState: {
    queue:  [], // Holds audio details and URLs
    isPlaying: false, // Indicates whether audio is currently playing
    currentAudio: null, // Holds the currently playing audio URL
  },
  reducers: {
    addToQueue(state: {queue: IBeat[]}, action : {
        payload: IBeat,
    }) {
      state.queue.push(action.payload); // Add new audio URL to queue
    },
    removeFromQueue(state) {
      state.queue.shift(); // Remove the first item in the queue
    },
    setIsPlaying(state, action : {payload: boolean}) {
      state.isPlaying = action.payload; // Update playing status
    },
    setCurrentAudio(state, action) {
      state.currentAudio = action.payload; // Set the currently playing audio
    },
    clearQueue(state) {
      state.queue = [];
      state.isPlaying = false;
      state.currentAudio = null;
    },
  },
});

export const {
  addToQueue,
  removeFromQueue,
  setIsPlaying,
  setCurrentAudio,
  clearQueue,
} = audioQueueSlice.actions;

export default audioQueueSlice.reducer;
