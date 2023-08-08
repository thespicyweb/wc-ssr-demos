import MyElement from './my-element.js'
import SDom from "./s-dom.js"
import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'

const html = enhance({
  elements: {
    'my-element': MyElement,
    's-dom': SDom
  },
  styleTransforms: [styleTransform]
})

const result = html`
  <style>
    my-element {
      display: block;
      padding: .5rem;
      margin-block: 1rem;
      background: lightyellow;
    }
  </style>

  <my-element hello=${"world"} easy=${[1, 2, 3]}>Boom done.</my-element>
  <my-element hello="folks" easy=${[4, 5, 6]}>Boom done.</my-element>
`

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
      <title>Enhance SSR Demo</title>
      <meta charset="utf8" />
    </head>

    <body>
      <h1>Welcome to Fastify & Enhance SSR!</h1>
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