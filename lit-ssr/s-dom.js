import fs from "fs/promises"

const sharedStyles = (await fs.readFile("lit-ssr/shared/styles.css")).toString()

import { LitElement, html, css, unsafeCSS } from "lit"

export class SDom extends LitElement {
  static styles = [
    unsafeCSS(sharedStyles),

    css`
      :host {
        color: rebeccapurple;
      }
    `
  ]

  static properties = {
    name: {}
  }

  static clientComponent = html`
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

  render() {
    return html`
      <p>
        <span class="big-font">Groovy stuff, <span>${this.name}</span>.
        <slot name="hello"></span> </span> is working!
      </p>
    `
  }
}

customElements.define("s-dom", SDom)
