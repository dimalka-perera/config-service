import { Document } from "mongoose";

export interface Config extends Document{
    serviceName: String,
    config: Object,
    lastUpdatedBy: String,
    lastCreated: String,
    lastUpdated: String
}