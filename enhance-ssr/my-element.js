export default function MyElement({ html, state }) {
  const { attrs } = state
  const { hello='?', easy=[] } = attrs
  return html`
    <style>
      :host {
        border: 3px double green;
      }
      h2 {
        color: red;
      }
    </style>

    <h2>Hello ${hello}!</h2>

    <p>Easy as ${easy.join(", ")}. <slot></slot></p>

    <s-dom name=${hello}><strong slot="hello">Shadow DOM</strong></s-dom>
  `
}
