import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { deleteEpisode } from '../../../services/episodes.mjs';

export const handler = middy(async (event) => {
    const { seriesId, season, episode } = event.pathParameters;

    await deleteEpisode(seriesId, season, episode);

    return sendResponse(200, { message: 'Episode deleted' });
}).use(httpErrorHandler());
