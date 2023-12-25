import React, { useState } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from './producer.module.css';
import { addProducer } from '../../State-Management/Reducers';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddProducer = ({handleCloseProducer}) => {
  const [formData, setFormData] = useState({
    Name: '',
    Gender: '',
    DOB: null,
    Bio: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
const dispatch = useDispatch()
  const handleDateChange = (newDate) => {
    setFormData({ ...formData, DOB: newDate });
    setError(!newDate);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { Name, Gender, DOB, Bio } = formData;

    if (!DOB) {
      setError(true);
      return;
    }
    const date = new Date(DOB);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    try {
      setLoading(true);
      const finalData = {
        Name,
        Gender,
        DOB: formattedDate,
        Bio,
      };

      const response = await axios.post(
        "https://iofactory-backend.onrender.com/producer/add",
        finalData
      );
      const data = await response.data.producer;
      await dispatch(addProducer(data));
      handleCloseProducer();
    } catch (error) {
      console.log(error);
      alert(error)
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div>
      <Typography variant="h6" component="h2" textAlign="center">
        Producer Details
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className={styles.card}>
        <TextField
          name="Name"
          label="Producer name..."
          value={formData.Name}
          onChange={handleChange}
          required
        />
        <TextField
          name="Gender"
          label="Gender..."
          value={formData.Gender}
          onChange={handleChange}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="DOB..."
            value={formData.DOB}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} error={error} />}
          />
        </LocalizationProvider>
        {error && (
          <Typography variant="body2" color="error">
            Please select a date
          </Typography>
        )}
        <TextField
          name="Bio"
          label="Write bio..."
          value={formData.Bio}
          onChange={handleChange}
          required
          multiline
          minRows={4}
          maxRows={4}
        />
        <Button
          disabled={loading}
          variant="contained"
          type="submit"
          color="secondary"
        >
          {loading ? <CircularProgress size="30px" color="secondary"/> : "Add Producer"}
        </Button>
      </Box>
    </div>
  );
};

export default AddProducer;
