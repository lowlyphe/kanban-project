import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import pg from 'pg';

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
    const data = await pool.query('SELECT tasks.name as taskName, description, status FROM tasks INNER JOIN boards USING(board_id) WHERE tasks.board_id = $1', [id]);
    res.status(200).type('applicaiton/json').send(data.rows)
})

app.listen(PORT || 3001, () => {
    console.log('You are now connected')
})