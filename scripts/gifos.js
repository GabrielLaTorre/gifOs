
const sessionStyle = sessionStorage.getItem('theme')
let streamLive;
let videoRecorder;
let gifRecorder;
let videoScreen = document.getElementById('checkVideo');
let previewVideo = document.getElementById('previewVideo');
let gifForm; 
const gifSettings = {
  type: 'gif',
  frameRate: 1,
  quality: 10,
  width: 830,
  hidden: 240,
  
  onGifRecordingStarted: function() {
   console.log('gif record started');
 },
}
const videoSettings = {
  type: 'video',
  frameRate: 1,
  quality: 10,
  width: 830,
  hidden: 240,
  
  onGifRecordingStarted: function() {
   console.log('video record started');
 },
}

function switchTeme(style) {
    const theme = document.getElementById("styleGifos");
    const logo = document.getElementById("logo");
    theme.setAttribute('href', style);
  }

  switchTeme(sessionStyle);

  //////////////// Manejando pasos de crear Guifos

  const readyBtn = document.getElementById('readyBtn');
  readyBtn.addEventListener('click', () => {
    document.getElementById('mediaContent').setAttribute('class', 'hidden');
    document.getElementById('initBar').setAttribute('class', 'hidden');
    videoScreen.classList.remove('hidden');
    document.getElementById('captureBar').classList.remove('hidden');
    getStreamRecord()
    .then(stream => {
      streamLive = stream;
      videoScreen.srcObject = stream;
      videoScreen.play();
    })
  })

  const cancelBtnInit = document.getElementById('cancelBtnInit')
  cancelBtnInit.addEventListener('click', () => {
    document.getElementById('captureSec').style.display = 'none';
  })

  const captureBtn = document.getElementById('captureBtn');
  captureBtn.addEventListener('click', () => {
    document.getElementById('captureBar').classList.add('hidden');
    document.getElementById('recordBar').classList.remove('hidden');
    timerObj.cronometrar();
    gifRecorder = RecordRTC(streamLive, gifSettings);
    videoRecorder = RecordRTC(streamLive, videoSettings);
    gifRecorder.startRecording();
    videoRecorder.startRecording();
  })

  const stopRecordBtn = document.getElementById('stopRecordBtn');
  stopRecordBtn.addEventListener('click', () => {
    videoScreen.classList.add('hidden');
    previewVideo.classList.remove('hidden');
    document.getElementById('recordBar').classList.add('hidden');
    document.getElementById('previewBar').style.display = 'flex';
    const tiempoTranscurrido = timerObj.parar();
    document.getElementById('timerPrev').textContent = tiempoTranscurrido;
    videoRecorder.stopRecording( () =>{
      const blob = videoRecorder.getBlob();
      const url = window.URL.createObjectURL(blob);
      previewVideo.src = url;
      previewVideo.setAttribute('controls', true);
      const playPrev = document.getElementById('playPrev');
      playPrev.addEventListener('click',()=> {
        previewVideo.play();
        timerProgress(tiempoTranscurrido);
      })
    })
    gifRecorder.stopRecording( () => {
      const blob = gifRecorder.getBlob();
      gifForm = new FormData();
      gifForm.append('file', blob, 'myGuifo.gif');
    })
  })

  const upGuifo = document.getElementById('upGuifo');
  upGuifo.addEventListener('click', () => {
    previewVideo.classList.add('hidden');
    document.getElementById('previewBar').style.display = 'none';
    document.getElementById('uploadingDiv').style.display = 'grid';
    document.getElementById('uploadingBar').classList.remove('hidden');
    const heading = new Headers();
      const init = {
        method: 'POST',
        headers: heading,
        body: gifForm,
        mode: 'cors'
      }
      const guifoUploaded = uploadGuifo(init)
      guifoUploaded
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  })

  const streamSetting = {
    audio: false,
    video: {
      width: 825,
      height: 410,
    },
  };
  
  function getStreamRecord() {
    const stream = navigator.mediaDevices
      .getUserMedia(streamSetting)
      .then((data) => data)
      .catch((err) => console.log(err));
    return stream;
  }

//////////////// TIMER ////////////////



const timerObj = {

  reiniciarBtn : document.getElementById('reiniciarBtn'),
  h : 0,
  m : 0,
  s : 0,
  inicio: 0,
  fin: 0,
  id : 0,
  
  cronometrar(){
      timerObj.inicio = Date.now();
      timerObj.escribir();
      timerObj.id = setInterval(timerObj.escribir,1000);
  },
  
  escribir(){
      let horas, minutos, segundos;
      timerObj.s++;
      if (timerObj.s>59){timerObj.m++;timerObj.s=0;}
      if (timerObj.m>59){timerObj.h++;timerObj.m=0;}
      if (timerObj.h>24){timerObj.h=0;}
  
      if (timerObj.s<10){segundos="0"+timerObj.s;}else{segundos=timerObj.s;}
      if (timerObj.m<10){minutos="0"+timerObj.m;}else{minutos=timerObj.m;}
      if (timerObj.h<10){horas="0"+timerObj.h;}else{horas=timerObj.h;}
  
      document.getElementById("timerWrite").innerHTML = `00:${horas}:${minutos}:${segundos}`; 
  },
  
  parar(){
    timerObj.fin = Date.now();
    clearInterval(timerObj.id);
    const timeDate = Math.ceil((timerObj.fin - timerObj.inicio) / 1000);
    return timeDate;
  },
  
  reiniciar(){
      document.getElementById("hms").innerHTML="00:00:00:00";
      timerObj.h=0;timerObj.m=0;timerObj.s=0;
  }
}

function timerProgress(time) {
  const arrSpn = document.getElementById('progressPrev').children;
  let counter = 0;
  const timer = (time * 1000) / arrSpn.length;
  let interval; // <--- ID para detener la ejecución del interval
  const print = ()=> {
      if (counter < arrSpn.length) {
          arrSpn[counter].style.background = '#F7C9F3'
          counter++;
      } else {
          for (let i = 0; i < arrSpn.length; i++) {
              const element = arrSpn[i];
              element.style.background = '#999999';
              counter = 0; // <--- Volvemos el contador a 0
          }
          clearInterval(interval); // <--- Paramos la ejecución del interval
      }
  }
  interval = setInterval(print, timer); // <-- Llamamos al interval
}

function printPreviewTime(time) {
  let s,horas, minutos, segundos;
  let counter = 0;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){segundos="0"+s;}else{segundos=s;}
    if (m<10){minutos="0"+m;}else{minutos=m;}
    if (h<10){horas="0"+h;}else{horas=h;}

    document.getElementById("hms").innerHTML = `00:${horas}:${minutos}:${segundos}`; 
}