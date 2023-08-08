import { LitElement, html, css } from "lit"

export class MyElement extends LitElement {
  static styles = css`
    :host {
      border: 3px double green;
    }
    h2 {
      color: red;
    }
  `

  static properties = {
    hello: {},
    easy: { type: Array },
  }

  constructor() {
    super()
    this.hello = '?'
    this.easy = []
  }

  render() {
    return html`
      <h2>Hello ${this.hello}!</h2>

      <p>Easy as ${this.easy.join(", ")}. <slot></slot></p>

      <s-dom name=${this.hello}><strong slot="hello">Shadow DOM</strong></s-dom>
    `
  }
}

customElements.define('my-element', MyElement);
