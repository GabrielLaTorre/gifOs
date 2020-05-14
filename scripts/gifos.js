document.addEventListener('DOMContentLoaded', () => {
  renderGuifos();
})


const sessionStyle = sessionStorage.getItem('theme')
const mediaTitle = document.getElementById('mediaTitle');
const btnClose = document.getElementById('closeBtn');

let uploadedGuifos = [];
let tiempoTranscurrido;
let streamLive;
let videoRecorder;
let gifRecorder;
let videoScreen = document.getElementById('checkVideo');
let previewVideo = document.getElementById('previewVideo');
let gifForm;
let gifUrl;
let gifoID;
let gifBlob;
let gifUrlObj;

const gifSettings = {
  type: 'gif',
  frameRate: 1,
  quality: 10,
  width: 370,
  height: 190,
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
    if(style == "/styles/night.css") { 
      logo.setAttribute('src', "/images/logo_dark.png");
      theme.setAttribute('href', style);
    } else {
      logo.setAttribute("src", "/images/logo.png");
      theme.setAttribute('href', "/styles/day.css");
    }
  }

  switchTeme(sessionStyle);

  //////////////// Manejando pasos de crear Guifos

  const readyBtn = document.getElementById('readyBtn');
  readyBtn.addEventListener('click', () => {
    document.getElementById('mediaContent').classList.add('hidden');
    document.getElementById('initBar').classList.add('hidden');
    videoScreen.classList.remove('hidden');
    document.getElementById('captureBar').classList.remove('hidden');
    mediaTitle.innerText = 'Un Chequeo Antes de Empezar';
    btnClose.style.left = '990px';
    btnClose.classList.remove('hidden');
    const gifoSection = document.getElementById('gifosSec');
    gifoSection.style.display = 'none';
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
    mediaTitle.innerText = 'Capturando Tu Guifo';
    document.getElementById('captureBar').classList.add('hidden');
    document.getElementById('recordBar').classList.remove('hidden');
    gifRecorder = RecordRTC(streamLive, gifSettings);
    videoRecorder = RecordRTC(streamLive, videoSettings);
    videoRecorder.startRecording();
    timerObj.cronometrar();
    gifRecorder.startRecording();
  })

  const stopRecordBtn = document.getElementById('stopRecordBtn');
  stopRecordBtn.addEventListener('click', () => {
    tiempoTranscurrido = timerObj.parar();
    timerObj.reiniciar();
    mediaTitle.innerText = 'Vista Previa';
    videoScreen.classList.add('hidden');
    previewVideo.classList.remove('hidden');
    document.getElementById('recordBar').classList.add('hidden');
    document.getElementById('previewBar').style.display = 'flex';
    videoRecorder.stopRecording( () =>{
      const blob = videoRecorder.getBlob();
      const url = window.URL.createObjectURL(blob);
      previewVideo.src = url;
      const playPrev = document.getElementById('playPrev');
      playPrev.addEventListener('click',()=> {
        previewVideo.play();
        printPreviewTime(tiempoTranscurrido);
        timerProgress(tiempoTranscurrido);
      })
    })
    gifRecorder.stopRecording( () => {
      gifBlob = gifRecorder.getBlob();
      gifUrlObj = window.URL.createObjectURL(gifBlob);
      gifForm = new FormData();
      gifForm.append('file', gifBlob, 'myGuifo.gif');
    })
  })

  const repeatGuifo = document.getElementById('repeatGuifo');
  repeatGuifo.addEventListener('click', () => {
    videoScreen.classList.remove('hidden');
    previewVideo.classList.add('hidden');
    mediaTitle.innerText = 'Un Chequeo Antes de Empezar';
    document.getElementById('previewBar').style.display = 'none';
    document.getElementById('captureBar').classList.remove('hidden');
    videoRecorder.destroy();
    gifRecorder.destroy();
  })

  const upGuifo = document.getElementById('upGuifo');
  upGuifo.addEventListener('click', () => {
    mediaTitle.innerText = 'Subiendo Guifo';
    previewVideo.classList.add('hidden');
    document.getElementById('previewBar').style.display = 'none';
    document.getElementById('uploadingDiv').style.display = 'grid';
    document.getElementById('uploadingBar').classList.remove('hidden');
    streamLive.getTracks().forEach(track => {
      track.stop();
    });
    uploadProgress();
    const guifoUploaded = apiObj.uploadGuifo(gifForm)
    guifoUploaded
    .then(resp => {
      gifoID = resp.data.id;
      const myGuifo = apiObj.getGifByID(gifoID);
      myGuifo
        .then(data => {
          gifUrl = data.data.images.original.url;
          const img = document.getElementById('gifoUploaded');
          img.setAttribute('src', gifUrl);
          const downloadBtn = document.getElementById('downloadBtn');
          downloadBtn.href = gifUrlObj;
          saveGif(gifUrl);
          renderGuifos();
        })
        .catch(err => console.log(err))
      document.getElementById('uploadingDiv').style.display = 'none';
      document.getElementById('uploadingBar').classList.add('hidden');
      document.getElementById('finishCont').style.display = 'flex';
      document.getElementById('finishBar').classList.remove('hidden');
      mediaTitle.innerText = 'Guifo Subido Con Éxito';
      btnClose.style.left = '930px';
    })
  })

  const abortBtn = document.getElementById('abortBtn');
  abortBtn.addEventListener('click', ()=> {
    apiObj.abortCtrl.abort();
    videoRecorder.destroy();
    gifRecorder.destroy();
    document.getElementById('uploadingDiv').style.display = 'none';
    document.getElementById('uploadingBar').classList.add('hidden');
    document.getElementById('mediaContent').classList.remove('hidden');
    document.getElementById('initBar').classList.remove('hidden');
  })

  const finishBtn = document.getElementById('finishBtn');
  finishBtn.addEventListener('click', ()=> {
    document.getElementById('finishCont').style.display = 'none';
    document.getElementById('finishBar').classList.add('hidden');
    document.getElementById('mediaContent').classList.remove('hidden');
    document.getElementById('initBar').classList.remove('hidden');
    btnClose.classList.add('hidden');
  })

  const copyUrlBtn = document.getElementById('copyUrlBtn');
  copyUrlBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(gifUrl)
    .then(alert(`Url copiada!`))
    .catch(err => alert(err))
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
  h : 0,
  m : 0,
  s : 0,
  inicio: 0,
  fin: 0,
  id : 0,
  
  cronometrar(){
      timerObj.id = setInterval(timerObj.escribir,1000);
      timerObj.inicio = Date.now();
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
      document.getElementById("timerWrite").innerHTML="00:00:00:00";
      timerObj.h=0;timerObj.m=0;timerObj.s=0;
  }
}

