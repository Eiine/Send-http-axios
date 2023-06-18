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
          Swal.fire({
            icon: 'error',
            title: 'Escribiste un dato de peticion erroneo revisa por favor',
            text: 'Revisa que los datos sean correctos!'
          })
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
          Swal.fire({
            icon: 'error',
            title: 'solo se puede guardar 5 peticiones',
            text: 'Intenta eliminar una peticion!'
          })
          return console.log("solo se puede guardar 5 peticiones");
         }
        let guardar= localStorage.setItem("peticiones",JSON.stringify([...saved,option]))
        deleteQuery()
        savedQuery()
      }else{
        let guardar= localStorage.setItem("peticiones",JSON.stringify([option]))
        savedQuery()
      }

  }

  let deleteQuery=()=>{
    peticiones.innerHTML=""
  }

  const asigBoton=()=>{
    let boton1=document.getElementById(`dato-1`)
    let boton2=document.getElementById(`dato-2`)
    let boton3=document.getElementById(`dato-3`)
    let boton4=document.getElementById(`dato-4`)
    let boton5=document.getElementById(`dato-5`)

    boton1.addEventListener("click",(e)=>{ 
      let pars=JSON.parse(e.target.textContent)
       dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
    })

    boton2.addEventListener("click",(e)=>{
      let pars=JSON.parse(e.target.textContent)

       dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
    })
    boton3.addEventListener("click",(e)=>{
      let pars=JSON.parse(e.target.textContent)

       dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
    })
    boton4.addEventListener("click",(e)=>{
      let pars=JSON.parse(e.target.textContent)

       dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
    })
    boton5.addEventListener("click",(e)=>{
      let pars=JSON.parse(e.target.textContent)

       dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
    })
  }

  let savedQuery= ()=>{

    //datos de la peticion guardados
    let  Dguardados= JSON.parse(localStorage.getItem("peticiones"))
    if(Dguardados){
      let contador=0
      Dguardados.forEach(element => {
       contador++
       return peticiones.innerHTML+=`<ul id="dato-${contador}">${JSON.stringify(element)}<ul/>`
    });
      asigBoton()
    
  }
  }
  
  savedQuery()
