const express = require('express')
const cors = require('cors');    
const app = express();
const dotenv = require('dotenv') 
dotenv.config();
const pg = require('pg') 

app.use(cors());
app.use(express.json());

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

app.use(express.static(path.join(__dirname, 'build')));

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
    const data = await pool.query('SELECT tasks.task_id, subtasks.task_id, subtask_id, subtask_name, subtasks.isComplete from tasks INNER JOIN subtasks USING(task_id) WHERE tasks.task_id = $1', [id]);
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
    const { board_id, board_name, isComplete } = req.body.newBoard;
    const data = await pool.query('INSERT INTO boards(board_id, board_name, isComplete) VALUES($1, $2, $3) RETURNING *', [board_id, board_name, isComplete]);
    res.status(200).type('application/json').send(data.rows[0])
})

app.put('/api/tasks/:id', async (req,res) => {
    const id = req.params.id;
    const { task_id, task_name, board_id, description, status } = req.body;
    console.log(req.body)
    const data = await pool.query('UPDATE tasks SET task_id = $1, task_name = $2, board_id = $3, description = $4, status = $5 WHERE task_id = $6 RETURNING *', [task_id, task_name, board_id, description, status, id]);
    res.status(200).type('application/json').send(data.rows)
})

app.delete('/api/subtasks/:id', async (req,res) => {
    const id = req.params.id
    const data = pool.query('DELETE FROM subtasks WHERE subtask_id = $1 RETURNING *', [id]);
    res.status(200).type('application/json').send(data.rows)
})

app.delete('/api/tasks/:id', async (req,res) => {
    const id = req.params.id
    const data = pool.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [id]);
    res.status(200).type('application/json').send(data.rows)
})

app.listen(PORT || 3001, () => {
    console.log(`connected on port: ${PORT}`)
})