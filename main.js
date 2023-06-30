    let dataH = document.getElementById("data-input");
    let nameH = document.getElementById("name-query")
    let methodH = document.getElementById("method-input");
    let urlH = document.getElementById("url-input");
    let pathH = document.getElementById("path-input");
    let tokenH = document.getElementById("token-input");
    let peticiones = document.getElementById("peticiones-saved")
    let show = document.getElementById("show")
    let contact = document.getElementById("contact")
    let responseEmpty = document.getElementById("response-empty")
    let responseLoader = document.getElementById("response-loader")
    let responseContainer = document.getElementById("response-container")
//option recibe un objeto que puede tener token, method, entre otras cosas
const startLoading = () => {
  responseContainer.innerHTML = "";
  responseEmpty.classList.add('none');
  responseLoader.classList.remove('none');
}
const resetLoading = () => {
  responseEmpty.classList.remove('none');
}
const endLoader = () => {
    let peticiones=document.getElementById("peticiones-saved")
    let show= document.getElementById("show")
    let contact=document.getElementById("contact")
   
// Funcion principal, option recibe un objeto que puede tener token, method, entre otras cosas

  responseLoader.classList.add('none');

}
const send_http_axios=(data,option)=>{
  axios({
        method: option.method,
        url: `${option.url}/${option.path}`,
        data:JSON.parse(data),
        headers: {
         "Authorization": option.token,
      },
      })
        .then(response => {
          // Manejo de la respuesta exitosa
          
          if(!option.data.visit && !option.data.message){
            document.getElementById("response-container").textContent = JSON.stringify(response.data, null, 2);
          }
        })
        .finally(() => { endLoader()})
        .catch(error => {
          // Manejo del error
          resetLoading()
          Swal.fire({
              icon: 'error',
              title: 'Tu peticion fallo',
              showConfirmButton: false,
              timer: 1500,
              confirmButtonColor: '#0d6efd',
            })
        });
      }
//Funcion que se encarga de enviar la peticion realizada en el front
let sendRequest = () => {
  startLoading()
  let data = dataH.value;
  let method = methodH.value;
  let url = urlH.value;
  let path = pathH.value;
  let token = tokenH.value;

  let fileInput = document.getElementById('file-input');
  let file = fileInput.files[0];
  if (file) {
    let fileData = new FormData();
    fileData.append('file', file);
    fileData.append('data', data);

    let option = {
      method: method,
      url: url.replace(/\/$/, ''),
      path: path.replace(/^\//, ''),
      data: fileData,
      token: token
    };

    send_http_axios(fileData, option);
  } else {
    let data = dataH.value;
    let option = {
      method: method,
      url: url.replace(/\/$/, ''),
      path: path.replace(/^\//, ''),
      data: data,
      token: token
    };
    send_http_axios(option.data, option);
  }
};

//Funcion encargada de guardar las peticiones que el usuario seleccione
  let saveHttp=()=>{
      let fileInput=document.getElementById("file-input")
    
      let data = dataH.value;
      let method = methodH.value;
      let url = urlH.value;
      let path = pathH.value;
      let token = tokenH.value;
      let name = nameH.value

      const formData = new FormData();
      formData.append('archivo', fileInput.files[0]);
      formData.append('data', data);

      var option = {
        method: method,
        url: url,
        path: path,
        token: token,
        data:formData.get("data"),
        nameP:name,
      };
      
       let saved=JSON.parse(localStorage.getItem("peticiones"))
       let guardado=saved.filter((element)=>element.nameP == option.nameP)
       if (guardado.length>=1){
       return Swal.fire({
          icon: 'error',
          title: 'No puedes ingresar dos nombres de peticion iguales!',
          showConfirmButton: false,
          timer: 1500,
          confirmButtonColor: '#0d6efd',
        })
       }
       if(!option.nameP){
        return Swal.fire({
            icon: 'error',
            title: 'El nombre de peticion no puede estar vacio!',
            showConfirmButton: false,
            timer: 1500,
            confirmButtonColor: '#0d6efd',
          })
       }
       if(saved){
        if (saved.length>=5) { 
          Swal.fire({
              icon: 'error',
              title: 'Solo se puede guardar 5 peticiones!',
              showConfirmButton: false,
              timer: 1500,
              confirmButtonColor: '#0d6efd',
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
 
 //Funcion para compartir trabajon actual
  const findSharequery=()=>{
    
    let datos= window.location.search
    if(datos !== ""){

    let dato2= new URLSearchParams(datos)
      
       dataH.value=dato2.get("data");
       methodH.value=dato2.get("method");
       urlH.value=dato2.get("url");
       pathH.value=dato2.get("path");
       tokenH.value=dato2.get("token");
       nameH.value=dato2.get("name")
    }
  }

  const Sharequery=()=>{
    let datos=window.location.href
      
      let data = dataH.value;
      let method = methodH.value;
      let url = urlH.value;
      let path = pathH.value;
      let token = tokenH.value;
      let name = nameH.value
      let compartir=`${datos}?method=${method}&url=${url}&path=${path}&name=${encodeURIComponent(name)}&token=${token}&data=${encodeURIComponent(data)}&page=1&limit=10`
      navigator.clipboard.writeText(compartir)
      return Swal.fire({
        icon: 'success',
        title: 'Peticion copiada en portapapeles',
        showConfirmButton: false,
        timer: 1500,
        confirmButtonColor: '#0d6efd',
      })
  }
  
  savedQuery()
  send_Visit_message()
  findSharequery()