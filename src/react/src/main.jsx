import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/*
*  Get cookie
*/
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


/*
*  chceckGatestToken
*/
function chceckGatestToken() {
  if (window.location != 'https://optmeout.tantonius.com/') {
    return true
  }  
    let gatesttoken = '';
    let token = '22wef34dd2f';
    const queryParams = new URLSearchParams(window.location.search);

    if ((queryParams.has('gatesttoken'))) {
      gatesttoken = queryParams.get('gatesttoken');
      if (gatesttoken == token) {
        document.cookie = "gatesttoken=" + gatesttoken + ";";
      }
    } else {
      gatesttoken = getCookie('gatesttoken');
    }

    return gatesttoken == token;
  

}



if (chceckGatestToken()) {
  createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

} else {
    alert('Acces denied');
}




