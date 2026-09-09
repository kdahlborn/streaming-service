import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';

export const handler = middy(async (event) => {
    return sendResponse(200, { message: 'Hallå där' });
}).use(httpErrorHandler());
