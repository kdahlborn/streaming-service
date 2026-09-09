import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { getEpisodes } from '../../../services/series.mjs';

export const handler = middy(async (event) => {
    const { seriesId, season } = event.pathParameters;

    const episodes = await getEpisodes(seriesId, season);

    if (episodes) {
        return sendResponse(200, { episodes });
    } else {
        sendResponse(404, { message: 'Episodes not found' });
    }
}).use(httpErrorHandler());
