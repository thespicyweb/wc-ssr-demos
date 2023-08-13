import fs from "fs/promises"
import { WebC } from "@11ty/webc"

let page = new WebC();

page.defineComponents("./webc-ssr/components/*.webc")
page.setInputPath("./webc-ssr/page.webc")
page.setBundlerMode(true)

page.setHelper("readStyles", async (fileName) => {
	return (await fs.readFile(fileName)).toString()
});

let output = await page.compile({
  data: {
    hello: "world",
    easy: [1, 2, 3]
  }
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
      <title>WebC SSR Demo</title>
      <meta charset="utf8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        h1 {
          font-weight: 900;
        }

        ${output.css.join("")}
      </style>
      <script type="module">
        ${output.js.join("")}
      </script>
    </head>

    <body>
      <h1>Welcome to Fastify & WebC SSR!</h1>
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