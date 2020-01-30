/* eslint-env browser, mocha */
// import { css, html } from 'https://cdn.klimapartner.net/modules/lit-element/lit-element.js'
import { until } from 'https://cdn.klimapartner.net/modules/lit-html/directives/until.js'
import { unsafeHTML } from 'https://cdn.klimapartner.net/modules/lit-html/directives/unsafe-html.js'
import { KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

class KaskadiIcon extends KaskadiElement {
  constructor () {
    super()
    this.icon = 'test'
  }

  static get styles () {
    return css`
      :host{
        display: inline-block;
      }
      #icon, #placeholder {width: var(--icon-width, 24px); height: var(--icon-height, 24px)}
    `
  }

  static get properties () {
    return {
      icon: { type: String },
      lang: { type: String }
    }
  }

  render () {
    const iconToLoad = this.icon.includes('/') ? this.icon : `./icons/basic/${this.icon}.svg`
    const iconContent = fetch(iconToLoad).then(x => x.text()).then(x => unsafeHTML(x))
    return html`<div id="icon">
      ${until(iconContent, html`<div id="placeholder"></div>`)}
    </div>
    `
  }
}
customElements.define('kaskadi-icon', KaskadiIcon)
