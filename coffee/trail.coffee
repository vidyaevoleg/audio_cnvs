class Trail
  
  constructor: (c, cw, ch)->
    c = c
    cw = cw
    ch = ch
    mx = 0
    my = 0
    ctx = c.getContext('2d')
    trail = []
    maxTrail = 500
    for_splice = 1
    mouseDown = false
    ctx.lineWidth = .2
    ctx.lineJoin = 'miter'
    radius = 100
    speed = 0.01
    delta_speed = Math.PI / 8
    angle = 0
    arcx = 0
    arcy = 0
    opacity_bool = true
    growRadius = true
    horizonter = 1
    seconds = 0
    milliseconds = 0

  updateArc: ->
    d = new Date
    @arcx = @cw / 2 + Math.sin(@angle) * @radius
    @arcy = @ch / 2 + Math.cos(@angle) * @radius
    @seconds = d.getSeconds()
    @milliseconds = d.getMilliseconds()
    @angle += @seconds / 15 * @delta_speed
    return

  randomizeParams: (freq) ->
    lineWidth = Math.abs(freq - 110).toFixed(1)
    radius = 1.5 * freq
    _this.ctx.lineWidth = lineWidth
    _this.radius = radius
    return

  rand: (rMi, rMa) ->
    ~ ~(Math.random() * (rMa - rMi + 1) + rMi)

  createPoint: (x, y) ->
    @trail.push
      x: x
      y: y
    return

  updateTrail: ->
    console.log @trail.length
    if @trail.length < @maxTrail
      @createPoint @arcx, @arcy
    else
      @trail.splice 0, @for_splice
    return

  draw: ->
    i = @trail.length
    @ctx.beginPath()
    while i--
      point = @trail[i]
      nextPoint = if i == @trail.length then @trail[i + 1] else @trail[i]
      x_0 = Math.round(point.x)
      y_0 = Math.round(point.y)
      x = nextPoint.x
      y = nextPoint.y
      @ctx.moveTo x_0, y_0
      @ctx.lineTo x, y
      # this.ctx.quadraticCurveTo(Math.round(this.arcx), Math.round(this.arcy), this.horizonter * nextPoint.x, this.horizonter * nextPoint.y);
    @ctx.strokeStyle = 'hsla(' + @rand(170, 300) + ', 100%, ' + @rand(50, 75) + '%, 1)'
    @ctx.stroke()
    @ctx.closePath()
    return

  clear: ->
    @ctx.globalCompositeOperation = 'destination-atop'
    @ctx.fillStyle = 'rgba(0,0,0,.1)'
    @ctx.fillRect 0, 0, @cw, @ch
    @ctx.globalCompositeOperation = 'luminosity'
    return

  update: (freq) ->
    @clear()
    @randomizeParams freq
    @updateArc()
    @updateTrail()
    @draw()  

  return
