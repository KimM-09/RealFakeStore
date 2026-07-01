import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '7d',
    });
};

export const authController = {
    /**
     * ROUTE: POST /api/auth/register
     * DESC: Register a new user
     */
    register: async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, email, password } = req.body;

            if(!username || !email || !password){
                res.status(400).json({ message: 'All fields are required.' });
                return;
            }

            const userExists = await User.findOne({ email });
            if(userExists){
                res.status(400).json({ message: 'A user with that email already exists.' });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash( password, salt );

            const newUser = await User.create({
                username,
                email,
                passwordHash,
            });

            res.status(201).json({
                token: generateToken(newUser.id as string), //removed the _ from infront of id - may be a problem - will find out
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Registration Failed server-side. authController.ts', error: (error as Error).message});
        }
    },

    /**
     * ROUTE: POST /api/auth/login
     * DESC: Authenticate a user and return a token
     */
    login: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if(!email || !password) {
                res.status(400).json({ message: 'Email and password are required.' });
                return;
            }

            const user = await User.findOne({ email });
            if(!user) {
                res.status(401).json({ message: 'Invalid email or password' });
                return
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if(!isMatch) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            res.status(200).json({
                token: generateToken(user.id as string),//removed the _ from infront of id - may be a problem - will find out
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Login failed server-side. authController.ts', error:(error as Error).message});
        }
    }
};