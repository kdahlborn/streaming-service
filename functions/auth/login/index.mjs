import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { validateBody } from '../../../middlewares/validation.mjs';
import { loginSchema } from '../../../models/userModels.mjs';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { getUser } from '../../../services/users.mjs';
import { comparePassword } from '../../../utils/bcrypt.mjs';
import { signToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
    const { email, password } = event.body;

    const user = await getUser(email);

    if (!user || !(await comparePassword(password, user.password))) {
        return sendResponse(400, {
            message: 'Invalid username and/or password',
        });
    }

    return sendResponse(200, {
        message: 'User logged in!',
        token: signToken({
            userId: user.email,
            username: user.username,
        }),
    });
})
    .use(httpJsonBodyParser())
    .use(validateBody(loginSchema))
    .use(httpErrorHandler());
