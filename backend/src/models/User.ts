import {Schema, model, Document } from 'mongoose';

//Define a TypeScript interface representing a User Document in Mongo
// Extending Mongoose's Document ensures it inherits properties like ._id and .save()
export interface IUser extends Document {
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true, minlemgth: [3, 'Username must be at least 3 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true, 
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address'
            ]
        },
        passwordHash: {
            type: String,
            required: [true, 'Password is Required']
        }
    },
    {
        timestamps: true
    }
);

export const User = model<IUser>('User', userSchema);