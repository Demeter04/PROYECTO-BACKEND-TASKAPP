const tareas = [
    {
        "_id":"1",
        "titulo":"comprar el mercado",
        "descripcion":{
            "comida":"jamon,queso,comida perro",
            "Jugos":"Verdura para jugo"
        },
        "estado":"inactiva",
        "responsable":"Oscar Urrego"
    },
    {
        "_id":"2",
        "titulo":"Pagar el arriendo",
        "descripcion":"Pagar el arriendo antes del dia 10 de Julio",
        "estado":"inactiva",
        "responsable":"Oscar Urrego"
    },
    {
        "_id":"3",
        "titulo":"Gimnasio",
        "descripcion":"Pagar el arriendo antes del dia 10 de Julio",
        "estado":"inactiva",
        "responsable":"Oscar Urrego"
    },
    {
        "_id": "4",
        "titulo": "limpiar la cocina",
        "descripcion": "limpiar la cocina despues de cocinar",
        "estado": "activa",
        "responsable": "sebas"
    }
]

const crearTarea = async (tarea) => {
    // enviar consulta a la API para crear una tarea
    tarea.estado="inactiva"
    tareas.push(tarea)
}

const obtenerTareas = async () => {

    // enviar consulta a la API para obtener todas las tareas

    return tareas
}

const verTarea = async (id) => {
    // enviar consulta a la API para obtener la tarea con el id
    // alert('tarea obtenida')


    return {
        "_id": "4",
        "titulo": "caminata en las mañanas",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    }
}

const editarTarea = async (id, tareaEditada) => {
    // enviar consulta a la API para obtener la tarea con el id
    alert('tarea editada')
}


const eliminarTarea = async (id) => {
    // enviar consulta a la API para eliminar la tarea con el id
    alert('tarea eliminada')
}

// -----------------------  Renderizar tareas en el HTML , FILTRO -----------------------
const listaTareas = document.getElementById('lista-tareas')
const renderTareas = async () => {


    const ListTareasObtenidas = await obtenerTareas()
    console.log(ListTareasObtenidas)

  
    // BUCLE CON CALLBACK
    ListTareasObtenidas.forEach((tarea)=> {
        console.log(tarea._id)


        const li = document.createElement("li")
        const article = document.createElement("article")

        // AGREGAR ESTILOS A LA DATA YA CREADA
        const data = document.createElement("div")
        data.classList.add("tarea")

        const tareaTitulo = document.createElement("h4")
        const estado = document.createElement("p")
        const responsable = document.createElement("p")


        tareaTitulo.innerText = `Tarea: ${tarea.titulo}`
        estado.innerText = `Estado tarea: ${tarea.estado}`
        responsable.innerText = `Responsable de la tarea: ${tarea.responsable}`

        data.appendChild(tareaTitulo)
        data.appendChild(estado)
        data.appendChild(responsable)
        
        article.appendChild(data)
        li.appendChild(article)
        //AGREGAR DE HIJO A LAS LISTAS
        listaTareas.appendChild(li)

        // ------------------------ BOTONES ----------------------------

        const wrapperBotones = document.createElement("div")
        wrapperBotones.classList.add("wrapper-botones")

        const buttonVerMas = document.createElement("button")
        const buttonEditar = document.createElement("button")
        const buttonEliminar = document.createElement("button")

        buttonVerMas.innerText = " Ver Mas "
        buttonEditar.innerText = " Editar "
        buttonEliminar.innerText = " Eliminar "

        wrapperBotones.appendChild(buttonVerMas)
        wrapperBotones.appendChild(buttonEditar)
        wrapperBotones.appendChild(buttonEliminar)

        article.appendChild(wrapperBotones)
        

 //----------------- AGREGAR ACCION AL BOTON VER MAS 

        buttonVerMas.addEventListener("click", async () => {

           // console.log(tarea._id)
            const tareaObtenida = await verTarea(tarea._id)
            // console.log(tareaObtenida)

            const ShowDescripcion = document.createElement("p")
            ShowDescripcion.innerText = `Descripcion: ${tareaObtenida.descripcion}`
            data.appendChild(ShowDescripcion)

            buttonVerMas.disabled = true
        })
    // ------------------ AGREGAR ACCION AL BOTON EDITAR 

        buttonEditar.addEventListener("click", async () => {
            
            const wrapperFormEditar = document.getElementById("wrapper-form-editar")
            wrapperFormEditar.style.display = "grid"

            const tareaidObtenida = await verTarea(tarea.id)
            console.log(tarea._id)
            

            const editarTitulo = document.getElementById("editar-titulo")
            const editarDescripcion = document.getElementById("editar-descripcion")
            const editarResponsable = document.getElementById("editar-responsable")
            const editarEstado = document.getElementById("editar-estado")

            editarTitulo.value = tareaidObtenida.titulo
            editarDescripcion.value = tareaidObtenida.descripcion
            editarResponsable.value = tareaidObtenida.responsable
            editarEstado.value = tareaidObtenida.estado

            const formEditarTarea = document.getElementById("form-editar-tarea")

        // ------------------ EDITAR TAREA
          formEditarTarea.addEventListener("submit", async (event) => {

            event.preventDefault()

            const datosEditados = Object.fromEntries(new FormData(event.target))
            console.log(datosEditados)

            await editarTarea(tarea._id, datosEditados)

            wrapperFormEditar.style.display = "none"


            renderTareas()


          })   

        })

    })



}



// -----------------------  Abrir y Cerrar ventana crear tarea -----------------------
const wrapperFormCrear = document.getElementById('wrapper-form-crear')

const buttonAbrirFormCrear = document.getElementById('abrir-form-crear')
buttonAbrirFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'grid'
})

const buttonCerrarFormCrear = document.getElementById('cerrar-form-crear')
buttonCerrarFormCrear.addEventListener('click', () => {
    wrapperFormCrear.style.display = 'none'
})



// ------------------------------- Abrir FILTRO -----------------------------
const wrapperFormFiltro = document.getElementById('select-estado')


const buttonAbrirFormFiltro = document.getElementById('filtrar-tareas')
buttonAbrirFormFiltro.addEventListener("click", () =>{
    if (wrapperFormFiltro.style.display === "none")
        {
            wrapperFormFiltro.style.display = "grid"
        }
    else{
        wrapperFormFiltro.style.display = "none"
    }
} )


/* buttonAbrirFormFiltro.addEventListener('click', () => {
    wrapperFormFiltro.style.display = 'grid'
})
 */



// -----------------------  CERRAR ventana editar tarea -----------------------

const buttonCerrarFormEditar = document.getElementById('cerrar-form-editar')
buttonCerrarFormEditar.addEventListener('click', () => {
    const editarTarea = document.getElementById('wrapper-form-editar')
    editarTarea.style.display = 'none'
})

// -----------------------  Crear tarea -----------------------
const formCrearTarea = document.getElementById('form-crear-tarea')
formCrearTarea.addEventListener('submit', async (event) => {

    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target))
    console.log(data)

    console.log(data.titulo)

    await crearTarea(data)

    wrapperFormCrear.style.display = "none"

    renderTareas()


})

// -----------------------  Filtrar tareas por estado -----------------------
let estado = ''
const selectEstado = document.getElementById('select-estado')
selectEstado.addEventListener('change', (e) => {
})

// --------------------------- APENAS CARGUE LA PAGINA HACER LA FUNCION -----------------
window.addEventListener('load', renderTareas)