var Trail;

Trail = (function() {
  function Trail(c, cw, ch) {
    var angle, arcx, arcy, ctx, delta_speed, for_splice, growRadius, horizonter, maxTrail, milliseconds, mouseDown, mx, my, opacity_bool, radius, seconds, speed, trail;
    c = c;
    cw = cw;
    ch = ch;
    mx = 0;
    my = 0;
    ctx = c.getContext('2d');
    trail = [];
    maxTrail = 500;
    for_splice = 1;
    mouseDown = false;
    ctx.lineWidth = .2;
    ctx.lineJoin = 'miter';
    radius = 100;
    speed = 0.01;
    delta_speed = Math.PI / 8;
    angle = 0;
    arcx = 0;
    arcy = 0;
    opacity_bool = true;
    growRadius = true;
    horizonter = 1;
    seconds = 0;
    milliseconds = 0;
  }

  Trail.prototype.updateArc = function() {
    var d;
    d = new Date;
    this.arcx = this.cw / 2 + Math.sin(this.angle) * this.radius;
    this.arcy = this.ch / 2 + Math.cos(this.angle) * this.radius;
    this.seconds = d.getSeconds();
    this.milliseconds = d.getMilliseconds();
    this.angle += this.seconds / 15 * this.delta_speed;
  };

  Trail.prototype.randomizeParams = function(freq) {
    var lineWidth, radius;
    lineWidth = Math.abs(freq - 110).toFixed(1);
    radius = 1.5 * freq;
    _this.ctx.lineWidth = lineWidth;
    _this.radius = radius;
  };

  Trail.prototype.rand = function(rMi, rMa) {
    return ~~(Math.random() * (rMa - rMi + 1) + rMi);
  };

  Trail.prototype.createPoint = function(x, y) {
    this.trail.push({
      x: x,
      y: y
    });
  };

  Trail.prototype.updateTrail = function() {
    console.log(this.trail.length);
    if (this.trail.length < this.maxTrail) {
      this.createPoint(this.arcx, this.arcy);
    } else {
      this.trail.splice(0, this.for_splice);
    }
  };

  Trail.prototype.draw = function() {
    var i, nextPoint, point, x, x_0, y, y_0;
    i = this.trail.length;
    this.ctx.beginPath();
    while (i--) {
      point = this.trail[i];
      nextPoint = i === this.trail.length ? this.trail[i + 1] : this.trail[i];
      x_0 = Math.round(point.x);
      y_0 = Math.round(point.y);
      x = nextPoint.x;
      y = nextPoint.y;
      this.ctx.moveTo(x_0, y_0);
      this.ctx.lineTo(x, y);
    }
    this.ctx.strokeStyle = 'hsla(' + this.rand(170, 300) + ', 100%, ' + this.rand(50, 75) + '%, 1)';
    this.ctx.stroke();
    this.ctx.closePath();
  };

  Trail.prototype.clear = function() {
    this.ctx.globalCompositeOperation = 'destination-atop';
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0, 0, this.cw, this.ch);
    this.ctx.globalCompositeOperation = 'luminosity';
  };

  Trail.prototype.update = function(freq) {
    this.clear();
    this.randomizeParams(freq);
    this.updateArc();
    this.updateTrail();
    this.draw();
  };

  return Trail;

})();
