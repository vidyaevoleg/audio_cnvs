var Setup, analyser, kaleidoscope, setup, trail;

trail = void 0;

kaleidoscope = void 0;

analyser = void 0;

setup = void 0;

Setup = (function() {
  function Setup() {}

  Setup.prototype.animation = function() {
    var c;
    c = document.createElement('canvas');
    document.body.appendChild(c);
    this.strategies(c);
  };

  Setup.prototype.strategies = function(canvas) {
    this.renderKaleidoscope(canvas);
    this.renderAudio();
  };

  Setup.prototype.renderTrail = function(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return trail = new Trail(canvas, canvas.width, canvas.height);
  };

  Setup.prototype.renderKaleidoscope = function(canvas) {
    var image;
    image = new Image;
    image.src = 'https://s-media-cache-ak0.pinimg.com/564x/f9/25/d4/f925d4319416498bfd2267adec580a7b.jpg';
    kaleidoscope = new Kaleidoscope({
      image: image,
      canvas: canvas
    });
    return image.onload = (function(_this) {
      return function() {
        return kaleidoscope.draw();
      };
    })(this);
  };

  Setup.prototype.renderAudio = function() {
    var audioInput;
    audioInput = document.getElementById('audiofile');
    audioInput.addEventListener('change', function(event) {
      var audio, audioContext, sourceNode, stream;
      stream = URL.createObjectURL(event.target.files[0]);
      audio = new Audio;
      audio.src = stream;
      audioContext = new AudioContext;
      analyser = audioContext.createAnalyser();
      analyser.smoothingTimeConstant = 0.75;
      analyser.fftSize = 512;
      sourceNode = audioContext.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      sourceNode.connect(audioContext.destination);
      audio.play();
      setup.renderAll();
    });
  };

  Setup.prototype.renderAll = function() {
    var arrayOfFreq, freq, freqArray, i, v;
    freqArray = new Uint8Array(analyser.frequencyBinCount);
    arrayOfFreq = [];
    freq = void 0;
    analyser.getByteTimeDomainData(freqArray);
    i = 0;
    while (i < freqArray.length) {
      v = freqArray[i];
      arrayOfFreq.push(v);
      i++;
    }
    freq = parseInt(arrayOfFreq.uniq()[0]);
    kaleidoscope.update(freq);
    requestAnimationFrame(setup.renderAll);
  };

  return Setup;

})();

window.onload = function() {
  setup = new Setup;
  setup.animation();
};