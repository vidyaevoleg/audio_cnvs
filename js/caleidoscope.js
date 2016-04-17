var Kaleidoscope;

Kaleidoscope = (function() {
  Kaleidoscope.prototype.HALF_PI = Math.PI / 2;

  Kaleidoscope.prototype.TWO_PI = Math.PI * 2;

  function Kaleidoscope(options) {
    var key, ref, ref1, val;
    this.options = options != null ? options : {};
    this.defaults = {
      offsetRotation: 0.0,
      offsetScale: 1.0,
      offsetX: 0.0,
      offsetY: 0.0,
      default_radius: 300,
      slices: 16,
      zoom: 1.0,
      ease: 0.1
    };
    ref = this.defaults;
    for (key in ref) {
      val = ref[key];
      this[key] = val;
    }
    ref1 = this.options;
    for (key in ref1) {
      val = ref1[key];
      this[key] = val;
    }
    this.radius = this.default_radius;
    if (this.context == null) {
      this.context = this.canvas.getContext('2d');
    }
    if (this.image == null) {
      this.image = document.createElement('img');
    }
    this.tx = this.offsetX;
    this.ty = this.offsetY;
    this.tr = this.offsetRotation;
    this.setCSS();
  }

  Kaleidoscope.prototype.setCSS = function() {
    this.canvas.style.position = 'absolute';
    this.canvas.style.marginLeft = -this.default_radius + 'px';
    this.canvas.style.marginTop = -this.default_radius + 'px';
    this.canvas.style.left = '50%';
    return this.canvas.style.top = '50%';
  };

  Kaleidoscope.prototype.update = function(freq) {
    var amplitude, delta, dx, dy, hx, hy, theta;
    amplitude = 256;
    dx = freq / amplitude;
    dy = (amplitude - freq) / amplitude;
    if (dx > dy) {
      hx = dx + 0.5;
    } else {
      hx = dx - 0.5;
    }
    hy = dy - 0.5;
    this.ease = dx / 5;
    this.tx = 2 * (hx * this.radius * -2);
    this.ty = 2 * (hy * this.radius * 2);
    delta = this.tr - this.offsetRotation;
    theta = Math.atan2(Math.sin(delta), Math.cos(delta));
    this.offsetX += (this.tx - this.offsetX) * this.ease;
    this.offsetY += (this.ty - this.offsetY) * this.ease;
    this.offsetRotation += (theta - this.offsetRotation) * this.ease;
    return this.draw();
  };

  Kaleidoscope.prototype.draw = function() {
    var cx, i, index, ref, results, scale, step;
    this.canvas.width = this.canvas.height = this.radius * 2;
    this.context.fillStyle = this.context.createPattern(this.image, 'repeat');
    scale = this.zoom * (this.radius / Math.min(this.image.width, this.image.height));
    step = this.TWO_PI / this.slices;
    cx = this.image.width / 2;
    results = [];
    for (index = i = 0, ref = this.slices; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
      this.context.save();
      this.context.translate(this.radius, this.radius);
      this.context.rotate(index * step);
      this.context.beginPath();
      this.context.moveTo(-0.5, -0.5);
      this.context.arc(0, 0, this.radius, step * -0.51, step * 0.51);
      this.context.lineTo(0.5, 0.5);
      this.context.closePath();
      this.context.rotate(this.HALF_PI);
      this.context.scale(scale, scale);
      this.context.scale([-1, 1][index % 2], 1);
      this.context.translate(this.offsetX - cx, this.offsetY);
      this.context.rotate(this.offsetRotation);
      this.context.scale(this.offsetScale, this.offsetScale);
      this.context.fill();
      results.push(this.context.restore());
    }
    return results;
  };

  return Kaleidoscope;

})();
