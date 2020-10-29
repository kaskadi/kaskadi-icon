/* eslint-env browser, mocha */
import { until } from 'https://cdn.klimapartner.net/modules/lit-html/directives/until.js'
import { KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

// Important: it does not seem to be possible to save space for the icon in the layout while waiting for kaskadi-icon to render. We are able to make sure that the space is preserved while loading the icon (by using #wrapper fixed width and height). But when kaskadi-icon is mounted in the DOM it first takes styling from its parent meaning that its content box starts as auto x auto (no shadow DOM yet = no content to fit to so we are 0 x 0 in reality). It only then switches to whatever style we gave him as soon as the shadow DOM is mounted below kaskadi-icon.

class KaskadiIcon extends KaskadiElement {
  constructor () {
    super()
    this._defaultUrl = './icons/default.svg'
    this.icon = this._defaultUrl
  }

  static get properties () {
    return {
      icon: { type: String },
      _iconContent: { attribute: false } // we use this as internal to rerender when _iconContent gets assigned to the fetch promise
    }
  }

  _isUrl (str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$' // fragment locator
    , 'i')
    return !!pattern.test(str)
  }

  async firstUpdated () {
    if (!this._isUrl(this.icon) && this.icon !== this._defaultUrl) {
      this.icon = this._defaultUrl
      console.warn('URL provided for icon is not a valid URL. Using default icon instead.')
    }
    this._iconContent = await fetch(this.icon)
      .then(res => res.blob())
      .then(data => URL.createObjectURL(data))
      .then(src => html`<img id="icon" src="${src}">`)
    this.updateComplete
      .then(() => {
        const ev = new CustomEvent('load', { detail: true })
        this.dispatchEvent(ev)
      })
  }

  static get styles () {
    return css`
      :host{
        display: block;
        --icon-width: 24px;
        --icon-height: 24px;
      }
      #icon, #wrapper {
        width: var(--icon-width);
        height: var(--icon-height);
      }
      .hidden {
        display: none;
      }
      .tooltip {
        position: absolute;
        top: calc(var(--icon-height) - 10px);
        left: calc(var(--icon-width) - 5px);
        font-size: min(calc(0.5 * var(--icon-height)), 16px);
        padding: 5px;
        border-radius: 5px;
        background-color: #DDD;
      }
      #wrapper:hover .tooltip {
        display: block;
      }
    `
  }

  render () {
    return html`
    <div id="wrapper">
      ${until(this._iconContent)}
      <div id="credits" class="hidden ${this.icon === this._defaultUrl ? 'tooltip' : ''}">
        Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
      </div>
    </div>
    `
  }
}

customElements.define('kaskadi-icon', KaskadiIcon)
