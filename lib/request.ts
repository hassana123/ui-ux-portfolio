/** Reject browser cross-origin writes. Non-browser clients still require owner auth. */
export function sameOrigin(request:Request){const origin=request.headers.get('origin');if(!origin)return true;const configured=process.env.NEXT_PUBLIC_SITE_URL;return origin===new URL(request.url).origin||Boolean(configured&&origin===new URL(configured).origin);}
