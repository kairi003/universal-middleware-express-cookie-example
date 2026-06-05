# Express `res.cookie()` Example

This sample sets a cookie with Express `res.cookie()` before a universal response transformer runs.

## Run

```sh
npm install
npm run dev
```

Then inspect the response headers:

```sh
curl -i http://localhost:3000/
```

With the current adapter behavior, the same `Set-Cookie` header is returned twice:

```http
Set-Cookie: express-cookie-example=res-cookie; Max-Age=3600; Path=/; ...
Set-Cookie: express-cookie-example=res-cookie; Max-Age=3600; Path=/; ...
```

## What It Shows

- Express `res.cookie()` writes `Set-Cookie` to the Node.js response.
- `createMiddleware` registers a universal response transformer after that cookie has been set.
- This matches the kind of setup where duplicated `Set-Cookie` headers can appear.
