import { Request, Response } from "express";

const registerController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username && password) {
        res.status(201).json({ message: 'User registered successfully!' });
    } else {
        res.status(400).json({ message: 'Username and password are required' });
    }
}
export default registerController;