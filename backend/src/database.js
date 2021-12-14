import mongoose from 'mongoose';

export async function connectToDb() {
    try {
        await mongoose.connect(
                `mongodb://mongo:27017/formsProducts`, { 
                    useNewUrlParser: true 
                });
        console.log('Database connected');
    } 
    catch {
        console.log('Database connection error');
    }
};
