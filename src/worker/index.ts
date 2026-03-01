import { Hono } from "hono";
import { except } from "hono/combine";
import { forAuthorization, withIdentity } from "@shad-claiborne/hono-middleware-oidc";

const app = new Hono<{ Bindings: Env }>();

app.use('*', except(['/login', '/oauth/callback'], withIdentity));

app.use('/oauth/callback', forAuthorization);

app.get('/login', async (c, next) => {
    const appUrl = new URL('/', c.req.url);
    c.set('originUrl', appUrl.toString());
    return await withIdentity(c, next);
});

app.get('/id', async (c) => c.json(c.get('identity')));

export default app;
