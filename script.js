/* 
*   Actividad 93. Funcionalidad 1. Buscar batido en el fronted
*/

// event listener para el boton de busqueda
//document.getElementById('buscar').addEventListener('click', buscarBatido);
document.getElementById('buscador__boton').addEventListener('click', buscarBatido);


async function buscarBatido() {
    //let nombre = document.getElementById('nombre').value;
    let nombre = document.getElementById('buscador__input').value;
    
    let resultado = await fetch(`https://batidoAPI.somee.com/api/batido/buscar/${nombre}`,
    {
        method: 'GET',
        headers:
        {
            'Accept': 'application/json'
        }
    });
 //.then((response) => response.json())
 //.then((data) => mostrarBatido(data));
 /* Sustituyo por condicional
 let data = await resultado.json();
 mostrarBatido(data);
} */
    /* Ante un error 404 por parte del servidor */
    if (resultado.status != 404) {
        let data = await resultado.json();
        mostrarBatido(data);
        } else {
            console.log('Batido no encontrado');
            document.getElementById('texto').innerHTML = '<span style="color:red">Batido no encontrado</span>';
            //alert('Error 404: recurso no encontrado');
    }
}

function mostrarBatido(data) {
    console.log(data);
    //let contenedor = document.getElementById('container');
    let contenedor = document.getElementById('container-todos');
    

    /* limpia el div de elementos al mostrar un resultado de otra busqueda de datos */
    //document.getElementById('container').innerHTML = '';
    document.getElementById('container-todos').innerHTML = '';
    document.getElementById('texto').innerHTML = '';

    /* Si no existe el batido en la base de datos indicara que no se ha encontrado */
    if (data.nombre != null) {

        let nombre = document.createElement('h1');
        nombre.innerHTML = data.nombre;
        contenedor.appendChild(nombre);

        let ingredientes = document.createElement('p');
        ingredientesJuntos = data.ingredientes;
        let arrayIngredientes = ingredientesJuntos.split(',');
        console.log(arrayIngredientes);
        // Cabecera ingredientes
        ingredientes.innerHTML = '<h4 id="recetas-headers">Ingredientes: </h4>';
        for(let i = 0; i < arrayIngredientes.length; i++) {
            // Añadido al contenido del HTML con insertAdjacentHTML https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
            ingredientes.insertAdjacentHTML('beforeend', arrayIngredientes[i] + '<br>');
        }
        //ingredientes.innerHTML = data.ingredientes;
        contenedor.appendChild(ingredientes);

        let preparacionH4 = document.createElement('h4');
        preparacionH4.innerHTML = 'Preparación: ';
        contenedor.appendChild(preparacionH4);

        let preparacion = document.createElement('p');
        preparacion.innerHTML = data.preparacion;
        contenedor.appendChild(preparacion);

        let imagen = document.createElement('img');
        imagen.src = data.fotoSrc;
        contenedor.appendChild(imagen);
    } else {
        document.getElementById('texto').innerHTML = '<span style="color:red">Batido no encontrado</span>';
    }
}


document.getElementById('aleatorio__boton').addEventListener('click', buscarBatidoAleatorio);

// Funcionalidad II
async function buscarBatidoAleatorio() {
       
    //let resultado = await fetch('https://batidosdb.000webhostapp.com/api/cocktail/aleatorio',
    let resultado = await fetch('https://batidoAPI.somee.com/api/batido/aleatorio',
    {
        method: 'GET',
        headers:
        {
            'Accept': 'application/json'
        }
    });
 //.then((response) => response.json())
 //.then((data) => mostrarBatido(data));
 /* Sustituyo por condicional
 let data = await resultado.json();
 mostrarBatido(data);
} */
    /* Ante un error 404 por parte del servidor */
    if (resultado.status != 404) {
        let data = await resultado.json();
        mostrarBatidoAleatorio(data);
        } else {
            console.log('Batido no encontrado');
            document.getElementById('texto').innerHTML = '<span style="color:red">Batido no encontrado</span>';
            //alert('Error 404: recurso no encontrado');
    }
}


