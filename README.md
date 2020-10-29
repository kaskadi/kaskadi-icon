![](https://img.shields.io/github/package-json/v/kaskadi/kaskadi-icon)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/kaskadi-icon?color=blue)

[![](https://img.shields.io/badge/live-example-orange)](https://cdn.klimapartner.net/modules/%40kaskadi/kaskadi-icon/example/index.html)

**GitHub Actions workflows status**

[![Build status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/build?label=build&logo=mocha)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Abuild)
[![BuildFF status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/build-on-firefox?label=firefox&logo=Mozilla%20Firefox&logoColor=white)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Abuild-on-firefox)
[![BuildChrome status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/build-on-chrome?label=chrome&logo=Google%20Chrome&logoColor=white)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Abuild-on-chrome)
[![Publish status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/publish?label=publish&logo=Amazon%20AWS)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Apublish)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/kaskadi-icon/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/kaskadi-icon/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/kaskadi-icon?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-icon)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/kaskadi-icon?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-icon)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/kaskadi-icon?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/kaskadi-icon)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/kaskadi-icon?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/kaskadi-icon/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# Usage instructions

In another element:
```js
// using the latest version
import 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-icon/kaskadi-icon.js'
// using a specific version
import 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-icon/release/v1.0.0/kaskadi-icon.js'
```

In the browser:
```html
<!-- using the latest version -->
<script type="module" src="https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-icon/kaskadi-icon.js"></script>
<!-- using a specific version -->
<script type="module" src="https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-icon/release/v1.0.0/kaskadi-icon.js"></script>
```

# Custom element documentation

## kaskadi-icon

Element serving as an icon loader.

For now this only saves space in the layout for the icon to be loaded. **Warning:** on first load it will not actually save space in the layout since the Shadow DOM hasn't been attached to the element yet. But once the Shadow DOM is attached, while the image is loading, the space will be preserved in the layout.

This element inherits properties from a base class `KaskadiElement`. To see which properties are available, please refer to [`KaskadiElement` documentation].


| Param | Type | Description |
| --- | --- | --- |
| \[icon\] | `string` | URL to an icon you would like to load. If the URL is invalid or if it is ommited, it will be defaulted to a placeholder icon. You can change this attribute on the fly and the element will reload the newly provided icon. |
| oniconload | `Event` | once the icon is loaded an `icon-load` event will be fired that you can refere to (via `@icon-load` for example). This event contains in its `detail` field an object containing a `src` field which provides the source used for the icon loaded. |

**Example**  
```html
<!-- This will load a placeholder icon -->
<kaskadi-icon></kaskadi-icon>
<kaskadi-icon icon="abc"></kaskadi-icon>
<!-- This will load the provided icon -->
<kaskadi-icon icon="https://img.icons8.com/material/4ac144/256/user-male.png"></kaskadi-icon>
```
<!-- LINKS -->

[`KaskadiElement` documentation]:https://github.com/kaskadi/kaskadi-element

## Custom styles

The following custom CSS properties are available for this element:

- `--icon-width);
        height: var(--icon-height);
      }
      .hidden {
        display: none;
      }
      .tooltip {
        position: absolute;
        top: calc(var(--icon-height) - 10px);
        left: calc(var(--icon-width) - 5px);
        font-size: min(calc(0.5 * var(--icon-height))`
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->