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
