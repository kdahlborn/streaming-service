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

// Add new episode
export const addNewEpisode = async (episode) => {
    try {
        const command = new PutCommand({
            TableName: 'streaming-db',
            Item: episode,
        });

        await db.send(command);

        return true;
    } catch (error) {
        throw createError(500, error.message);
    }
};

// Update episode
export const updateEpisode = async (seriesId, season, episode, updates) => {
    try {
        const updateExpressions = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (updates.title !== undefined) {
            updateExpressions.push('#title = :title');
            expressionAttributeNames['#title'] = 'title';
            expressionAttributeValues[':title'] = updates.title;
        }

        if (updates.duration !== undefined) {
            updateExpressions.push('#duration = :duration');
            expressionAttributeNames['#duration'] = 'duration';
            expressionAttributeValues[':duration'] = updates.duration;
        }

        const command = new UpdateCommand({
            TableName: 'streaming-db',
            Key: {
                PK: `SERIES:${seriesId}`,
                SK: `SEASON:${season}#EPISODE:${episode}`,
            },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        });

        const { Attributes } = await db.send(command);

        return Attributes;
    } catch (error) {
        throw createError(500, error.message);
    }
};
