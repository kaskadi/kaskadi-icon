/* eslint-env browser, mocha */
import { until } from 'https://cdn.klimapartner.net/modules/lit-html/directives/until.js'
import { KaskadiElement, css, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

// Important: it does not seem to be possible to save space for the icon in the layout while waiting for kaskadi-icon to render. We are able to make sure that the space is preserved while loading the icon (by using #wrapper fixed width and height). But when kaskadi-icon is mounted in the DOM it first takes styling from its parent meaning that its content box starts as auto x auto (no shadow DOM yet = no content to fit to so we are 0 x 0 in reality). It only then switches to whatever style we gave him as soon as the shadow DOM is mounted below kaskadi-icon.

/**
 * Element serving as an icon loader.
 *
 * For now this only saves space in the layout for the icon to be loaded. **Warning:** on first load it will not actually save space in the layout since the Shadow DOM hasn't been attached to the element yet. But once the Shadow DOM is attached, while the image is loading, the space will be preserved in the layout.
 *
 * This element inherits properties from a base class `KaskadiElement`. To see which properties are available, please refer to [`KaskadiElement` documentation](https://github.com/kaskadi/kaskadi-element).
 *
 * @module kaskadi-icon
 *
 * @param {string} [icon] - URL to an icon you would like to load. If the URL is invalid or if it is ommited, it will be defaulted to a placeholder icon. You can change this attribute on the fly and the element will reload the newly provided icon.
 * @param {Event} oniconload - once the icon is loaded an `icon-load` event will be fired that you can refere to (via `@icon-load` for example). This event contains in its `detail` field an object containing a `src` field which provides the source used for the icon loaded.
 *
 * @example
 *
 * <!-- This will load a placeholder icon -->
 * <kaskadi-icon></kaskadi-icon>
 * <kaskadi-icon icon="abc"></kaskadi-icon>
 * <!-- This will load the provided icon -->
 * <kaskadi-icon icon="https://img.icons8.com/material/4ac144/256/user-male.png"></kaskadi-icon>
 */

class KaskadiIcon extends KaskadiElement {
  constructor () {
    super()
    this._defaultUrl = './icons/default.svg'
    this._icon = this._defaultUrl
  }

  static get properties () {
    return {
      icon: { type: String }
    }
  }

  // custom setter for the icon property which will transform the icon attribute into the default URL if the URL provided is invalid
  set icon (val) {
    const oldVal = this._icon
    if (!this._isUrl(val) && val !== this._defaultUrl) {
      console.warn('URL provided for icon is not a valid URL. Using default icon instead.')
      this._icon = this._defaultUrl
    } else {
      this._icon = val
    }
    if (oldVal !== this._icon) {
      this.icon = this._icon
      this.requestUpdate('icon', oldVal)
      this.updateComplete
        .then(() => {
          this._dispatchLoad()
        })
    }
  }

  // custom getter simply returning a private _icon property
  get icon () {
    return this._icon
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

  _dispatchLoad () {
    const ev = new CustomEvent('icon-load', {
      detail: {
        src: this._icon
      }
    })
    this.dispatchEvent(ev)
  }

  _loadIcon () {
    this._iconContent = fetch(this.icon)
      .then(res => res.blob())
      .then(data => URL.createObjectURL(data))
      .then(src => html`<img id="icon" src="${src}">`)
  }

  static get styles () {
    return css`
      :host{
        display: inline-block;
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
    this._loadIcon()
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
