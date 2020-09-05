
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
