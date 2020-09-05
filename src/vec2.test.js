
const Vec2 = require('./vec2');

describe('Vec2', () => {
    it('can equal another vector', () => {
        expect(new Vec2(2, 2)).toStrictEqual(new Vec2(2, 2))
    })
})