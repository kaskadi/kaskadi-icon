/* eslint-env browser, mocha */
import '../kaskadi-icon.js'
var fetch = mockFetch
var elem
describe('kaskadi-icon', () => {
  before(async () => {
    elem = document.createElement('kaskadi-icon')
    document.body.appendChild(elem)
    await elem.updateComplete
    fetch()
  })
  it('should render the string "Hello World"', (done) => {
    var cs = getComputedStyle(elem.shadowRoot.querySelector('div'))
    cs.width.should.equal('24px')
    elem.icon = 'http://cdn.klimapartner.de/imgs/icons/kaskadi-logo.svg'
    var cs2 = getComputedStyle(elem.shadowRoot.querySelector('div'))
    cs2.width.should.equal('24px')
    setTimeout(done, 1000)
  })
})

function mockFetch (path) {
  return new Promise((resolve, reject) => {
    return {
      text: () => {
        return new Promise((resolve, reject) => {
          resolve('<svg></svg>')
        })
      }
    }
  })
}
