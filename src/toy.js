
const Victor = require('victor');
const Disk = require('./disk');
const ball = require('./ball');

var constant = new Object()
constant.friction = 1.02
constant.elastic = 2000
constant.gravity = 0
constant.time = 0.01
constant.paused = false

initial_balls = 100

/** converts {width, height} to {x, y} */
function dimensions_to_vec(dims) {
    return new Victor(dims.width, dims.height)
}

function spawn_balls(n) {
    let balls = []
    for (i=0; i < n; i++)
    {
        balls.push(new ball(i, Math.random()*sim.canvas.width, Math.random()*sim.canvas.height))
    }
    return balls
}

function apply_force_pair(ball_a, ball_b) {
    var dx = (ball_a.x-ball_b.x)
    var dy = (ball_a.y-ball_b.y)
    var dist = Math.sqrt(dx*dx + dy*dy)
    var penet = ball_a.size+ball_b.size-dist
    if (penet > 0)
    {
        if (ball_a.hit < 225) {ball_a.hit += 30}
        else {ball_a.hit = 255}
        if (ball_b.hit < 255){ball_b.hit += 30}
        else {ball_b.hit = 255}
        ball_a.fx += dx*penet/dist*constant.elastic
        ball_b.fx -= dx*penet/dist*constant.elastic
        ball_a.fy += dy*penet/dist*constant.elastic
        ball_b.fy -= dy*penet/dist*constant.elastic 
    }
}

function apply_force(vec, a_ball) {
    a_ball.fx += vec.x
    a_ball.fy += vec.y
}

/** one dimensional version of wall_force(), assumes wall is left wall */
function left_wall_force(pos_x, radius, elastic_constant=constant.elastic) {
    let edge_at = pos_x - radius
    if (edge_at < 0) {
        return Math.abs(edge_at) * elastic_constant
    }
    return 0
}

function wall_force(disk, dimensions) {
    let a_ball = disk.to_legacy()
    let f = new Victor(0, 0)
    // Here, we plan to exploit some symmetry in the problem.
    // The bounce happens the same way regardless of which wall the
    // ball bounces from, so we iterate over all walls.
    // We do this iteration by selecting the x or y dimension
    // then whether it's the nearside or farside wall.
    // So, we will rotate the room four times in 90deg increments,
    // then use the call left_wall_force() in that rotated room.
    if (a_ball.x - a_ball.size < 0) {
        f.x -= (a_ball.x - a_ball.size)*constant.elastic
    }
    if (a_ball.x + a_ball.size > dimensions.x) {
        f.x -= (a_ball.x +a_ball.size - dimensions.x)*constant.elastic
    }
    if (a_ball.y - a_ball.size < 0) {
        f.y -= (a_ball.y - a_ball.size)*constant.elastic
    }
    if (a_ball.y + a_ball.size > dimensions.y) {
        f.y -= (a_ball.y + a_ball.size - dimensions.y)*constant.elastic
    }
    return f
}

function apply_mouse_force(ball) {
    var dx = (ball.x-sim.mouse_x)
    var dy = (ball.y-sim.mouse_y)
    var dist = Math.sqrt(dx*dx + dy*dy)
    var penet = 100-dist
    if (penet > 0)
    {
        ball.fx += dx*penet/dist*constant.elastic     // add a suck variable with -1 or +1 value
        ball.fy += dy*penet/dist*constant.elastic
    }
}

function update_vel_reset_force(ball) {
    ball.dx += ball.fx/ball.mass*constant.time
    ball.dy += ball.fy/ball.mass*constant.time
    ball.dx = ball.dx/constant.friction
    ball.dy = ball.dy/constant.friction
    ball.x += ball.dx
    ball.y += ball.dy
    ball.fy = constant.gravity*ball.mass
    ball.fx = 0.0
}

sim = new Object()
sim.run = function () 
{
    if (constant.paused == true) {return}
    sim.canvas = document.getElementById("balls_canvas")
    sim.context = sim.canvas.getContext("2d")
    sim.canvas.width = window.innerWidth
    sim.canvas.height = window.innerHeight
    sim.list = spawn_balls(initial_balls)
    sim.update = function ()
    {
        for (i = 0; i < sim.list.length; i++)
        {
            // collision with another ball
            for (o = i+1; o < sim.list.length; o++)
            {
                apply_force_pair(sim.list[i], sim.list[o])                    
            }
            let wf = wall_force(Disk.from_legacy(sim.list[i]), dimensions_to_vec(sim.canvas));
            apply_force(wf, sim.list[i])
            apply_mouse_force(sim.list[i])
        }

        
        // apply forces and clear them
        for (i in sim.list)
        {
            update_vel_reset_force(sim.list[i])
        }
        
        // clear screen
        sim.context.clearRect(0,0,sim.canvas.width,sim.canvas.height) 

        // render balls
        for (i in sim.list)
        {
            sim.context.fillStyle = "rgb(0,0,"+sim.list[i].hit+")"
            sim.context.beginPath()
            sim.context.arc(sim.list[i].x,sim.list[i].y,sim.list[i].size,0,Math.PI*2,true)
            sim.context.closePath()
            sim.context.fill()
            sim.context.stroke()
            
            if (sim.list[i].hit > 10){sim.list[i].hit -= 10}
            
        }
    }
    sim.canvas.addEventListener("mousemove", 
                        function(e) {
                                        sim.mouse_x = (e.clientX-this.offsetLeft)
                                        sim.mouse_y = (e.clientY-this.offsetTop) 
                                    }, false)
    sim.canvas.addEventListener("click", function(e) {sim.list.push(new ball(sim.list.length-1, sim.mouse_x, sim.mouse_y+40))}, false)
    window.addEventListener("resize",function(e) {
                            sim.canvas.width = window.innerWidth;
                            sim.canvas.height = window.innerHeight
                        },false)
    window.addEventListener("keydown", function(e) {if (e.keyCode == 32) constant.paused = !constant.paused})
    			    
    setInterval(sim.update, 1000/100)
}

exports.apply_force = apply_force
exports.left_wall_force = left_wall_force
exports.ball = ball
exports.dimensions_to_vec = dimensions_to_vec
exports.wall_force = wall_force
