import mongoose from "mongoose";

export const ConfigSchema=new mongoose.Schema({
    
    serviceName: {
        required: true,
        type: String,
        unique: true
    },
    secret:{
        required: false,
        type: String
    },
    config: Object,
    lastUpdatedBy: String,

},{timestamps: true})