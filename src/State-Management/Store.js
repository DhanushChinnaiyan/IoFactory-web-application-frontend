import { configureStore } from '@reduxjs/toolkit';
import {
  singleMovieReducer,
  actorsReducer,
  producersReducer,
  singleActorReducer,
  singleProducerReducer,
  moviesReducer,
} from './Reducers'


const apiMiddleware = (store) => (next) => (action) => {  
    if (action.type.includes('fetchData')) {
      console.log('Action Payload:', action);
    }
    return next(action);
  };
  
  const rootReducer = {
    movies:moviesReducer,
    singleMovie: singleMovieReducer,
    actors: actorsReducer,
    producers: producersReducer,
    singleActor: singleActorReducer,
    singleProducer: singleProducerReducer,
  };
  

const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(), apiMiddleware]
});

export default store;