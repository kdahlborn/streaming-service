import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { createSeriesSchema } from '../../../models/seriesModels.mjs';
import { createSeries } from '../../../utils/series.mjs';
import { addNewSeries } from '../../../services/series.mjs';

export const handler = middy(async (event) => {
    const series = createSeries(event.body);

    await addNewSeries(series);

    return sendResponse(201, { message: 'Series added!', series });
})
    .use(httpJsonBodyParser())
    .use(validateBody(createSeriesSchema))
    .use(httpErrorHandler());
