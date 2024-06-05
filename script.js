const tareas = [
    {
        "_id":"1",
        "tarea":"comprar el mercado",
        "descripcion":{
            "comida":"jamon,queso,comida perro",
            "Jugos":"Verdura para jugo"
        },
        "estado":"inactiva",
        "responsable":"Oscar Urrego"
    },
    {
        "_id":"2",
        "tarea":"Pagar el arriendo",
        "descripcion":"Pagar el arriendo antes del dia 10 de Julio",
        "estado":"inactiva",
        "responsable":"Oscar Urrego"
    },
    {
        "_id":"3",
        "tarea":"Gimnasio",
        "descripcion":"Pagar el arriendo antes del dia 10 de Julio",
        "estado":"inactiva",
        "responsable":"Oscar Urrego"
    },
    {
        "_id": "4",
        "tarea": "limpiar la cocina",
        "descripcion": "limpiar la cocina despues de cocinar",
        "estado": "activa",
        "responsable": "sebas"
    }
]

const crearTarea = async (tarea) => {
    // enviar consulta a la API para crear una tarea
    alert('tarea creada')
}

const obtenerTareas = async () => {

    // enviar consulta a la API para obtener todas las tareas

    return tareas
}

const verTarea = async (id) => {
    // enviar consulta a la API para obtener la tarea con el id
    alert('tarea obtenida')
    return {
        "_id": "4",
        "tarea": "caminata en las mañanas",
        "descripcion": "salir a caminar en las mañanas",
        "estado": "activa",
        "responsable": "sebas"
    }
}

const editarTarea = async (id) => {
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

    // BUCLE PARA RECORRER CADA TAREA
   /*  for ( i = 0; i >= ListTareas.length; i++ ){

    } */
    
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


        tareaTitulo.innerText = `Tarea: ${tarea.tarea}`
        estado.innerText = `Estado tarea: ${tarea.estado}`
        responsable.innerText = `Responsable de la tarea: ${tarea.responsable}`

        data.appendChild(tareaTitulo)
        data.appendChild(estado)
        data.appendChild(responsable)
        
        article.appendChild(data)
        li.appendChild(article)
        //AGREGAR DE HIJO A LAS LISTAS
        listaTareas.appendChild(li)
/*         listaTareas.classList(flex)
 */
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

// -----------------------  Abrir ventana editar tarea -----------------------
const buttonCerrarFormEditar = document.getElementById('cerrar-form-editar')
buttonCerrarFormEditar.addEventListener('click', () => {
    const editarTarea = document.getElementById('wrapper-form-editar')
    editarTarea.style.display = 'none'
})

// -----------------------  Crear tarea -----------------------
const formCrearTarea = document.getElementById('form-crear-tarea')
formCrearTarea.addEventListener('submit', async (e) => {

})

// -----------------------  Filtrar tareas por estado -----------------------
let estado = ''
const selectEstado = document.getElementById('select-estado')
selectEstado.addEventListener('change', (e) => {
})

// --------------------------- APENAS CARGUE LA PAGINA HACER LA FUNCION -----------------
window.addEventListener('load', renderTareas)