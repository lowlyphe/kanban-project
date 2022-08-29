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
    const data = await pool.query('SELECT task_name, description, status, tasks.task_id FROM tasks INNER JOIN boards USING(board_id) WHERE tasks.board_id = $1', [id]);
    res.status(200).type('applicaiton/json').send(data.rows)
})

app.get('/api/task/:id', async (req,res) => {
    const id = req.params.id;
    const data = await pool.query('SELECT tasks.task_id, subtasks.task_id, subtask_name, subtasks.isComplete from tasks INNER JOIN subtasks USING(task_id) WHERE tasks.task_id = $1', [id]);
    res.status(200).type('applicaiton/json').send(data.rows);
})

app.post('/api/tasks/', async (req,res) => {
    const { task_id, name, board_id, description, status } = req.body.taskObj;
    const data = await pool.query('INSERT INTO tasks(task_id, task_name, board_id, description, status) VALUES($1, $2, $3, $4, $5) RETURNING *', [task_id, name, board_id, description, status]);
    res.status(200).type('application/json').send(data.rows)
})

app.post('/api/subtasks/', async (req,res) => {
    const { subtask_name, task_id, isComplete } = req.body
    const data = await pool.query('INSERT INTO subtasks(subtask_name, iscomplete, task_id) VALUES($1, $2, $3) RETURNING *', [subtask_name, isComplete, task_id]);
    
    res.status(200).type('application/json').send(data.rows[0])
})

app.post('/api/boards', async (req,res) => {
    console.log(req.body)
    const { board_id, board_name, isComplete } = req.body;
    const data = await pool.query('INSERT INTO boards(board_id, board_name, isComplete) VALUES($1, $2, $3) RETURNING *', [board_id, board_name, isComplete]);
    res.status(200).type('application/json').send(data.rows[0])
})

app.listen(PORT || 3001, () => {
    console.log('You are now connected')
})