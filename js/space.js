let content = document.getElementById("content");
let inputBuscar = document.getElementById("inputBuscar");
let btnBuscar = document.getElementById("btnBuscar");
// let url= "https://images-api.nasa.gov/search?q=";



let getJSONData = function(url) {
    let result = {};
 
    return fetch(url)
    .then (response => {
        if (response.ok){
            return response.json();
        }else {
            throw Error(response.statusText);
        }
        
    })
    .then(function(response){
        result.status = 'ok';
        result.data = response;

        return result;
    })
    .catch(function(error){
        result.status = 'error';
        result.data = error;

        return result;
    })
}


btnBuscar.addEventListener("click", () => {
    content.innerHTML = "";
    url = "https://images-api.nasa.gov/search?q=" + inputBuscar.value;

    getJSONData(url).then(function(resultObj){
      
     
    //Esto es una destructuracion, es una característica de js que permite extraer valores de objetos y arreglos.
    // se podria ver de esta manera const resultObj.data = {collection: {items}}
      const {collection: {items}} = resultObj.data;

     console.log(items);
    //lo utilize para extraer la propiedad items del objeto collection que está dentro del objeto resultObj.data.
  
    for(let i=0; i < items.length; i++){
      let item = items[i]
      let links = item.links[0];
      let data = item.data[0];
      
  
      content.innerHTML += `
          
        <div class="card">
            <div class="card-header">
                <img src="${links.href}">
            </div>
                    
            <div class="card-body">
                <h3 class="card-tittle">${data.title}</h3>
                <p class="card-description">${data.description}</p>
                <p>${data.date_created}</p>
            </div>
        </div>
       
      `
    }
    })
    
    
  })

  