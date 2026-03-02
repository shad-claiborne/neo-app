import { Hono, MiddlewareHandler } from "hono";
import { except } from "hono/combine";
import { addIdentity, checkIdentity, handleAuth, receiveAuth } from '@shad-claiborne/hono-middleware-oidc';

const app = new Hono<{ Bindings: Env }>();

/**
 * addOrigin
 * @param c 
 * @param next 
 */
const addOrigin: MiddlewareHandler = async (c, next) => {
    const appUrl = new URL('/', c.req.url);
    c.set('originUrl', appUrl.toString());
    await next();
};

app.use('*', except('/auth/callback', addIdentity));
app.use('*', except(['/login', '/auth/callback'], checkIdentity));
app.use('/auth/callback', receiveAuth);
app.use('/login', addOrigin, handleAuth);

app.get('/async/id', async (c) => {
    return c.json(c.get('identity'));
});

export default app;
