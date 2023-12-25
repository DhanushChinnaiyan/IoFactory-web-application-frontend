import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Autocomplete,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import AddActor from "../Actor/AddActor";
import AddProducer from "../Producer/AddProducer";
import styles from "./movie.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../State-Management/Reducers";
import axios from "axios";

const AddMovie = ({handleClose}) => {
  const [selectedActors, setSelectedActors] = useState([]);
  const [selectedProducers, setSelectedProducers] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    YearOfRelease: "",
    Poster: "",
    Plot: "",
  });
  const producerData = useSelector((state) => state.producers);
  const actorsData = useSelector((state) => state.actors);
  const actorList = actorsData.data.actor;
  const producerList = producerData.data.producer;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const handleActorChange = (_, newValue) => {
    setSelectedActors(newValue);
  };

  const handleProducerChange = (_, newValue) => {
    setSelectedProducers(newValue);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const finalData = {
        ...formData,
        Actors:selectedActors,
        ProducerId:selectedProducers
    }

    try {
        setLoading(true);
        console.log(finalData);
        const response = await axios.post(
          "https://iofactory-backend.onrender.com/movie/add",
          finalData
        );
        const data = await response.data.movie;
        await dispatch(addMovie(data));
        handleClose();
      } catch (error) {
        console.log(error);
        alert(error)
      } finally {
        setLoading(false);
        
      }

  };
  return (
    <div>
      <Typography variant="h6" textAlign="center" component="h2">
        Movie Details
      </Typography>
      <Box component="form" className={styles.card} onSubmit={handleSubmit}>
        <TextField
          name="Name"
          label="Movie name..."
          value={formData.Name}
          onChange={handleChange}
          required
        />
        <TextField
          name="YearOfRelease"
          label="Year of release..."
          value={formData.YearOfRelease}
          onChange={handleChange}
          required
        />
        <TextField
          name="Poster"
          label="Poster url..."
          value={formData.Poster}
          onChange={handleChange}
          required
        />
        <Autocomplete
          multiple
          options={actorList}
          getOptionLabel={(option) => option.Name}
          value={selectedActors}
          onChange={handleActorChange}
          renderOption={(props, actor) => (
            <li {...props}>
              <Checkbox
                checked={selectedActors.some((a) => a.Name === actor.Name)}
                onChange={() => {
                  const currentIndex = selectedActors.findIndex(
                    (a) => a.Name === actor.Name
                  );
                  const newSelected = [...selectedActors];

                  if (currentIndex === -1) {
                    newSelected.push(actor);
                  } else {
                    newSelected.splice(currentIndex, 1);
                  }

                  setSelectedActors(newSelected);
                }}
              />
              {actor.Name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Search Actor" variant="outlined" />
          )}
        />
        <Autocomplete
          options={producerList}
          getOptionLabel={(option) => option.Name}
          value={selectedProducers}
          onChange={handleProducerChange}
          renderInput={(params) => (
            <TextField {...params} label="Search Producer" variant="outlined" />
          )}
        />
        <TextField
          name="Plot"
          label="Description..."
          value={formData.Plot}
          onChange={handleChange}
          multiline
          minRows={3}
          maxRows={3}
          required
        />
       <Button
          disabled={loading}
          variant="contained"
          type="submit"
          color="secondary"
        >
          {loading ? <CircularProgress size="30px" color="secondary"/> : "Add Actor"}
        </Button>
      </Box>
    </div>
  );
};

export default AddMovie;
