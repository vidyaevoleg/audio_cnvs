trail = undefined
kaleidoscope = undefined
analyser = undefined
setup = undefined
zoom = 1
window.parent.document.body.style.zoom = zoom


incZoom = ->
  setTimeout ->
    zoom += 0.013
    window.parent.document.body.style.zoom = zoom
    incZoom()
  , 700

class Setup

  animation: ->
    c = document.createElement('canvas')
    document.body.appendChild c
    @strategies c 
    return

  strategies: (canvas)->
    #@renderTrail(canvas)
    @renderKaleidoscope(canvas)
    @renderAudio()
    return

  renderTrail: (canvas)->
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    trail = new Trail(canvas, canvas.width, canvas.height)

    # srcs = [
    #   'https://s-media-cache-ak0.pinimg.com/564x/f9/25/d4/f925d4319416498bfd2267adec580a7b.jpg',
# https://s-media-cache-ak0.pinimg.com/564x/49/57/cb/4957cbcf1d71623b96af998bf206c2a1.jpg
    # ]

  renderKaleidoscope: (canvas)->
    image = new Image
    image.src = 'https://s-media-cache-ak0.pinimg.com/564x/7a/09/82/7a09821f4f68dcb58066dcd8561e94e4.jpg'

    kaleidoscope = new Kaleidoscope
      image: image
      canvas: canvas  

    image.onload = => 
      kaleidoscope.draw()


  renderAudio: ->
    audioInput = $('#audiofile')
    audioInput.on 'change', (event) ->
      $(@).fadeOut(500)
      stream = URL.createObjectURL(event.target.files[0])
      audio = new Audio
      audio.src = stream
      audioContext = new AudioContext
      analyser = audioContext.createAnalyser()
      analyser.smoothingTimeConstant = 0.75
      analyser.fftSize = 512
      sourceNode = audioContext.createMediaElementSource(audio)
      sourceNode.connect analyser
      sourceNode.connect audioContext.destination
      audio.play()
      setup.renderAll()
      incZoom()
      return
    return

  renderAll: ->
    freqArray = new Uint8Array(analyser.frequencyBinCount)
    arrayOfFreq = []
    freq = undefined
    analyser.getByteTimeDomainData freqArray
    i = 0
    while i < freqArray.length
      v = freqArray[i]
      arrayOfFreq.push v
      i++
    freq = parseInt(arrayOfFreq.uniq()[0])

    kaleidoscope.update freq
    requestAnimationFrame setup.renderAll
    return


window.onload = ->
  setup = new Setup
  setup.animation()
  return