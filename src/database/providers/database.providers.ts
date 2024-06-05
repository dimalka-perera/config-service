import mongoose, { Connection } from "mongoose";


export const mongodb_providers = [
    {
        provide: 'MONGODB_CONNECTION',
        useFactory: ()=>{
            console.log(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`)
            return mongoose.connect(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`)
        }
    }
]
