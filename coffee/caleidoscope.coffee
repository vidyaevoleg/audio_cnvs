class Kaleidoscope
  
  HALF_PI: Math.PI / 2
  TWO_PI: Math.PI * 2
  
  constructor: ( @options = {} ) ->
    
    @defaults =
      offsetRotation: 0.0
      offsetScale: 1.0
      offsetX: 0.0
      offsetY: 0.0
      default_radius: 300
      slices: 20
      zoom: 1.0
      ease: 0.1
        
    @[ key ] = val for key, val of @defaults
    @[ key ] = val for key, val of @options
    
    @radius = @default_radius
    @context ?= @canvas.getContext '2d'
    @image ?= document.createElement 'img'
    @tx = @.offsetX
    @ty = @.offsetY
    @tr = @.offsetRotation
    @setCSS()


  setCSS: ->
    @canvas.style.position = 'absolute'
    @canvas.style.marginLeft = -@default_radius + 'px'
    @canvas.style.marginTop = -@default_radius + 'px'
    @canvas.style.left = '50%'
    @canvas.style.top = '50%'   

  update: (freq)->

    amplitude = 256

    dx = freq / amplitude
    dy = (amplitude - freq) / amplitude

    if dx > dy
      hx = dx + 0.5
    else 
      hx = dx - 0.5
    
    hy = dy - 0.5

    @tx = hx * @radius * -2
    @ty = hy * @radius * 2
    delta = @tr - @offsetRotation
    theta = Math.atan2( Math.sin(delta), Math.cos(delta) )
                
    @offsetX += ( @tx - @offsetX ) * @ease
    @offsetY += ( @ty - @offsetY ) * @ease
    @offsetRotation += ( theta - @offsetRotation ) * @ease
    @draw()

  draw: ->
    @canvas.width = @canvas.height = @radius * 2
    @context.fillStyle = @context.createPattern @image, 'repeat'
    
    scale = @zoom * ( @radius / Math.min @image.width, @image.height )
    step = @TWO_PI / @slices
    cx = @image.width / 2

    for index in [ 0..@slices ]
      
      @context.save()
      @context.translate @radius, @radius
      @context.rotate index * step
      
      @context.beginPath()
      @context.moveTo -0.5, -0.5
      @context.arc 0, 0, @radius, step * -0.51, step * 0.51
      @context.lineTo 0.5, 0.5
      @context.closePath()
      
      @context.rotate @HALF_PI
      @context.scale scale, scale
      @context.scale [-1,1][index % 2], 1
      @context.translate @offsetX - cx, @offsetY
      @context.rotate @offsetRotation
      @context.scale @offsetScale, @offsetScale
      
      @context.fill()
      @context.restore()
