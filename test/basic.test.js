/* eslint-env browser, mocha */
import '../kaskadi-icon.js'

describe('kaskadi-icon', function () {
  it('should emit an event when done loading which payload contains the src of the icon', async () => {
    const loadTests = (e) => {
      const detail = e.detail
      detail.should.not.equal(null)
      const type = typeof detail
      type.should.equal('string')
    }
    await mountComponent({ loadTests }).then(unmountComponent)
  })
  it('should allow users to provide a custom icon width and height', async () => {
    const attributes = { style: '--icon-width: 64px; --icon-height: 64px;' }
    const loadTests = async (e) => {
      const cs = window.getComputedStyle(e.target.querySelector('#icon'))
      cs.getPropertyValue('width').should.equal('64px')
      cs.getPropertyValue('height').should.equal('64px')
    }
    await mountComponent({ loadTests, attributes }).then(unmountComponent)
  })
  it('should render a placeholder image if no icon is specified', async () => {
    const loadTests = (e) => { e.detail.should.equal('./icons/default.svg') }
    mountComponent({ loadTests }).then(unmountComponent)
  })
  it('should render a placeholder image if the specified icon is an invalid URL', async () => {
    const loadTests = (e) => { e.detail.should.equal('./icons/default.svg') }
    const attributes = { icon: 'abc' }
    await mountComponent({ loadTests, attributes }).then(unmountComponent)
  })
  it('should render an image if the specified icon is a valid URL', async () => {
    const url = 'https://img.icons8.com/material/4ac144/256/user-male.png'
    const loadTests = (e) => { e.detail.should.equal(url) }
    const attributes = { icon: url }
    await mountComponent({ loadTests, attributes }).then(unmountComponent)
  })
  it('should render every image when passing multiple valid images in a row', async () => {
    let url = 'https://img.icons8.com/material/4ac144/256/user-male.png'
    const loadTests = (e) => { e.detail.should.equal(url) }
    await mountComponent({
      loadTests,
      attributes: { icon: url }
    })
      .then((elem) => {
        url = 'https://cdn.onlinewebfonts.com/svg/img_148071.png'
        setAttributes(elem, { icon: url })
        return elem
      })
      .then(unmountComponent)
  })
  it('should render the proper images when passed a serie of valid and invalid URL', async () => {
    let url = 'https://img.icons8.com/material/4ac144/256/user-male.png'
    const loadTests = (e) => { e.detail.should.equal(url) }
    await mountComponent({
      loadTests,
      attributes: { icon: url }
    })
      .then((elem) => {
        url = './icons/default.svg'
        setAttributes(elem, { icon: 'abc' })
        return elem
      })
      .then(unmountComponent)
  })
  it('should only render once when using multiple time the same icon', async () => {
    let url = 'abc'
    let calls = 0
    const loadTests = (e) => { calls++ }
    await mountComponent({
      loadTests,
      attributes: { icon: url }
    })
      .then(async (elem) => {
        url = 'lmn'
        setAttributes(elem, { icon: url })
        await elem.updateComplete
        calls.should.equal(1)
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
  elem.addEventListener('load', loadTests)
  setAttributes(elem, attributes)
  document.body.appendChild(elem)
  return elem.updateComplete
    .then(() => elem)
}

function unmountComponent (elem) {
  document.body.removeChild(elem)
  return elem.updateComplete
}
