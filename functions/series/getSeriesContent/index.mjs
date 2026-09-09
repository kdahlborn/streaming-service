import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { getSeriesContent } from '../../../services/series.mjs';

export const handler = middy(async (event) => {
    const { seriesId } = event.pathParameters;

    const content = await getSeriesContent(seriesId);

    return sendResponse(200, { content });
}).use(httpErrorHandler());
