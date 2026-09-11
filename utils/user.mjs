import { hashPassword } from './bcrypt.mjs';

export const createUser = async (body) => {
    return {
        PK: `USER:${body.email}`,
        SK: `USER:${body.email}`,
        type: 'user',
        username: body.username,
        email: body.email,
        password: await hashPassword(body.password),
        createdAt: new Date().toISOString(),
    };
};

export const createWatchlistItem = (userId, seriesId, series) => {
    return {
        PK: `USER:${userId}`,
        SK: `WATCHLIST:SERIES:${seriesId}`,
        type: 'watchlist',
        title: series.title,
    };
};
