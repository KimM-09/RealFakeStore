import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Extend the Express Request interface globally within this file 
// so TypeScript knows it's safe to attach a 'user' property to 'req'.
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

interface JwtPayload {
    id: string;
}

export const protect = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let token;

    //Tokens are conventionally sent inside the HTTP 'Authorization' header as 'Bearer <token>'
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Split the header string by space to isolate the token string
            token = req.headers.authorization.split(' ')[1];
            //Decode and verify the cryptographic token signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as JwtPayload;
            //Extract the user ID from the token payload and attach it to the request object
            req.user = { id: decoded.id };
            //Everything checks out! Move to the next function block in line
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, login token failed validation. authMiddleware.ts'});
        }
    }

    if(!token) {
        res.status(401).json({ message: 'Not authorized, no verification token found. authMiddleware.ts'})
    }
}