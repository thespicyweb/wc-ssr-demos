// Set up FAST SSR
import "@microsoft/fast-ssr/install-dom-shim";
import { html } from "@microsoft/fast-element"
import fastSSR from "@microsoft/fast-ssr";

const { templateRenderer, defaultRenderInfo } = fastSSR();

// BROKEN:
/*
file:///Users/jared/apps/THESPICYWEB/wc-ssr-demos/node_modules/@microsoft/fast-ssr/dist/esm/template-parser/template-parser.js:5
import { Aspect, Compiler, Parser, } from "@microsoft/fast-element";
         ^^^^^^
SyntaxError: The requested module '@microsoft/fast-element' does not provide an export named 'Aspect'
    at ModuleJob._instantiate (node:internal/modules/esm/module_job:122:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:188:5)
    at async DefaultModuleLoader.import (node:internal/modules/esm/loader:228:24)
    at async loadESM (node:internal/process/esm_loader:40:7)
    at async handleMainPromise (node:internal/modules/run_main:66:12)
*/
const result = templateRenderer.render(html`
  <my-element hello="${world}"></my-element>
`, defaultRenderInfo, { world: "World" });

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
      <title>FAST SSR Demo</title>
      <meta charset="utf8" />
    </head>

    <body>
      <p>Welcome to Fastify & FAST SSR!</p>
      <hr />
      ${[...result]}
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