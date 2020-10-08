// import 'expect-puppeteer'

describe('Electric Disks', () => {
  beforeAll(async () => {
    errors = []
    page.on('pageerror', err => errors.push(err))
    await page.goto('http://localhost:5000/placeholder-path')
  })

  it('does not show JS errors after page load', async () => {
    expect(errors).toEqual([])
  })
})
