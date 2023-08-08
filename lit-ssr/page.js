import { render } from '@lit-labs/ssr';
import { html } from 'lit';
import { MyElement } from "./my-element.js"
import { SDom } from "./s-dom.js"

export function* renderPage({ hello, easy }) {
  yield* render(html`
    <style>
      my-element {
        display: block;
        padding: .5rem;
        margin-block: 1rem;
        background: lightyellow;
      }
    </style>

    <my-element hello=${hello} .easy=${easy}>Boom done.</my-element>
    <my-element hello="folks" .easy=${[4, 5, 6]}>Boom done.</my-element>
  `);
}
