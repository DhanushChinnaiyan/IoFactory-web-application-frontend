import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { fetchData } from "../../State-Management/Reducers";
import styles from "./producer.module.css";

const Producer = () => {
  const params = useParams();
  const data = useSelector((state) => state.singleProducer);
  const producerData = data.data.producer;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchData("singleProducer/fetchData")({
        url: `https://iofactory-backend.onrender.com/producer/get?id=${params.id}`,
      })
    );
  }, []);
  return (
    <div >
      {data.loading ? (
        <Typography component="div" sx={{display:"flex",justifyContent:"center"}}>
          <CircularProgress color="secondary" />
        </Typography>
      ) : (
        <Paper className={styles.bioContainer} elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>
            {producerData?.Name}
          </Typography>
          <div className={styles.info}>
            <Typography variant="body1">
              <strong>Bio:</strong> {producerData?.Bio}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {producerData?.DOB.slice(0,10)}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {producerData?.Gender}
            </Typography>
            <Typography variant="body1">
              <strong>Movies:</strong>
            </Typography>
            <Typography component="div" sx={{display:"flex",gap:"3px"}}>
              {producerData?.Movies.map((movie,idx) => (
                <Typography key={idx} >
                    <Link href={`/movie/${movie._id}`}>{movie.Name}</Link>
                    {" , "}
                </Typography>
              ))}
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Producer;
