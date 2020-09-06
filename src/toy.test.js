
const Victor = require('@a-robu/victor');
const Disk = require('./disk');
const {
    rotate_room,
    apply_force,
    dimensions_to_vec,
    left_wall_force,
    wall_force
} = require('./toy');
const ball = require('./ball');

describe('apply_force', () => {
    it('modifies a legacy ball\'s running tally of "force"', () => {
        let a_ball = new ball(null, 0, 0)
        a_ball.fx = 3
        a_ball.fy = 4
        apply_force(new Victor(100, 200), a_ball)
        expect(a_ball.fx).toEqual(103)
        expect(a_ball.fy).toEqual(204)
    })
})

describe('dimensions_to_vec', () => {
    it('produces the Victor accurately', () => {
        const sample = {width: 1, height: 2}
        const actual = dimensions_to_vec(sample)
        expect(actual).toEqual(new Victor(1, 2))
    })
})

describe('left_wall_force', () => {
    it('big ball not touching wall, no force', () => {
        expect(left_wall_force(1000, 999)).toEqual(0)
    })
    it('small close ball not touching wall, no force', () => {
        expect(left_wall_force(3, 2)).toEqual(0)
    })
    it('small far ball not touching wall, no force', () => {
        expect(left_wall_force(1000, 2)).toEqual(0)
    })
    it('returns amount of penetration (px) in wall', () => {
        expect(left_wall_force(10, 20, 1)).toEqual(10)
        expect(left_wall_force(50, 120, 1)).toEqual(120 - 50)
    })
    it('it returns a doubled force for a doubled elastic constant', () => {
        expect(left_wall_force(50, 100, 2)).toEqual(50 * 2)
    })
})

describe('wall_force', () => {
    it('does not give it a force if it\'s in bounds', () => {
        let dims = {width: 200, height: 200}
        let disk_in_middle = Disk.from_legacy(new ball(null, 100, 100))
        let actual = wall_force(disk_in_middle, dimensions_to_vec(dims))
        expect(actual.magnitude()).toEqual(0)
    })

    it('pushes right if it went out the left', () => {
        let dims = {width: 200, height: 200}
        let disk_to_left = Disk.from_legacy(new ball(null, -100, 100))
        let actual = wall_force(disk_to_left, dimensions_to_vec(dims))
        expect(actual.x > 0).toEqual(true)
    })
})

describe('rotate_room', () => {
    const tall_room = new Victor(200, 100)
    const square_room = new Victor(100, 100)
    it('BL corner becomes BR corner', () => {
        const origin = new Victor(0, 0)
        expected = new Victor(tall_room.y, 0)
        expect(rotate_room(origin, tall_room)).toEqual(expected)
    })
    it('square room rotates around its center', () => {
        const center = square_room.clone().multiplyScalar(0.5)
        expect(rotate_room(center, square_room)).toEqual(center)
    })
})
