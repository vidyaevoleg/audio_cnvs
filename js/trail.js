var smoothTrail;

smoothTrail = function(c, cw, ch) {
  var _this;
  _this = this;
  this.c = c;
  this.cw = cw;
  this.ch = ch;
  this.mx = 0;
  this.my = 0;
  this.ctx = c.getContext('2d');
  this.trail = [];
  this.maxTrail = 500;
  this.for_splice = 1;
  this.mouseDown = false;
  this.ctx.lineWidth = .2;
  this.ctx.lineJoin = 'miter';
  this.radius = 100;
  this.speed = 0.01;
  this.delta_speed = Math.PI / 8;
  this.angle = 0;
  this.arcx = 0;
  this.arcy = 0;
  this.opacity_bool = true;
  this.growRadius = true;
  this.horizonter = 1;
  this.seconds = 0;
  this.milliseconds = 0;
  this.updateArc = function() {
    var d;
    d = new Date;
    this.arcx = this.cw / 2 + Math.sin(this.angle) * this.radius;
    this.arcy = this.ch / 2 + Math.cos(this.angle) * this.radius;
    this.seconds = d.getSeconds();
    this.milliseconds = d.getMilliseconds();
    this.angle += this.seconds / 15 * this.delta_speed;
  };
  this.randomizeParams = function(freq) {
    var lineWidth, radius;
    lineWidth = Math.abs(freq - 110).toFixed(1);
    radius = 1.5 * freq;
    _this.ctx.lineWidth = lineWidth;
    _this.radius = radius;
  };
  this.rand = function(rMi, rMa) {
    return ~~(Math.random() * (rMa - rMi + 1) + rMi);
  };
  this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
  };
  this.createPoint = function(x, y) {
    this.trail.push({
      x: x,
      y: y
    });
  };
  this.updateTrail = function() {
    console.log(this.trail.length);
    if (this.trail.length < this.maxTrail) {
      this.createPoint(this.arcx, this.arcy);
    } else {
      this.trail.splice(0, this.for_splice);
    }
  };
  this.draw = function() {
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
  this.clearCanvas = function() {
    this.ctx.globalCompositeOperation = 'destination-atop';
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0, 0, this.cw, this.ch);
    this.ctx.globalCompositeOperation = 'luminosity';
  };
  this.update = function(freq) {
    this.clearCanvas();
    this.randomizeParams(freq);
    this.updateArc();
    this.updateTrail();
    return this.draw();
  };
};
