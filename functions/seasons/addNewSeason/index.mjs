import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { createSeasonSchema } from '../../../models/seasonModels.mjs';
import { createSeason } from '../../../utils/season.mjs';
import { addNewSeason } from '../../../services/seasons.mjs';

export const handler = middy(async (event) => {
    const { seriesId } = event.pathParameters;
    const { seasonNumber } = event.body;

    const season = createSeason(seriesId, seasonNumber);

    await addNewSeason(season);

    return sendResponse(201, { message: 'Season added!', season });
})
    .use(httpJsonBodyParser())
    .use(validateBody(createSeasonSchema))
    .use(httpErrorHandler());
