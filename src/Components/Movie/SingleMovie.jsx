import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchData } from "../../State-Management/Reducers";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import styles from "./movie.module.css";

const SingleMovie = () => {
  const data = useSelector((state) => state.singleMovie);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchData("singleMovie/fetchData")({
        url: `https://iofactory-backend.onrender.com/movie/get?id=${params.id}`,
      })
    );
  }, []);

  const movieData = data.data.movies;
console.log(movieData)
  return (
    <Typography component="div" className={styles.singleMovie}>
      {data.loading ? (
        <Typography component="div">
          <CircularProgress color="secondary" />
        </Typography>
      ) : (
        <Card sx={{backgroundColor:"rgb(14, 14, 15)",color:"aliceblue",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <CardMedia
            sx={{ height: 400,width:400}}
            image={movieData?.Poster}
            title={movieData?.Name}
          />
          <CardContent className={styles.singleMovieContent}>
            <Typography gutterBottom variant="h5" component="div">
              {movieData?.Name}
            </Typography>
            <Typography variant="body2">{movieData?.YearOfRelease}</Typography>
            <Typography variant="body2">
              {movieData?.Plot}
            </Typography>
            <Typography variant="body2">
             Actors: {movieData?.Actors.map((item, idx) => {
                return (
                  <Typography component="span">
                    <Link key={idx} href={`/actor/${item._id}`}>
                    {item.Name}
                  </Link>
                  {" , "}
                </Typography>
                );
              })}
            </Typography>
            <Typography variant="body2">
             Producer: <Link href={`/producer/${movieData?.Producer._id}`}>{movieData?.Producer.Name}</Link>
            </Typography>
          </CardContent>
        </Card>
      )}
    </Typography>
  );
};

export default SingleMovie;
