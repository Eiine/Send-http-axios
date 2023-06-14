    let dataH = document.getElementById("data-input");
    let methodH = document.getElementById("method-input");
    let urlH = document.getElementById("url-input");
    let pathH = document.getElementById("path-input");
    let tokenH = document.getElementById("token-input");
//option recibe un objeto que puede tener token, method, entre otras cosas

const send_http_axios=(data,option)=>{


    axios({
        method: option.method,
        url: `${option.url}${option.path}`,
        data: data,
         headers: { 'Content-Type':'application/json',
         "authorization": option.token
      },
      })
        .then(response => {
          // Manejo de la respuesta exitosa
          console.log({ response});
          document.getElementById("response-container").textContent = JSON.stringify(response.data, null, 2);
        })
        .catch(error => {
          // Manejo del error
          console.error(error);
        });


}

function sendRequest() {
    let data = dataH.value;
    let method = methodH.value;
    let url = urlH.value;
    let path = pathH.value;
    let token = tokenH.value;
  
    var option = {
      method: method,
      url: url,
      path: path,
      token: token
    };
  
    send_http_axios(data, option);
  }

  let saveHttp=()=>{

    let data = dataH.value;
    let method = methodH.value;
    let url = urlH.value;
    let path = pathH.value;
    let token = tokenH.value;
  
    var option = {
      method: method,
      url: url,
      path: path,
      token: token
    };
  
    
    let guardar= localStorage.setItem("peticiones",JSON.stringify(option))
  }