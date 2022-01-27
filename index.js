/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
// PORT DECLARATION
const PORT = 5000;

// middlewares
app.use(cors());
app.use(express.json()); // this allow you to access req.body

// Routes //
app.post('/schedules', async (req, res) => {
  try {
    const { description } = req.body;
    const newSchedules = await pool.query(
      'INSERT INTO schedules(description) VALUES($1) RETURNING * ',
      [description],
    );

    res.json(newSchedules.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
// create get activity list / getting all the activity link from the database
app.get('/schedules', async (req, res) => {
  try {
    const allSchedules = await pool.query('SELECT * FROM schedules');
    res.send(allSchedules.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a activity
app.get('/schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await pool.query('SELECT * FROM schedules WHERE schedule_id = $1', [id]);
    res.json(schedule.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update an activity
app.put('/schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query(
      'UPDATE schedules SET description = $1 WHERE schedule_id = $2 ',
      [description, id],
    );
    res.json('schedule was updated');
  } catch (error) {
    console.log(error.message);
  }
});

app.delete('/schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM schedules WHERE schedule_id = $1', [id]);
    res.json('schedule deleted successfully');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
