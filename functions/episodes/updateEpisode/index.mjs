import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { validateBody } from '../../../middlewares/validation.mjs';
import { updateEpisodeSchema } from '../../../models/episodeModels.mjs';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { updateEpisode } from '../../../services/episodes.mjs';

export const handler = middy(async (event) => {
    const { seriesId, season, episode } = event.pathParameters;
    const updates = event.body;

    const updatedEpisode = await updateEpisode(
        seriesId,
        season,
        episode,
        updates,
    );

    return sendResponse(200, {
        message: 'Episode updated!',
        episode: updatedEpisode,
    });
})
    .use(httpJsonBodyParser())
    .use(validateBody(updateEpisodeSchema))
    .use(httpErrorHandler());
