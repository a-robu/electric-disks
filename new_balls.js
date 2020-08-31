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

sim = new Object()
sim.run = function () 
{
    if (constant.paused == true) {return}
    sim.canvas = document.getElementById("balls_canvas")
    sim.context = sim.canvas.getContext("2d")
    sim.canvas.width = document.documentElement.clientWidth
    sim.canvas.height = document.documentElement.clientHeight
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
                //alert('collision by ball i: '+i+' '+sim.list[i]+' o: '+o+' '+sim.list[o])
                var dx = (sim.list[i].x-sim.list[o].x)
                var dy = (sim.list[i].y-sim.list[o].y)
                var dist = Math.sqrt(dx*dx + dy*dy)
                var penet = sim.list[i].size+sim.list[o].size-dist
                if (penet > 0)
                {
                    if (sim.list[i].hit < 225) {sim.list[i].hit += 30}
                    else {sim.list[i].hit = 255}
                    if (sim.list[o].hit < 255){sim.list[o].hit += 30}
                    else {sim.list[o].hit = 255}
                    sim.list[i].fx += dx*penet/dist*constant.elastic
                    sim.list[o].fx -= dx*penet/dist*constant.elastic
                    sim.list[i].fy += dy*penet/dist*constant.elastic
                    sim.list[o].fy -= dy*penet/dist*constant.elastic 
                }
                else
                {
                    //alert('collision by ball i: '+i+' '+sim.list[i]+' o: '+o+' '+sim.list[o])
                    //alert('dx: '+dx+' dx^2: '+(dx*dx)+' dy: '+dy+' dy^2: '+(dy*dy)+' \n '+'ball size i: '+sim.list[i].size +' ball size o: '+sim.list[o].size+' dist: '+dist)
                }
                    
            }
                    
            // collision with the walls
            if (sim.list[i].x - sim.list[i].size < 0)                 {sim.list[i].fx -= (sim.list[i].x - sim.list[i].size)*constant.elastic}
            if (sim.list[i].x + sim.list[i].size > sim.canvas.width)  {sim.list[i].fx -= (sim.list[i].x +sim.list[i].size - sim.canvas.width)*constant.elastic}
            if (sim.list[i].y - sim.list[i].size < 0)                 {sim.list[i].fy -= (sim.list[i].y - sim.list[i].size)*constant.elastic}
            if (sim.list[i].y + sim.list[i].size > sim.canvas.height) {sim.list[i].fy -= (sim.list[i].y + sim.list[i].size - sim.canvas.height)*constant.elastic}

            // collision with mouse
            var dx = (sim.list[i].x-sim.mouse_x)
            var dy = (sim.list[i].y-sim.mouse_y)
            var dist = Math.sqrt(dx*dx + dy*dy)
            var penet = 100-dist
            if (penet > 0)
            {
                sim.list[i].fx += dx*penet/dist*constant.elastic     // add a suck variable with -1 or +1 value
                sim.list[i].fy += dy*penet/dist*constant.elastic
            }
        }

        // apply forces and clear them
        for (i in sim.list)
        {
            sim.list[i].dx += sim.list[i].fx/sim.list[i].mass*constant.time
            sim.list[i].dy += sim.list[i].fy/sim.list[i].mass*constant.time
            sim.list[i].dx = sim.list[i].dx/constant.friction
            sim.list[i].dy = sim.list[i].dy/constant.friction
            sim.list[i].x += sim.list[i].dx
            sim.list[i].y += sim.list[i].dy
            sim.list[i].fy = constant.gravity*sim.list[i].mass
            sim.list[i].fx = 0.0
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
                            sim.canvas.width = document.documentElement.clientWidth;
                            sim.canvas.height = document.documentElement.clientHeight
                        },false)
    window.addEventListener("keydown", function(e) {if (e.keyCode == 32) constant.paused = !constant.paused})
    			    
    setInterval(sim.update, 1000/100)
}