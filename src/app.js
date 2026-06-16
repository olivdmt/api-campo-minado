import Express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import gamesRoutes from './routes/gamesRoutes.js'

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(Express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/games', gamesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Game MineField API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});


export default app;

