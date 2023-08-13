import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';

import { renderPage } from './page.js';

const output = new renderPage({
  hello: "world",
  easy: [1, 2, 3]
})

const result = output.html

// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  reply.type('text/html')
  return `<!doctype html><html>
    <head>
      <title>Lit SSR Demo</title>
      <meta charset="utf8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        h1 {
          font-weight: 900;
        }
      </style>
      ${output.js.toString()}
    </head>

    <body>
      <h1>Welcome to Fastify & Lit SSR!</h1>
      <hr />
      ${result}
    </body>
  </html>`
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}