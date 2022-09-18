export default {
  async fetch(req) {
    if ((parseInt(req.headers.get("Content-Length") || "0") || 0) > 0) {
      const body = await req.text();
      return new Response(body, {
        headers: {
          ...Object.fromEntries(req.headers.entries()),
          "content-type": req.headers.get("Content-Type") || "text/plain",
        },
      });
    }

    return new Response("Hello World", {
      headers: {
        "content-type": "text/plain",
      },
    });
  },
};
