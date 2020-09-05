parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Xd6L":[function(require,module,exports) {
function t(i,r){if(!(this instanceof t))return new t(i,r);this.x=i||0,this.y=r||0}exports=module.exports=t,t.fromArray=function(i){return new t(i[0]||0,i[1]||0)},t.fromObject=function(i){return new t(i.x||0,i.y||0)},t.prototype.addX=function(t){return this.x+=t.x,this},t.prototype.addY=function(t){return this.y+=t.y,this},t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.addScalar=function(t){return this.x+=t,this.y+=t,this},t.prototype.addScalarX=function(t){return this.x+=t,this},t.prototype.addScalarY=function(t){return this.y+=t,this},t.prototype.subtractX=function(t){return this.x-=t.x,this},t.prototype.subtractY=function(t){return this.y-=t.y,this},t.prototype.subtract=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.subtractScalar=function(t){return this.x-=t,this.y-=t,this},t.prototype.subtractScalarX=function(t){return this.x-=t,this},t.prototype.subtractScalarY=function(t){return this.y-=t,this},t.prototype.divideX=function(t){return this.x/=t.x,this},t.prototype.divideY=function(t){return this.y/=t.y,this},t.prototype.divide=function(t){return this.x/=t.x,this.y/=t.y,this},t.prototype.divideScalar=function(t){return 0!==t?(this.x/=t,this.y/=t):(this.x=0,this.y=0),this},t.prototype.divideScalarX=function(t){return 0!==t?this.x/=t:this.x=0,this},t.prototype.divideScalarY=function(t){return 0!==t?this.y/=t:this.y=0,this},t.prototype.invertX=function(){return this.x*=-1,this},t.prototype.invertY=function(){return this.y*=-1,this},t.prototype.invert=function(){return this.invertX(),this.invertY(),this},t.prototype.multiplyX=function(t){return this.x*=t.x,this},t.prototype.multiplyY=function(t){return this.y*=t.y,this},t.prototype.multiply=function(t){return this.x*=t.x,this.y*=t.y,this},t.prototype.multiplyScalar=function(t){return this.x*=t,this.y*=t,this},t.prototype.multiplyScalarX=function(t){return this.x*=t,this},t.prototype.multiplyScalarY=function(t){return this.y*=t,this},t.prototype.normalize=function(){var i=this.length();return 0===i?(this.x=1,this.y=0):this.divide(t(i,i)),this},t.prototype.norm=t.prototype.normalize,t.prototype.limit=function(t,i){return Math.abs(this.x)>t&&(this.x*=i),Math.abs(this.y)>t&&(this.y*=i),this},t.prototype.randomize=function(t,i){return this.randomizeX(t,i),this.randomizeY(t,i),this},t.prototype.randomizeX=function(t,i){var o=Math.min(t.x,i.x),n=Math.max(t.x,i.x);return this.x=r(o,n),this},t.prototype.randomizeY=function(t,i){var o=Math.min(t.y,i.y),n=Math.max(t.y,i.y);return this.y=r(o,n),this},t.prototype.randomizeAny=function(t,i){return Math.round(Math.random())?this.randomizeX(t,i):this.randomizeY(t,i),this},t.prototype.unfloat=function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},t.prototype.toFixed=function(t){return void 0===t&&(t=8),this.x=this.x.toFixed(t),this.y=this.y.toFixed(t),this},t.prototype.mixX=function(t,i){return void 0===i&&(i=.5),this.x=(1-i)*this.x+i*t.x,this},t.prototype.mixY=function(t,i){return void 0===i&&(i=.5),this.y=(1-i)*this.y+i*t.y,this},t.prototype.mix=function(t,i){return this.mixX(t,i),this.mixY(t,i),this},t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.copyX=function(t){return this.x=t.x,this},t.prototype.copyY=function(t){return this.y=t.y,this},t.prototype.copy=function(t){return this.copyX(t),this.copyY(t),this},t.prototype.zero=function(){return this.x=this.y=0,this},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.cross=function(t){return this.x*t.y-this.y*t.x},t.prototype.projectOnto=function(t){var i=(this.x*t.x+this.y*t.y)/(t.x*t.x+t.y*t.y);return this.x=i*t.x,this.y=i*t.y,this},t.prototype.horizontalAngle=function(){return Math.atan2(this.y,this.x)},t.prototype.horizontalAngleDeg=function(){return o(this.horizontalAngle())},t.prototype.verticalAngle=function(){return Math.atan2(this.x,this.y)},t.prototype.verticalAngleDeg=function(){return o(this.verticalAngle())},t.prototype.angle=t.prototype.horizontalAngle,t.prototype.angleDeg=t.prototype.horizontalAngleDeg,t.prototype.direction=t.prototype.horizontalAngle,t.prototype.rotate=function(t){var i=this.x*Math.cos(t)-this.y*Math.sin(t),r=this.x*Math.sin(t)+this.y*Math.cos(t);return this.x=i,this.y=r,this},t.prototype.rotateDeg=function(t){return t=n(t),this.rotate(t)},t.prototype.rotateTo=function(t){return this.rotate(t-this.angle())},t.prototype.rotateToDeg=function(t){return t=n(t),this.rotateTo(t)},t.prototype.rotateBy=function(t){var i=this.angle()+t;return this.rotate(i)},t.prototype.rotateByDeg=function(t){return t=n(t),this.rotateBy(t)},t.prototype.distanceX=function(t){return this.x-t.x},t.prototype.absDistanceX=function(t){return Math.abs(this.distanceX(t))},t.prototype.distanceY=function(t){return this.y-t.y},t.prototype.absDistanceY=function(t){return Math.abs(this.distanceY(t))},t.prototype.distance=function(t){return Math.sqrt(this.distanceSq(t))},t.prototype.distanceSq=function(t){var i=this.distanceX(t),r=this.distanceY(t);return i*i+r*r},t.prototype.length=function(){return Math.sqrt(this.lengthSq())},t.prototype.lengthSq=function(){return this.x*this.x+this.y*this.y},t.prototype.magnitude=t.prototype.length,t.prototype.isZero=function(){return 0===this.x&&0===this.y},t.prototype.isEqualTo=function(t){return this.x===t.x&&this.y===t.y},t.prototype.toString=function(){return"x:"+this.x+", y:"+this.y},t.prototype.toArray=function(){return[this.x,this.y]},t.prototype.toObject=function(){return{x:this.x,y:this.y}};var i=180/Math.PI;function r(t,i){return Math.floor(Math.random()*(i-t+1)+t)}function o(t){return t*i}function n(t){return t/i}
},{}],"utzv":[function(require,module,exports) {
var s=require("victor"),t=new Object;function e(i,s,t){this.id=i,this.x=s,this.y=t,this.dx=0,this.dy=-10,this.fx=0,this.fy=0,this.hit=0,this.size=20+10*Math.random(),this.mass=this.size*this.size*3.14/10}function n(s){var t=[];for(i=0;i<s;i++)t.push(new e(i,Math.random()*sim.canvas.width,Math.random()*sim.canvas.height));return t}function a(i,s){var e=i.x-s.x,n=i.y-s.y,a=Math.sqrt(e*e+n*n),m=i.size+s.size-a;m>0&&(i.hit<225?i.hit+=30:i.hit=255,s.hit<255?s.hit+=30:s.hit=255,i.fx+=e*m/a*t.elastic,s.fx-=e*m/a*t.elastic,i.fy+=n*m/a*t.elastic,s.fy-=n*m/a*t.elastic)}function m(i,s){s.fx+=i.x,s.fy+=i.y}function c(i){var e=new s(0,0);return i.x-i.size<0&&(e.x-=(i.x-i.size)*t.elastic),i.x+i.size>sim.canvas.width&&(e.x-=(i.x+i.size-sim.canvas.width)*t.elastic),i.y-i.size<0&&(e.y-=(i.y-i.size)*t.elastic),i.y+i.size>sim.canvas.height&&(e.y-=(i.y+i.size-sim.canvas.height)*t.elastic),e}function h(i){var s=i.x-sim.mouse_x,e=i.y-sim.mouse_y,n=Math.sqrt(s*s+e*e),a=100-n;a>0&&(i.fx+=s*a/n*t.elastic,i.fy+=e*a/n*t.elastic)}function l(i){i.dx+=i.fx/i.mass*t.time,i.dy+=i.fy/i.mass*t.time,i.dx=i.dx/t.friction,i.dy=i.dy/t.friction,i.x+=i.dx,i.y+=i.dy,i.fy=t.gravity*i.mass,i.fx=0}t.friction=1.02,t.elastic=2e3,t.gravity=0,t.time=.01,t.paused=!1,initial_balls=100,sim=new Object,sim.run=function(){1!=t.paused&&(sim.canvas=document.getElementById("balls_canvas"),sim.context=sim.canvas.getContext("2d"),sim.canvas.width=window.innerWidth,sim.canvas.height=window.innerHeight,sim.list=n(initial_balls),sim.update=function(){for(i=0;i<sim.list.length;i++){for(o=i+1;o<sim.list.length;o++)a(sim.list[i],sim.list[o]);m(c(sim.list[i]),sim.list[i]),h(sim.list[i])}for(i in sim.list)l(sim.list[i]);for(i in sim.context.clearRect(0,0,sim.canvas.width,sim.canvas.height),sim.list)sim.context.fillStyle="rgb(0,0,"+sim.list[i].hit+")",sim.context.beginPath(),sim.context.arc(sim.list[i].x,sim.list[i].y,sim.list[i].size,0,2*Math.PI,!0),sim.context.closePath(),sim.context.fill(),sim.context.stroke(),sim.list[i].hit>10&&(sim.list[i].hit-=10)},sim.canvas.addEventListener("mousemove",function(i){sim.mouse_x=i.clientX-this.offsetLeft,sim.mouse_y=i.clientY-this.offsetTop},!1),sim.canvas.addEventListener("click",function(i){sim.list.push(new e(sim.list.length-1,sim.mouse_x,sim.mouse_y+40))},!1),window.addEventListener("resize",function(i){sim.canvas.width=window.innerWidth,sim.canvas.height=window.innerHeight},!1),window.addEventListener("keydown",function(i){32==i.keyCode&&(t.paused=!t.paused)}),setInterval(sim.update,10))},exports.apply_force=m,exports.ball=e;
},{"victor":"Xd6L"}]},{},["utzv"], null)
//# sourceMappingURL=/electric-disks/toy.b3cc1536.js.map