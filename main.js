    let dataH = document.getElementById("data-input");
    let nameH=document.getElementById("name-query")
    let methodH = document.getElementById("method-input");
    let urlH = document.getElementById("url-input");
    let pathH = document.getElementById("path-input");
    let tokenH = document.getElementById("token-input");
    let peticiones=document.getElementById("peticiones-saved")
    let show= document.getElementById("show")
    let contact=document.getElementById("contact")
    let fileImput=document.getElementById("file-input")
// Funcion principal, option recibe un objeto que puede tener token, method, entre otras cosas

const send_http_axios=(data,option)=>{
  
  axios({
        method: option.method,
        url: `${option.url}/${option.path}`,
        data: option.data,
        headers: { 'Content-Type':'application/json',
         "authorization": option.token,
         'Content-Type': 'multipart/form-data'
      },
      })
        .then(response => {
          // Manejo de la respuesta exitosa
          console.log(response.data.results);
          
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
//Funcion que se encarga de enviar la peticion realizada en el front
let sendRequest=()=>{

    let data = dataH.value;
    let method = methodH.value;
    let url = urlH.value;
    let path = pathH.value;
    let token = tokenH.value;
    const formData = new FormData();
      formData.append('archivo', form.files[0]);
      formData.append('data', data);
    let option = {
      method: method,
      url: url.replace(/\/$/, ""),
      path: path.replace(/^\//, ""),
      data:formData,
      token: token
    };
    send_http_axios(data, option);
  }
//Funcion encargada de guardar las peticiones que el usuario seleccione
  let saveHttp=()=>{
      
    
      let data = dataH.value;
      let method = methodH.value;
      let url = urlH.value;
      let path = pathH.value;
      let token = tokenH.value;
      let name = nameH.value

      const formData = new FormData();
      formData.append('archivo', fileImput.files[0]);
      formData.append('data', data);
      console.log(formData);
      var option = {
        method: method,
        url: url,
        path: path,
        token: token,
        data:formData,
        nameP:name,
      };
      
       let saved=JSON.parse(localStorage.getItem("peticiones"))
       let guardado=saved.filter((element)=>element.nameP == option.nameP)
       if (guardado.length>=1){
       return Swal.fire({
          icon: 'error',
          title: 'No puedes ingresar dos nombres de peticion iguales!',
          text: 'Revisa que los datos sean correctos!'
        })
       }
       if(!option.nameP){
        return Swal.fire({
          icon: 'error',
          title: 'El nombre de peticion no puede estar vacio!',
          text: 'Revisa que los datos sean correctos!'
        })
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
//funcion encargada de eliminar de pantalla lasfunciones para dar espacio a otras
  let deleteQuery=()=>{
    peticiones.innerHTML=""
  }
//Fucnion encargada de reasignar los valores de una peticion guardada al form
  const itemData=(e,element)=>{
  let pars=element
   
           dataH.value = pars.data
           methodH.value = pars.method
           urlH.value = pars.url
           pathH.value = pars.path
           tokenH.value = pars.token
           nameH.value=pars.nameP
  }
//Funcion encargada de eliminar de las peticiones guardadas los item que el usuario considere
  const itemDelet=(e,element)=>{
    let pars=element
    let dato=JSON.parse(localStorage.getItem("peticiones"))
    let eliminado=dato.filter((element)=>element.nameP !== pars.nameP)
    let guardar= localStorage.setItem("peticiones",JSON.stringify(eliminado))
    deleteQuery()
    savedQuery()
  }
//Funcion encargada crear los objetos para seleccionar funciones y la asignacion de itemDelet, itmeData
  let savedQuery= async()=>{
  
    //datos de la peticion guardados
    let  Dguardados= JSON.parse(localStorage.getItem("peticiones"))
    if(Dguardados){
      let contador=0
       Dguardados.forEach(element => {
       contador++
       return peticiones.innerHTML+=`
        <p onclick='itemData(event,${JSON.stringify(element)})' class="btn btn-secondary">Name: ${element.nameP}</p><button onclick='itemDelet(event,${JSON.stringify(element)})' class="btn btn-danger">X</button>
       `
    });
    
  }
  }

//Funcion encargada de enviar las visitas a la pagina de control backend
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

 //Evento que envia los mensajes del formulario de contact al backend
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
    Swal.fire('Mensaje enviado muchas gracias! :3 ')
    e.target.reset()
 })
  
  savedQuery()
  //send_Visit_message()