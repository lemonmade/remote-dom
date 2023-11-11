import type {R2Bucket} from '@cloudflare/workers-types';

interface Env {
  readonly RUN_ASSETS: R2Bucket;
}

export default {fetch: handleRequest};

async function handleRequest(request: Request, env: Env) {
  const url = new URL(request.url);

  const object = await env.RUN_ASSETS.get(url.pathname.slice(1));

  if (object?.body == null) {
    return new Response(null, {status: 404});
  }

  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Timing-Allow-Origin': '*',
  });
  object.writeHttpMetadata(headers as any);
  headers.set('etag', object.httpEtag);

  return new Response(object.body as any, {
    headers,
  });
}
