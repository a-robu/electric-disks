
describe('Electric Disks', () => {
  beforeAll(async () => {
    errors = []
    // TODO refactor this JS error checking functionality out of
    // this test so that it itself can be tested in another test.
    page.on('pageerror', err => errors.push(err))
    await page.goto('http://localhost:5000/electric-disks')
  })
  it('does not show JS errors after page load', async () => {
    expect(errors).toEqual([])
  })
})
