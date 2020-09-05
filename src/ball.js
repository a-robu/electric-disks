
function ball(i, x, y)
{
    // this is the legacy version of representing the ball, without
    // using vectors. the usage of this "class" is being replaced 
    // by Disk. When the conversion is complete, this "class" will
    // be deleted.
    this.id = i
    this.x = x
    this.y = y
    this.dx = 0.0
    this.dy = -10.0
    this.fx = 0.0
    this.fy = 0.0
    this.hit = 0.0
    this.size = 20 + Math.random() * 10
    this.mass = (this.size*this.size*3.14)/10
}

module.exports = ball
