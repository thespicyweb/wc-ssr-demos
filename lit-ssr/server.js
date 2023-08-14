import { renderPage } from "./page.js"

const data = {
  hello: "world",
  easy: [1, 2, 3]
}

const [htmlOutput, jsOutput] = await renderPage(data)

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
      ${jsOutput}
    </head>

    <body>
      <h1>Welcome to Fastify & Lit SSR!</h1>
      <hr />
      ${htmlOutput}
      <script>
        // Declarative Shadow DOM (DSD) polyfill
        ;(function attachShadowRoots(root) {
          root.querySelectorAll("template[shadowrootmode]").forEach(template => {
            const mode = template.getAttribute("shadowrootmode");
            const shadowRoot = template.parentNode.attachShadow({ mode });
            shadowRoot.appendChild(template.content);
            template.remove();
            attachShadowRoots(shadowRoot);
          });
        })(document);
      </script>
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