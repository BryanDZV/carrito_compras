const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = []; //array vacio para guardar los cursos seleccionados

cargarEventListeners();
function cargarEventListeners(params) {
  //cuando agrfeagas un curso presionando "agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso); 

  //vaciar el carrito
  vaciarCarrito.addEventListener("click", (e) => {
    e.preventDefault(); //previene el comportamiento por defecto del enlace
    articulosCarrito = []; //resetea el arreglo
    limpiarHTML(); //elimina todo el html
  });
}

//funciones
function agregarCurso(e) {
  e.preventDefault(); //previene el comportamiento por defecto del enlace si tuvieras un enlace no pasaria nada
  //delegation para agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSelecionado = e.target.parentElement.parentElement; //se usa parentElement para subir en el arbol del DOM
    leerDatosCurso(cursoSelecionado);
  }
}
//elimina un curso del carrito
function eliminarCurso(e) { 
  console.log(e.target.classList);
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId); //filter crea un nuevo arreglo con los elementos que cumplen la condicion  
    console.log(articulosCarrito);
    carritoHTML(); //iterar sobre el carrito y mostrar su html actualizado
  }
}



//lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //console.log(curso);
  //crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src, //src para obtener la ruta de la imagen
    titulo: curso.querySelector("h4").textContent, //text Content para obtener el texto
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"), //getAttribute para obtener el valor del atributo data-id u querySelector para seleccionar el elemento
    cantidad: 1,
  };
  //revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id); //some revisa si algun elemento del arreglo cumple con la condicion que se le pasa

  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      //map recorre el arreglo y retorna un nuevo arreglo
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso; //retorna los objetos que no son los duplicados
      }
    }); //map crea un nuevo arreglo con los resultados de la funcion que se le pasa
     articulosCarrito=[...cursos];//se actualiza el arreglo de articulosCarrito con el nuevo arreglo cursos
  } else {
    //agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; //con los ... se hace una copia del arreglo y se agrega el nuevo curso
  }

  console.log(articulosCarrito);
  carritoHTML();
}

//muestra el carrito de compras en el html
function carritoHTML() {
  //limpiar el html

  limpiarHTML();

  //recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso; //destructuring para extraer los valores del objeto curso
    const row = document.createElement("tr"); //crea un elemento tr
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
    `;

    //agrega el html del carrito en el tbody en cada iteracion
    contenedorCarrito.appendChild(row);
  });
}

//elimina los cursos del tbody
function limpiarHTML() {
  // contenedorCarrito.innerHTML='';//forma lenta
  while (contenedorCarrito.firstChild) {
    //mientras haya un hijo en el contenedorCarrito
    contenedorCarrito.removeChild(contenedorCarrito.firstChild); //elimina el primer hijo hasta que no queden mas
  }
}
