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

export function renderPage({ hello, easy }) {
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
      <my-element hello=${hello} easy=${easy}>Boom done.</my-element>
      <my-element hello="folks" easy=${[4, 5, 6]}>Boom done.</my-element>
    </main>
  `

  return [result.head, result.body]
}
