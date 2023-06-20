    let dataH = document.getElementById("data-input");
    let methodH = document.getElementById("method-input");
    let urlH = document.getElementById("url-input");
    let pathH = document.getElementById("path-input");
    let tokenH = document.getElementById("token-input");
    let peticiones=document.getElementById("peticiones-saved")
    let show= document.getElementById("show")
    let contact=document.getElementById("contact")
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
          console.log(response.data.message);
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
      
let sendRequest=()=>{
    let data = dataH.value;
    let method = methodH.value;
    let url = urlH.value;
    let path = pathH.value;
    let token = tokenH.value;
    
    let option = {
      method: method,
      url: url.replace(/\/$/, ""),
      path: path.replace(/^\//, ""),
      data:data,
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
    let dato1=document.getElementById("dato1-1")
  
    boton1.addEventListener("click",(e)=>{
      let pars=JSON.parse(dato1.target.textContent)
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

  let savedQuery= async()=>{
  
    //datos de la peticion guardados
    let  Dguardados= JSON.parse(localStorage.getItem("peticiones"))
    if(Dguardados){
      let contador=0
      await Dguardados.forEach(element => {
       contador++
       return peticiones.innerHTML+=`
       <li id="dato1-${contador} ><h1 class="btn btn-secondary">${JSON.stringify(element)}</h1>
       <button class="btn btn-danger">X</button></li>
        <p id="dato-${contador} "class="btn btn-secondary">Method: ${element.method}- Url: ${element.url}</p><button class="btn btn-danger">X</button>
       `
    });
      asigBoton()
  }
  }

  const send_Visit_message=()=>{
    let data={
      visit:1,
    }
    
    let option = {
      method:"post",
      url: "https://contol-de-mensajes-y-visitas.onrender.com".replace(/\/$/, ""),
      //url:"http://localhost:3000/".replace(/\/$/, ""),
      path: "api/message".replace(/^\//, ""),
      data:data
    };
    

    send_http_axios(data,option)
  }

 //Envio de formulario
 contact.addEventListener("submit",(e)=>{
    e.preventDefault()
    var formData = new FormData(e.target);
      var name = formData.get("name");
      var message = formData.get("message");
    let data={
      name:name,
      message:message
    }
    console.log(data);
    let option = {
      method:"post",
      url: "https://contol-de-mensajes-y-visitas.onrender.com".replace(/\/$/, ""),
      //url:"http://localhost:3000/".replace(/\/$/, ""),
      path: "api/message".replace(/^\//, ""),
      data:data
    };
    

    send_http_axios(data,option)
 })
  
  savedQuery()
  send_Visit_message()