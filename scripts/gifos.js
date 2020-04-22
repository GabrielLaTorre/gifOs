const sessionStyle = sessionStorage.getItem('theme')

function switchTeme(style) {
    const theme = document.getElementById("style2");
    const logo = document.getElementById("logo");
    theme.setAttribute('href', style);
  }

  switchTeme(sessionStyle);