import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { getUser } from '../../../services/users.mjs';

export const handler = middy(async (event) => {
    const { PK, SK, password, ...user } = await getUser(event.user.userId);

    return sendResponse(200, { user });
})
    .use(authenticateUser())
    .use(httpErrorHandler());
