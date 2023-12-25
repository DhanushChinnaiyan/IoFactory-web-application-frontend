import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./State-Management/Reducers";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import Home from "./Components/Home/Home";
import { Route, Routes } from "react-router-dom";
import SingleMovie from "./Components/Movie/SingleMovie";
import Producer from "./Components/Producer/Producer";
import Actor from "./Components/Actor/Actor";

function App() {
  const dispatch = useDispatch();
  const producerData = useSelector((state) => state.producers);
  const actorsData = useSelector((state) => state.actors);
  const moviesData = useSelector((state) => state.movies);

  useEffect(() => {
    // const commonApi = "https://iofactory-backend.onrender.com"
    // dispatch(fetchData("singleMovie/fetchData")({ url: `${commonApi}/movie/get?id=${"6582c5ab9a5b2a8fd9292961"}` }));
    // dispatch(fetchData("actors/fetchData")({ url: `${commonApi}/actor/get` }));
    // dispatch(fetchData("singleActor/fetchData")({ url: `${commonApi}/actor/get?id=${"65829894515eddcb120348ee"}` }));
    // dispatch(fetchData("producers/fetchData")({ url: `${commonApi}/producer/get` }));
    // dispatch(fetchData("singleProducer/fetchData")({ url: `${commonApi}/producer/get?id=${"6582ba0a62c88a9b5efe08c2"}` }));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/actor/:id" element={<Actor />} />
        <Route path="/producer/:id" element={<Producer />} />
      </Routes>
    </div>
  );
}

export default App;
