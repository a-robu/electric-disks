
const Victor = require("@a-robu/victor")
const ball = require('./ball')

class Disk {
    constructor(pos, vel, radius, hit=0) {
        this.pos = pos
        this.vel = vel
        this.radius = radius
        this.hit = hit
    }

    get mass() {
        return Math.PI * Math.pow(this.radius, 2)
    }

    static spawn(pos) {
        return new Disk(pos, new Victor(0, -10), 20 + Math.random() * 10)
    }

    static from_legacy(a_ball) {
        return new Disk(
            new Victor(a_ball.x, a_ball.y),
            new Victor(a_ball.dx, a_ball.dy),
            a_ball.size,
            a_ball.hit
        )
    }

    to_legacy() {
        let converted = new ball(null, this.pos.x, this.pos.y)
        converted.dx = this.vel.x
        converted.dy = this.vel.y
        converted.hit = this.hit
        converted.size = this.radius
        converted.mass = this.mass
        return converted
    }
}

module.exports = Disk
