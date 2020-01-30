/* eslint-env browser, mocha */
// import { css, html } from 'https://cdn.klimapartner.net/modules/lit-element/lit-element.js'
import { lang, translate, KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

class KaskadiIcon extends KaskadiElement {
  constructor () {
    super()
    const phrase = {
      en: 'Hello World!',
      de: 'Hallo Welt!',
      fr: 'bonjour monde!'
    }
    this.phrase = lang`${phrase}`
    this.lang = 'en'
  }

  static get styles () {
    return css`
      :host{
        display: inline-block;
      }
      div{color: red}
    `
  }

  static get properties () {
    return {
      phrase: { type: String },
      lang: { type: String }
    }
  }

  render () {
    // bla
    const iconToLoad = this.icon.includes('/') ? this.icon : `./icons/basic/${this.icon}.svg`
    const iconContent = fetch(iconToLoad).then(x => x.text()).then(x => unsafeHTML(x))
    return html`<div id="icon">
      ${until(iconContent, html`<div id="placeholder"></div>`)}
    </div>
    `
  }
}
customElements.define('kaskadi-icon', KaskadiIcon)
