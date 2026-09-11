import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { addToWatchlistSchema } from '../../../models/userModels.mjs';
import { getSeries } from '../../../services/series.mjs';
import { createWatchlistItem } from '../../../utils/user.mjs';
import { addToWatchlist } from '../../../services/users.mjs';

export const handler = middy(async (event) => {
    const { seriesId } = event.body;
    const { userId } = event.user;

    const series = await getSeries(seriesId);

    if (!series) {
        return sendResponse(404, { message: 'Series not found' });
    }

    const watchlistItem = createWatchlistItem(userId, seriesId, series);

    await addToWatchlist(watchlistItem);

    return sendResponse(201, {
        message: `${watchlistItem.title} added to watchlist!`,
    });
})
    .use(httpJsonBodyParser())
    .use(authenticateUser())
    .use(validateBody(addToWatchlistSchema))
    .use(httpErrorHandler());
