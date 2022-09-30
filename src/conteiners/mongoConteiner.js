import { connect, disconnect } from "mongoose"
import { MONGO_URI_LOCAL } from "../config.js"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export class mongoConteiner {
    constructor() { }

    async getAll(model) { // Devuleve todo
        try {
            connect(MONGO_URI_LOCAL, options)
            console.log('Conectado a mongodb, ', db)
            const data = await model.find()
            await disconnect()
            return data
        } catch (error) {
            throw new Error('Error al conectarse a mognodb: ', error)
        }
    }

    async getByID(id, model) { // Devuelve informacion segun un ID
        try {
            connect(MONGO_URI_LOCAL, options)
            const data = await model.findById(id).lean()
            await disconnect()
            return data
        } catch (error) {
            throw new Error('Error al leer db fs por id: ', error)
        }
    }

    async save(obj) { // Crea y asigna un ID y un timestamp
        try {
            connect(MONGO_URI_LOCAL, options)
            await obj.save()
            await disconnect()
        } catch (error) {
            throw new Error('Error al guardar en fs: ', error)
        }
    }

    async updateById(id, obj, model) {
        try {
            connect(MONGO_URI_LOCAL, options)
            await model.findByIdAndUpdate(id, obj)
            await disconnect()
        } catch (error) {
            throw new Error('Error al actualizar en fs por id: ', error)
        }
    }

    async deleteById(id, model) { // Borra segun un ID
        try {
            connect(MONGO_URI_LOCAL, options)
            await model.findByIdAndDelete(id)
            await disconnect()
        } catch (error) {
            throw new Error('Error al borrar en fs por id: ', error)
        }
    }
}