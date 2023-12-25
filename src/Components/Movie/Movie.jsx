import React from "react";
import styles from "./movie.module.css";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const moviesData = useSelector((state) => state.movies);
  const movies = moviesData.data.movies;
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      {movies?.map((ele,idx) => {
        return (
          <CardActions
            sx={{ width: 140 }}
            className={styles.cardAction}
            onClick={() => navigate(`/movie/${ele._id}`)}
            key={idx}
          >
            <Card sx={{ width: 140 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={ele.Poster}
                title={ele.Name}
              />
              <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                  {ele.Name}
                </Typography>
                <Typography variant="body2">{ele.YearOfRelease}</Typography>
              </CardContent>
            </Card>
          </CardActions>
        );
      })}
    </div>
  );
};

export default Movie;
