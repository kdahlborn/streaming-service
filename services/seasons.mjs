import { db } from './db.mjs';
import {
    ScanCommand,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
    QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

// Add new season
export const addNewSeason = async (season) => {
    try {
        const command = new PutCommand({
            TableName: 'streaming-db',
            Item: season,
        });

        await db.send(command);

        return true;
    } catch (error) {
        throw createError(500, error.message);
    }
};
