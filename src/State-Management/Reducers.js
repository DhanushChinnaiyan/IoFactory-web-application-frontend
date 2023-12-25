import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Dynamic function to fetch data from the API
export const fetchData = (actionType) => createAsyncThunk(
  actionType,
  async ({ url }, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(`Fetching failed for ${url}`);
    }
  }
);

// Common slice
const createDataSlice = (name,actionType,reducer={}) =>
  createSlice({
    name,
    initialState:{
      data:[],
      loading:false
    },
    reducers:reducer,
    extraReducers: (builder) => {
      builder
      .addCase(fetchData(actionType).pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData(actionType).fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchData(actionType).rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : `Fetching failed for ${name}`;
      });
    },
  });

// Different slices
export const moviesSlice = createDataSlice("movies","movies/fetchData",{
    addMovie:(state,action)=>{
      state.data.movies.push(action.payload)
    }
});
export const singleMovieSlice = createDataSlice("singleMovie","singleMovie/fetchData");
export const actorsSlice = createDataSlice('actors',"actors/fetchData",{
  addActor:(state,action)=>{
    state.data.actor.push(action.payload)
  }
});
export const producersSlice = createDataSlice('producers',"producers/fetchData",{
  addProducer:(state,action)=>{
    state.data.producer.push(action.payload)
  }
});
export const singleActorSlice = createDataSlice('singleActor',"singleActor/fetchData");
export const singleProducerSlice = createDataSlice('singleProducer',"singleProducer/fetchData");


// Export reducers
export const moviesReducer = moviesSlice.reducer;
export const singleMovieReducer = singleMovieSlice.reducer;
export const actorsReducer = actorsSlice.reducer;
export const producersReducer = producersSlice.reducer;
export const singleActorReducer = singleActorSlice.reducer;
export const singleProducerReducer = singleProducerSlice.reducer;

// Export actions 
export const {addMovie} = moviesSlice.actions
export const {addActor} = actorsSlice.actions
export const {addProducer} = producersSlice.actions