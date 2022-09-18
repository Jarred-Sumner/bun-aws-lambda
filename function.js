export default {
  fetch(req) {
    return new Response("Hello world!: " + req.url);
  },
};
