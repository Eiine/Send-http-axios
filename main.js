    let dataH = document.getElementById("data-input");
    let methodH = document.getElementById("method-input");
    let urlH = document.getElementById("url-input");
    let pathH = document.getElementById("path-input");
    let tokenH = document.getElementById("token-input");
    let peticiones=document.getElementById("peticiones-saved")
   
//option recibe un objeto que puede tener token, method, entre otras cosas

const send_http_axios=(data,option)=>{


    axios({
        method: option.method,
        url: `${option.url}/${option.path}`,
        data: option.data,
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
      url: url.replace(/\/$/, ""),
      path: path.replace(/^\//, ""),
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
      token: token,
      data:data
    };
     let saved=JSON.parse(localStorage.getItem("peticiones"))
    
     if(saved){
      if (saved.length>=5) { 
        return console.log("solo se puede guardar 5 peticiones");
       }
      let guardar= localStorage.setItem("peticiones",JSON.stringify([...saved,option]))
      savedquery()
    }else{
      let guardar= localStorage.setItem("peticiones",JSON.stringify([option]))
      savedquery()
    }
  }

  let savedquery=()=>{

    //datos de la peticion guardados
    let  Dguardados= JSON.parse(localStorage.getItem("peticiones"))
    if(Dguardados){
    Dguardados.forEach(element => {
      peticiones.innerHTML+=`<ul id="dato">${JSON.stringify(element)}<ul/>`
      
    });
  }
  }
  savedquery()
