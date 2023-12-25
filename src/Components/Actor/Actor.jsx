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
import styles from "./actor.module.css";

const Actor = () => {
    const params = useParams();
    const data = useSelector((state) => state.singleActor);
    const actorData = data.data.actor;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        fetchData("singleActor/fetchData")({
          url: `https://iofactory-backend.onrender.com/actor/get?id=${params.id}`,
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
              {actorData?.Name}
            </Typography>
            <div className={styles.info}>
              <Typography variant="body1">
                <strong>Bio:</strong> {actorData?.Bio}
              </Typography>
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {actorData?.DOB.slice(0,10)}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {actorData?.Gender}
              </Typography>
              <Typography variant="body1">
                <strong>Movies:</strong>
              </Typography>
              <Typography component="div" sx={{display:"flex",gap:"3px"}}>
                {actorData?.Movies.map((movie,idx) => (
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
  )
}

export default Actor