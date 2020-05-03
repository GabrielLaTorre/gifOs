const sessionStyle = sessionStorage.getItem('theme')
let streamLive;
let recorder;
let videoScreen = document.getElementById('checkVideo');
let previewVideo = document.getElementById('previewVideo');

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
    recorder = RecordRTC(streamLive, 
      {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 830,
          hidden: 240,
          
          onGifRecordingStarted: function() {
           console.log('started')
         },
      })
  recorder.startRecording();
  })

  const stopRecordBtn = document.getElementById('stopRecordBtn');
  stopRecordBtn.addEventListener('click', () => {
    videoScreen.classList.add('hidden');
    previewVideo.classList.remove('hidden');
    document.getElementById('recordBar').classList.add('hidden');
    document.getElementById('previewBar').style.display = 'flex';
    recorder.stopRecording( () =>{
        const blob = recorder.getBlob();
        const url = window.URL.createObjectURL(blob);
       previewVideo.src = url;
       previewVideo.setAttribute('controls', true);
    })
  })

  const upGuifo = document.getElementById('upGuifo');
  upGuifo.addEventListener('click', () => {
    document.getElementById('checkVideo').classList.add('hidden');
    document.getElementById('previewBar').style.display = 'none';
    document.getElementById('uploadingDiv').style.display = 'grid';
    document.getElementById('uploadingBar').classList.remove('hidden');
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