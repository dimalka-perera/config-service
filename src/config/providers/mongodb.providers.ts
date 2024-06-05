import mongoose, { Connection } from "mongoose";
import { ConfigSchema } from "../schema/config.schema";

export const mongodb_model_providers=[
    {
        provide: 'CONFIG_MODEL',
        useFactory: (connection:Connection)=>connection.model('ConfigModel', ConfigSchema),
        inject: ['MONGODB_CONNECTION']
    }
]