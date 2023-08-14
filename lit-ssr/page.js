import { render } from "@lit-labs/ssr"
import { collectResult } from "@lit-labs/ssr/lib/render-result.js"
import { html } from "lit"
import { MyElement } from "./my-element.js"
import { SDom } from "./s-dom.js"

export async function renderPage({ hello, easy }) {
  const htmlResult = await collectResult(render(html`
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
      <my-element hello=${hello} .easy=${easy}>Boom done.</my-element>
      <my-element hello="folks" .easy=${[4, 5, 6]}>Boom done.</my-element>
    </main>
  `))
  const jsResult = await collectResult(render(SDom.clientComponent))

  return [htmlResult, jsResult]
}
