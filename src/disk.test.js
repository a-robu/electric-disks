
const Victor = require('victor');
const Disk = require('./disk');

describe('Disk', () => {
    const sample_disk = new Disk(
        new Victor(0, 1),
        new Victor(2, 3),
        4,
        5
    )
    it('can be converted to legacy and back', () => {
        expect(sample_disk).toStrictEqual(
            Disk.from_legacy(sample_disk.to_legacy())
        )
    })
})
