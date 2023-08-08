import { render } from '@lit-labs/ssr';
import { html } from 'lit';
import { MyElement } from "./my-element.js"
import { SDom } from "./s-dom.js"

export function renderPage({ hello, easy }) {
  return {
    html: [...render(html`
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
    `)].join(""),
    js: [...render(SDom.clientComponent)].join("")
  }
}
