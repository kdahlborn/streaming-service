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

// Get series
export const getSeries = async (seriesId) => {
    try {
        const command = new GetCommand({
            TableName: 'streaming-db',
            Key: {
                PK: `SERIES:${seriesId}`,
                SK: `SERIES:${seriesId}`,
            },
        });

        const { Item } = await db.send(command);

        return Item;
    } catch (error) {
        throw createError(500, error.message);
    }
};

// Get episodes
export const getEpisodes = async (seriesId, season) => {
    try {
        const command = new QueryCommand({
            TableName: 'streaming-db',
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': `SERIES:${seriesId}`,
                ':sk': `SEASON:${season}#EPISODE:`,
            },
        });

        const { Items } = await db.send(command);

        return Items;
    } catch (error) {
        throw createError(500, error.message);
    }
};

// Get series content
export const getSeriesContent = async (seriesId) => {
    try {
        const command = new QueryCommand({
            TableName: 'streaming-db',
            KeyConditionExpression: 'PK = :pk',
            ExpressionAttributeValues: {
                ':pk': `SERIES:${seriesId}`,
            },
        });

        const { Items } = await db.send(command);

        return Items;
    } catch (error) {
        throw createError(500, error.message);
    }
};