function timerProgress(time) {
  const arrSpn = document.getElementById('progressPrev').children;
  let counter = 0;
  const timer = (time * 1000) / arrSpn.length;
  let interval; // <--- ID para detener la ejecución del interval
  const printSpn = ()=> {
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
  interval = setInterval(printSpn, timer); // <-- Llamamos al interval
}

function printPreviewTime(time) {
  let s = 0;
  let m = 0;
  let h = 0;
  let horas, minutos, segundos;
  let counter = 0;
  let idInterval;
  const printTime = () => {
    if(counter < time) {
      s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}
  
    if (s<10){segundos="0"+s;}else{segundos=s;}
    if (m<10){minutos="0"+m;}else{minutos=m;}
    if (h<10){horas="0"+h;}else{horas=h;}
  
      document.getElementById("timerPrev").innerHTML = `00:${horas}:${minutos}:${segundos}`;
      counter++;
    }
    else {
      document.getElementById("timerPrev").innerHTML = `00:00:00:00 `;
      clearInterval(idInterval);
    }
  }

  idInterval = setInterval(printTime ,1000);
}

function uploadProgress() {
  const arrSpn = document.getElementById('progressUp').children;
  let counter = 0;
  let interval; // <--- ID para detener la ejecución del interval
  const printSpn = ()=> {
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
  interval = setInterval(printSpn, 400); // <-- Llamamos al interval
}

function saveGif(id) {

  uploadedGuifos.push(id);

  if(!localStorage.getItem('guifos')) {
    console.log('No hay nada!');
    localStorage.setItem('guifos', JSON.stringify(uploadedGuifos));
  } else {
    const arrayGif = JSON.parse(localStorage.getItem('guifos'));
    arrayGif.push(id);
    localStorage.setItem('guifos', JSON.stringify(arrayGif));
  }

}

function renderGuifos() {
  const gifoSection = document.getElementById('gifosSec');
  gifoSection.style.display = 'block';

  if(!localStorage.getItem('guifos')) {
    const gifosContainer = document.getElementById('gifosContainer');
    gifosContainer.style.display = 'block';
    gifosContainer.firstElementChild.classList.remove('hidden');
  } else {
    const gifosContainer = document.getElementById('gifosContainer');
    gifosContainer.firstElementChild.classList.add('hidden');
    gifosContainer.style.display = 'grid';
    const arrayGif = JSON.parse(localStorage.getItem('guifos'));

    arrayGif.forEach(element => {
      const img = document.createElement('img');
      img.setAttribute('src', element);
      gifosContainer.insertAdjacentElement('beforeend', img);
    });
  }
}