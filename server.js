const express = require('express')
const cors = require('cors');    
const app = express();
const dotenv = require('dotenv') 
dotenv.config();
const pg = require('pg') 

app.use(cors());
app.use(express.json());

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
  
app.get('/api/boards', async (req,res) => {
    const data = await pool.query('SELECT * FROM boards');
    res.set(200).type('applicaiton/json').send(data.rows)
})

app.get('/api/tasks/:id', async (req,res) => {
    const id = req.params.id;
    const data = await pool.query('SELECT tasks.name as taskName, description, status, tasks.task_id FROM tasks INNER JOIN boards USING(board_id) WHERE tasks.board_id = $1', [id]);
    res.status(200).type('applicaiton/json').send(data.rows)
})

app.get('/api/task/:id', async (req,res) => {
    const id = req.params.id;
    const data = await pool.query('SELECT tasks.task_id, subtasks.task_id, subtasks.name, subtasks.isComplete from tasks INNER JOIN subtasks USING(task_id) WHERE tasks.task_id = $1', [id]);
    res.status(200).type('applicaiton/json').send(data.rows);
})

app.listen(PORT || 3001, () => {
    console.log('You are now connected')
})