import MyElement from './my-element.js'
import SDom from "./s-dom.js"
import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'

const html = enhance({
  elements: {
    'my-element': MyElement,
    's-dom': SDom
  },
  styleTransforms: [styleTransform],
  separateContent: true
})

const data = {
  hello: "world",
  easy: [1, 2, 3]
}

const result = html`
  <style>
    my-element {
      background: lightyellow;
    }

    main {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-block: 3rem;
    }
  </style>

  <main>
    <my-element hello=${data.hello} easy=${data.easy}>Boom done.</my-element>
    <my-element hello="folks" easy=${[4, 5, 6]}>Boom done.</my-element>
  </main>
`

const htmlHead = result.head
const htmlBody = result.body

// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  reply.type('text/html')
  return `<!doctype html>
  <html>
    <head>
      <title>Enhance SSR Demo</title>
      <meta charset="utf8" />
      <style>
        body {
          font-family: -apple-system, sans-serif;
        }

        h1 {
          font-weight: 900;
        }
      </style>
      ${htmlHead}
    </head>

    <body>
      <h1>Welcome to Fastify & Enhance SSR!</h1>
      <hr />
      ${htmlBody}
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