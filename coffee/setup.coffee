trail = undefined
kaleidoscope = undefined
analyser = undefined
setup = undefined

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

  renderKaleidoscope: (canvas)->
    image = new Image
    image.src = 'https://s-media-cache-ak0.pinimg.com/564x/f9/25/d4/f925d4319416498bfd2267adec580a7b.jpg'

    kaleidoscope = new Kaleidoscope
      image: image
      canvas: canvas  

    image.onload = => 
      kaleidoscope.draw()


  renderAudio: ->
    audioInput = document.getElementById('audiofile')
    audioInput.addEventListener 'change', (event) ->
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