
// This does not do anything, other than prove
// the build process is working.
const Vec2 = require('./vec2');
(new Vec2(1, 0));

var constant = new Object()
constant.friction = 1.02
constant.elastic = 2000
constant.gravity = 0
constant.time = 0.01
constant.paused = false

initial_balls = 100

function ball(i, x, y)
{
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

function apply_wall_force(ball) {
    // collision with the walls
    if (ball.x - ball.size < 0)                 {ball.fx -= (ball.x - ball.size)*constant.elastic}
    if (ball.x + ball.size > sim.canvas.width)  {ball.fx -= (ball.x +ball.size - sim.canvas.width)*constant.elastic}
    if (ball.y - ball.size < 0)                 {ball.fy -= (ball.y - ball.size)*constant.elastic}
    if (ball.y + ball.size > sim.canvas.height) {ball.fy -= (ball.y + ball.size - sim.canvas.height)*constant.elastic}
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
    sim.list = new Array
    for (i=0; i < initial_balls; i++)
    {
        sim.list.push(new ball(i, Math.random()*sim.canvas.width, Math.random()*sim.canvas.height))
    }
    sim.update = function ()
    {
        for (i = 0; i < sim.list.length; i++)
        {
            // collision with another ball
            for (o = i+1; o < sim.list.length; o++)
            {
                apply_force_pair(sim.list[i], sim.list[o])                    
            }

            apply_wall_force(sim.list[i])
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