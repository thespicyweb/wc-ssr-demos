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
  `
}
