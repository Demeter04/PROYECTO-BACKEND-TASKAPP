import bodyParser from "body-parser"
import express from "express"
import client from "./db.js"
import { ObjectId } from "mongodb"


const app = express()
const port = 3000 


// PERMITE RECIBIR DATOS EN EL BODY EN FORMATO JSON
app.use(bodyParser.json())

// DB info
const dbName = 'Task_app'
const tasksCollectionName = 'tasks'


// Obtener Todo
app.get('/api/v1/tareas', async (req, res) => {

    // 1. Conexion a la DB
    await client.connect()
    // 2. Seleccionar la DB
    const taskAppDB = client.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query

    const takslist = await tasksCollection.find({}).toArray()

    // 5. Cerrar conexion
    await client.close()

    res.json({
        message: 'documentos entregados',
        data: takslist
    })
})

// Obtener Uno
app.get('/api/v1/tareas/:id', async (req, res) => {

    let id = req.params.id

    // 1. Conexion a la DB
    await client.connect()
    // 2. Seleccionar la DB
    const taskAppDB = client.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query

    id = ObjectId(id)
    
    await tasksCollection.findOne({
        _id: id,
    })

    // 5. Cerrar conexion
    await client.close()


    res.json({
        message: 'documento entregado'
    })
})

// Crear
app.post('/api/v1/tareas', async (req, res) => {

    const taskdata = req.body 

    // 1. Conexion a la DB
    await client.connect()
    // 2. Seleccionar la DB
    const taskAppDB = client.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query

    const taskcreate = await tasksCollection.insertOne({

        tarea: taskdata.titulo,
        descripcion: taskdata.descripcion,
        estado: "inactiva",
        responsable: taskdata.responsable,


    })

    // 5. Cerrar conexion
    await client.close()


    res.json({

        message: 'documento creado',

        data: taskcreate
    })
})

// Editar
app.put('/api/v1/tareas/:id', async (req, res) => {

    const taskdata = req.body
    let id = req.params.id

    

    // 1. Conexion a la DB
    await client.connect()
    // 2. Seleccionar la DB
    const taskAppDB = client.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    id = new ObjectId(id)
    let modificacion = {}

    if (taskdata.tarea){
        modificacion.tarea = taskdata.tarea
    }
    if (taskdata.descripcion){
        modificacion.descripcion = taskdata.descripcion
    }
    if (taskdata.estado){
        modificacion.estado = taskdata.estado
    }
    if (taskdata.responsable){
        modificacion.responsable = taskdata.responsable
    }
    // 4. Realizar la query


    await tasksCollection.updateOne(
        {_id: id},
        {
           $set:modificacion

        }


    )

    // 5. Cerrar conexion
    await client.close()

    res.json({
        message: 'documento editado'
    })
})

// Eliminar
app.delete('/', async (req, res) => {

    // 1. Conexion a la DB
    await client.connect()
    // 2. Seleccionar la DB
    const taskAppDB = client.db(dbName)
    // 3. Seleccionar la coleccion
    const tasksCollection = taskAppDB.collection(tasksCollectionName)

    // 4. Realizar la query



    // 5. Cerrar conexion
    await client.close()

    res.json({
        message: 'documento eliminado'
    })
})

// PUERTO LOGICO
app.listen(port, () => {
    console.log(`Api escuchando desde el puerto ${port}`)
})