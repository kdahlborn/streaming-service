import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { getSeries } from '../../../services/series.mjs';

export const handler = middy(async (event) => {
    const { seriesId } = event.pathParameters;

    const series = await getSeries(seriesId);

    if (series) {
        return sendResponse(200, { series });
    } else {
        return sendResponse(404, { message: 'Series not found' });
    }
}).use(httpErrorHandler());
