/* eslint-env browser, mocha */
import '../kaskadi-icon.js'

describe('kaskadi-icon', function () {
  it('should emit an event when done loading which payload contains the src of the icon', async () => {
    const loadTests = (e) => { e.detail.should.have.property('src') }
    await mountComponent({ loadTests }).then(unmountComponent)
  })
  it('should render a placeholder image if no icon is specified', async () => {
    const loadTests = (e) => { e.detail.src.should.equal('./icons/default.svg') }
    mountComponent({ loadTests }).then(unmountComponent)
  })
  it('should render a placeholder image if the specified icon is an invalid URL', async () => {
    const loadTests = (e) => { e.detail.src.should.equal('./icons/default.svg') }
    const attributes = { icon: 'abc' }
    await mountComponent({ loadTests, attributes }).then(unmountComponent)
  })
  it('should render an image if the specified icon is a valid URL', async () => {
    const url = 'https://img.icons8.com/material/4ac144/256/user-male.png'
    const loadTests = (e) => { e.detail.src.should.equal(url) }
    const attributes = { icon: url }
    await mountComponent({ loadTests, attributes }).then(unmountComponent)
  })
  it('should render every image when passing multiple images in a row', async () => {
    let url = 'https://img.icons8.com/material/4ac144/256/user-male.png'
    const loadTests = (e) => { e.detail.src.should.equal(url) }
    await mountComponent({ loadTests, attributes: { icon: url } })
      .then((elem) => {
        url = 'https://cdn.onlinewebfonts.com/svg/img_148071.png'
        setAttributes(elem, { icon: url })
        return elem
      })
      .then(unmountComponent)
  })
})

function setAttributes (elem, attributes) {
  for (const attribute in attributes) {
    elem.setAttribute(attribute, attributes[attribute])
  }
}

function mountComponent (opts = {}) {
  const defaultOpts = {
    tests: (elem) => {},
    loadTests: (e) => {},
    attributes: {}
  }
  opts = { ...defaultOpts, ...opts }
  const { tests, loadTests, attributes } = opts
  const elem = document.createElement('kaskadi-icon')
  tests(elem)
  elem.addEventListener('icon-load', loadTests)
  setAttributes(elem, attributes)
  document.body.appendChild(elem)
  return elem.updateComplete
    .then(() => elem)
}

function unmountComponent (elem) {
  document.body.removeChild(elem)
  return elem.updateComplete
}
