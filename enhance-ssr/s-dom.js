import fs from "fs/promises"

const sharedStyles = (await fs.readFile("enhance-ssr/shared/styles.css")).toString()

export default function SDom({ html, state }) {
  const { attrs } = state
  const { name='?' } = attrs
  return html`
    <template shadowrootmode="open">
      <style>
        ${sharedStyles}
      </style>
      <style>
        :host {
          color: rebeccapurple;
        }
      </style>

      <p><slot name="hello" class="big-font"></slot> is working!</p>
    </template>

    <span slot="hello">Groovy stuff, <span>${name}</span>. <slot name="hello">...</slot></span>

    <script type="module">
      class SDomElement extends HTMLElement {
        static {
          customElements.define("s-dom", this)
        }

        connectedCallback() {
          const para = this.shadowRoot.querySelector("p")
          para.style.border = "1px dashed gray"
          para.style.padding = "0.5em"
        }
      }
    </script>
  `
}
