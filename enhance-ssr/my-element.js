export default function MyElement({ html, state }) {
  const { attrs } = state
  const { hello='?', easy=[] } = attrs
  return html`
    <style>
      :host {
        display: block;
        padding: .5rem 1rem;
        border: 3px double orange;
      }

      h2 {
        color: maroon;
      }
    </style>

    <h2>Hello ${hello}!</h2>

    <p>Easy as ${easy.join(", ")}. <slot></slot></p>

    <s-dom name=${hello}><strong slot="hello">Shadow DOM</strong></s-dom>
  `
}
