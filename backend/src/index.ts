import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/profile")


app.get('/', (req, res) => {
    res.send('SynCode Backend Server is running successfully! ');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});