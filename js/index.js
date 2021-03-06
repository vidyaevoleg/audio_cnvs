// var isCanvasSupported = function(){
//   var elem = document.createElement('canvas');
//   return !!(elem.getContext && elem.getContext('2d'));
// }

// var setupRAF = function(){
//   var 
//     lastTime = 0,
//     vendors = ['ms', 'moz', 'webkit', 'o'];
  
//   for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
//     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//     window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
//   }
  
//   if(!window.requestAnimationFrame){
    
//     window.requestAnimationFrame = function(callback, element){
      
//       var 
//         currTime = new Date().getTime(),
//         timeToCall = Math.max(0, 2000 - (currTime - lastTime)),
//         id = setTimeout(function() {
//          callback(currTime + timeToCall); 
//         }, timeToCall);
      
//       lastTime = currTime + timeToCall;
      
//       debugger

//       return id;
//     }
//   }
  
//   if (!window.cancelAnimationFrame){
//     window.cancelAnimationFrame = function(id){
//       clearTimeout(id);
//     }
//   }
// }


// GLOBAL
var analyser, trail;

window.onload = function() {
  setUpAudio();
  setUpAnimation(); 
};

function setUpAnimation() {
  var c = document.createElement('canvas');
  c.width = window.innerWidth;
  c.height = window.innerHeight;      
  
  var cw = c.width;
  var ch = c.height;  
  
  document.body.appendChild(c); 
  
  trail = new smoothTrail(c, cw, ch);
}

function setUpAudio() {
  var audio,
      audioContext,
      sourceNode,
      stream;

  var audioInput = document.getElementById('audiofile');

  audioInput.addEventListener('change', function(event) {
    stream = URL.createObjectURL(event.target.files[0]);
    audio = new Audio();
    audio.src = stream;
    audioContext = new AudioContext();
    analyser = (analyser || audioContext.createAnalyser());
    analyser.smoothingTimeConstant = 0.75;
    analyser.fftSize = 512;
  
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    sourceNode.connect(audioContext.destination);

    audio.play();
    render();
  });  
}



function render () {
  var 
    freqArray = new Uint8Array(analyser.frequencyBinCount),
    arrayOfFreq = [],
    freq;

  analyser.getByteTimeDomainData(freqArray);

  for (var i = 0; i < freqArray.length; i++) {
    var v = freqArray[i];
    arrayOfFreq.push(v);
  }

  freq = parseInt(arrayOfFreq.uniq()[0]) 

  trail.clearCanvas();
  trail.randomizeParams(freq);
  trail.updateArc();
  trail.updateTrail();
  trail.renderTrail();

  requestAnimationFrame(render);
}

