# Outdated experiment

[**Use Bun's official custom AWS Lambda runtime layer**](https://github.com/oven-sh/bun/tree/main/packages/bun-lambda)

This repository is an outdated experiment superceded by https://github.com/oven-sh/bun/tree/main/packages/bun-lambda.

----

# Original readme

This is a hacky attempt to get Bun to run on AWS Lambda. Don't know yet if it will be officially supported in the future. I'm just trying things.

[./lambda.ts](./lambda.ts) has the code necessary to respond to incoming requests in an AWS Lambda instance.

[./function.js](./function.js) runs the user's code. It is expected that the user's code `export default` a `fetch` function like so:

```js
export default {
  fetch(req) {
    return new Response("my response");
  },
};
```

In releases, you'll find a fully static build of Bun for Linux x64. This works around gnu libc incompatibilities with Lambda, but it statically links glibc which is a big no-no for several reasons (DNS resolution may not work, for example). That's what makes this, at the very best, a proof of concept and not something that should be used in production.

To deploy, zip up this folder along with the special bun binary and upload it to Lambda.

```bash
aws lambda create-function \
            --zip-file fileb://deployment.zip --handler function.handler --runtime provided \
            --role $MY_ARN_ROLE \
            --function-name $MY_FUNCTION_NAME
```
