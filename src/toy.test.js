
const Victor = require('victor');
const toy = require('./toy')

describe('apply_force', () => {
    it('modifies a legacy ball\'s running tally of "force"', () => {
        let a_ball = new toy.ball(null, 0, 0)
        a_ball.fx = 3
        a_ball.fy = 4
        toy.apply_force(new Victor(100, 200), a_ball)
        expect(a_ball.fx).toEqual(103)
        expect(a_ball.fy).toEqual(204)
    })
})

describe('dimensions_to_vec', () => {
    it('produces the Victor accurately', () => {
        const sample = {width: 1, height: 2}
        const actual = toy.dimensions_to_vec(sample)
        expect(actual).toEqual(new Victor(1, 2))
    })
})

describe('wall_force', () => {
    it('does not give it a force if it\'s in bounds', () => {
        toy.wall_force(
            new toy.ball(null, 0, 0),
            {width: 200, height: 200})
    })
})