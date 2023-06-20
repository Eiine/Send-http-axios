    let dataH = document.getElementById("data-input");
    let nameH=document.getElementById("name-query")
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
          
          if(!option.data.visit && !option.data.message){
            document.getElementById("response-container").textContent = JSON.stringify(response.data, null, 2);
          }
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
      let name = nameH.value
      var option = {
        method: method,
        url: url,
        path: path,
        token: token,
        data:data,
        nameP:name
      };
       let saved=JSON.parse(localStorage.getItem("peticiones"))
       if(!option.nameP){
        return alert("El campo nombre de peticion no puede estar vacio")
       }
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
   let boton1=document.getElementById("dato-1")
   let dato1=document.getElementById("dato1-1")
   let boton2=document.getElementById("dato-2")
   let dato2=document.getElementById("dato1-2")
   let boton3=document.getElementById("dato-3")
   let dato3=document.getElementById("dato1-3")
   let boton4=document.getElementById("dato-4")
   let dato4=document.getElementById("dato1-4")
   let boton5=document.getElementById("dato-5")
   let dato5=document.getElementById("dato1-5")
   let delet1=document.getElementById("delete-1")
   let delet2=document.getElementById("delete-2")
   let delet3=document.getElementById("delete-3")
   let delet4=document.getElementById("delete-4")
   let delet5=document.getElementById("delete-5")

   delet1.addEventListener("click",(e)=>{
    
    let pars=JSON.parse(dato1.children[0].textContent)
    let dato=JSON.parse(localStorage.getItem("peticiones"))
    let eliminado=dato.filter((element)=>element.nameP !== pars.nameP)
    let guardar= localStorage.setItem("peticiones",JSON.stringify(eliminado))
    deleteQuery()
    savedQuery()
  })
  if(delet2){
  delet2.addEventListener("click",(e)=>{
 
    let pars=JSON.parse(dato2.children[0].textContent)
    let dato=JSON.parse(localStorage.getItem("peticiones"))
    let eliminado=dato.filter((element)=>element.nameP !== pars.nameP)
    let guardar= localStorage.setItem("peticiones",JSON.stringify(eliminado))
    deleteQuery()
    savedQuery()
  })
  }
  if(delet3){
  delet3.addEventListener("click",(e)=>{
   
    let pars=JSON.parse(dato3.children[0].textContent)
    let dato=JSON.parse(localStorage.getItem("peticiones"))
    let eliminado=dato.filter((element)=>element.nameP !== pars.nameP)
    let guardar= localStorage.setItem("peticiones",JSON.stringify(eliminado))
    deleteQuery()
    savedQuery()
  })
  }
  if (delet4) {
    
  delet4.addEventListener("click",(e)=>{
    
    let pars=JSON.parse(dato4.children[0].textContent)
    let dato=JSON.parse(localStorage.getItem("peticiones"))
    let eliminado=dato.filter((element)=>element.nameP !== pars.nameP)
    let guardar= localStorage.setItem("peticiones",JSON.stringify(eliminado))
    deleteQuery()
    savedQuery()
  })
  }

  if (delet5) {
  delet5.addEventListener("click",(e)=>{
    
    let pars=JSON.parse(dato5.children[0].textContent)
    let dato=JSON.parse(localStorage.getItem("peticiones"))
    let eliminado=dato.filter((element)=>element.nameP !== pars.nameP)
    let guardar= localStorage.setItem("peticiones",JSON.stringify(eliminado))
    deleteQuery()
    savedQuery()
  })

}
   boton1.addEventListener("click",()=>{
    let pars=JSON.parse(dato1.children[0].textContent)
    dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
       nameH.value=pars.nameP
   })
   boton2.addEventListener("click",()=>{
    let pars=JSON.parse(dato2.children[0].textContent)
    dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
       nameH.value=pars.nameP
   })
   boton3.addEventListener("click",()=>{
    let pars=JSON.parse(dato3.children[0].textContent)
    dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
       nameH.value=pars.nameP
   })
   boton4.addEventListener("click",()=>{
    let pars=JSON.parse(dato4.children[0].textContent)
    dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
       nameH.value=pars.nameP
   })
   boton5.addEventListener("click",()=>{
    let pars=JSON.parse(dato5.children[0].textContent)
    dataH.value = pars.data
       methodH.value = pars.method
       urlH.value = pars.url
       pathH.value = pars.path
       tokenH.value = pars.token
       nameH.value=pars.nameP
   })
  
  }

  let savedQuery= async()=>{
  
    //datos de la peticion guardados
    let  Dguardados= JSON.parse(localStorage.getItem("peticiones"))
    if(Dguardados){
      let contador=0
       Dguardados.forEach(element => {
       contador++
       return peticiones.innerHTML+=`
       <li id="dato1-${contador}"><h1 class="btn btn-secondary">${JSON.stringify(element)}</h1></li>
        <p id="dato-${contador}" class="btn btn-secondary">Method: ${element.method}- Url: ${element.url}</p><button id="delete-${contador}" class="btn btn-danger">X</button>
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