function mostrarBatidoAleatorio(data) {
   console.log(data);
    //let contenedor = document.getElementById('container');
    let contenedor = document.getElementById('container-todos');
    

    /* limpia el div de elementos al mostrar un resultado de otra busqueda de datos */
    //document.getElementById('container').innerHTML = '';
    document.getElementById('container-todos').innerHTML = '';
    document.getElementById('texto').innerHTML = '';

   let nombre = document.createElement('h1');
   nombre.innerHTML = data.nombre;
   contenedor.appendChild(nombre);

   let ingredientes = document.createElement('p');
   ingredientesJuntos = data.ingredientes;
   let arrayIngredientes = ingredientesJuntos.split(',');
   console.log(arrayIngredientes);
   // Cabecera ingredientes
   ingredientes.innerHTML = '<h4 id="recetas-headers">Ingredientes: </h4>';
   for(let i = 0; i < arrayIngredientes.length; i++) {
       // Añadido al contenido del HTML con insertAdjacentHTML https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
       ingredientes.insertAdjacentHTML('beforeend', arrayIngredientes[i] + '<br>');
   }
   //ingredientes.innerHTML = data.ingredientes;
   contenedor.appendChild(ingredientes);

   let preparacionH4 = document.createElement('h4');
   preparacionH4.innerHTML = 'Preparación: ';
   contenedor.appendChild(preparacionH4);

   let preparacion = document.createElement('p');
   preparacion.innerHTML = data.preparacion;
   contenedor.appendChild(preparacion);

   let imagen = document.createElement('img');
   imagen.src = data.fotoSrc;
   contenedor.appendChild(imagen);
}




/* Funcionalidad 3. Mostrar todos los batidos */
document.getElementById('todos__boton').addEventListener('click', mostrarTodos);

function mostrarTodos() {
// Actividad 93. Funcionalidad III
fetch('https://batidoAPI.somee.com/api/batido/todos')

.then((response) => response.json())
// .then((data) => console.log(data));
.then((data) => mostrarTodosBatidos(data));
}

function mostrarTodosBatidos(data) {
   console.log(data);
   //let contenedor = document.getElementById('container-main');
   let contenedor = document.getElementById('container-todos');

    /* limpia el div de elementos al mostrar un resultado de otra busqueda de datos */
    //document.getElementById('container').innerHTML = '';
    //document.getElementById('container-main').innerHTML = '';
    document.getElementById('container-todos').innerHTML = '';
    document.getElementById('texto').innerHTML = 'Todos los batidos';

   for(let i = 0; i < data.length; i++) {
        let batidoContainer = document.createElement('div');
        batidoContainer.className = 'batido';

            let nombre = document.createElement('h2');
            nombre.innerHTML = data[i].nombre;
            batidoContainer.appendChild(nombre);
            
            let ingredientes = document.createElement('p');
            ingredientesJuntos = data[i].ingredientes;
            let arrayIngredientes = ingredientesJuntos.split(',');
            console.log(arrayIngredientes);
            // Cabecera ingredientes
            ingredientes.innerHTML = '<h4 id="recetas-headers">Ingredientes: </h4>';
            for(let j = 0; j < arrayIngredientes.length; j++) {
                // Añadido al contenido del HTML con insertAdjacentHTML https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
                ingredientes.insertAdjacentHTML('beforeend', arrayIngredientes[j] + '<br>');
            }
            batidoContainer.appendChild(ingredientes);

            let preparacionH4 = document.createElement('h4');
            preparacionH4.innerHTML = 'Preparación: ';
            batidoContainer.appendChild(preparacionH4);

            let preparacion = document.createElement('p');
            preparacion.innerHTML = data[i].preparacion;
            batidoContainer.appendChild(preparacion);

            let batidoId = document.createElement('p');
            batidoId.innerHTML = 'Id: ' + data[i].id;
            batidoContainer.appendChild(batidoId);
        
            let imagen = document.createElement('img');
            imagen.src = data[i].fotoSrc;
            batidoContainer.appendChild(imagen);

        contenedor.appendChild(batidoContainer);
   }
}
