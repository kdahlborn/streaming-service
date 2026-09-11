import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { validateBody } from '../../../middlewares/validation.mjs';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { registerSchema } from '../../../models/userModels.mjs';
import { addUser, getUser } from '../../../services/users.mjs';
import { createUser } from '../../../utils/user.mjs';

export const handler = middy(async (event) => {
    const userExists = await getUser(event.body.email);

    if (userExists) {
        return sendResponse(409, { message: 'User already exists' });
    }

    const user = await createUser(event.body);

    await addUser(user);

    return sendResponse(201, { message: 'User registered!' });
})
    .use(httpJsonBodyParser())
    .use(validateBody(registerSchema))
    .use(httpErrorHandler());
