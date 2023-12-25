import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  ImageList,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Movie from "../Movie/Movie";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../State-Management/Reducers";
import AddMovie from "../Movie/AddMovie";
import AddProducer from "../Producer/AddProducer";
import AddActor from "../Actor/AddActor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: "inset 0 0 20px gray",
  borderRadius: "5px",
  p: 3,
};

const Home = () => {
  // Movie adding state aand functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openActor, setOpenActor] = useState(false);
  const [openProducer, setOpenProducer] = useState(false);
  const handleOpenActor = () => setOpenActor(true);
  const handleCloseActor = () => setOpenActor(false);

  const handleOpenProducer = () => setOpenProducer(true);
  const handleCloseProducer = () => setOpenProducer(false);

  // Movie state
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const fetchFunction = async () => {
    const fetchUrls = [
      {
        url: "https://iofactory-backend.onrender.com/actor/get",
        type: "actors/fetchData",
      },
      {
        url: "https://iofactory-backend.onrender.com/producer/get",
        type: "producers/fetchData",
      },
      {
        url: "https://iofactory-backend.onrender.com/movie/get",
        type: "movies/fetchData",
      },
    ];

    const asyncFunction = fetchUrls.map((ele) => {
      return dispatch(fetchData(ele.type)({ url: ele.url }));
    });

    try {
      await Promise.all(asyncFunction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <img
          src="https://sprcdn-assets.sprinklr.com/674/8b955864-7307-4d41-8ded-c194170f5305-2729152590.jpg"
          alt="header"
        />
      </header>

      {movies.loading ? (
        <Typography
          component="div"
          sx={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Typography>
      ) : (
        <Typography component="div">
          <Typography
            component="div"
            sx={{
              margin: "20px",
              display: "flex",
              gap: "4px",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Add movie
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenActor}
            >
              Add Actor
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenProducer}
            >
              Add Producer
            </Button>
          </Typography>
          <Movie />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddMovie handleClose={handleClose}/>
            </Box>
          </Modal>
          <Modal
            open={openActor}
            onClose={handleCloseActor}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddActor handleCloseActor={handleCloseActor}/>
            </Box>
          </Modal>
          <Modal
            open={openProducer}
            onClose={handleCloseProducer}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddProducer handleCloseProducer={handleCloseProducer}/>
            </Box>
          </Modal>
        </Typography>
      )}
    </div>
  );
};

export default Home;
