import { Request, Response } from "express";
import { StatusCode } from "../utils/types";
const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.status(StatusCode.SUCCESS).json({ message: 'Login successful!' });
    } else {
        res.status(StatusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
}
export default loginController;