import { LitElement, html, css } from "lit"

export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: .5rem 1rem;
      border: 3px double orange;
    }

    h2 {
      color: maroon;
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
