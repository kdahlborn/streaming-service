import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { validateBody } from '../../../middlewares/validation.mjs';
import { createEpisodeSchema } from '../../../models/episodeModels.mjs';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { addNewEpisode } from '../../../services/episodes.mjs';
import { createEpisode } from '../../../utils/episode.mjs';

export const handler = middy(async (event) => {
    const { seriesId, season } = event.pathParameters;

    const episode = createEpisode(seriesId, season, event.body);

    await addNewEpisode(episode);

    return sendResponse(201, { message: 'Episode added!', episode });
})
    .use(httpJsonBodyParser())
    .use(validateBody(createEpisodeSchema))
    .use(httpErrorHandler());
