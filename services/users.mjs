import { db } from './db.mjs';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const addUser = async (user) => {
    try {
        const command = new PutCommand({
            TableName: 'streaming-db',
            Item: user,
        });

        await db.send(command);

        return true;
    } catch (error) {
        throw createError(500, error.message);
    }
};

export const getUser = async (email) => {
    try {
        const command = new GetCommand({
            TableName: 'streaming-db',
            Key: {
                PK: `USER:${email}`,
                SK: `USER:${email}`,
            },
        });

        const { Item } = await db.send(command);

        return Item;
    } catch (error) {
        throw createError(500, error.message);
    }
};

export const addToWatchlist = async (watchlistItem) => {
    try {
        const command = new PutCommand({
            TableName: 'streaming-db',
            Item: watchlistItem,
        });

        await db.send(command);

        return true;
    } catch (error) {
        throw createError(500, error.message);
    }
};
