import { Contenedor } from '../contenedor.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbProducts = path.join(__dirname, '../database/products.txt')

const prodcuts = new Contenedor(dbProducts)

const administrador = true

const getProductById = async (req, res) => {  // Esta funcion devuelve un producto segun su ID
    const { id } = req.params
    try {
        if (!id) {
            res.send(await prodcuts.getAll())                         // en caso de no pasar id devolvemos todos los productos
        } else {
            const product = await prodcuts.getByID(id)
            if (product) {
                res.send(product)
            } else {
                res.status(400).json({ error: 'producto no encontrado' })
            }
        }

    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveProduct = async (req, res) => {        // Guarda un prodcuto nuevo
    if (administrador == true) {
        const { name, price, urlImage, description, code, stock } = req.body                              // Tomamos el cuerpo

        if (!name || !price || !urlImage || !description || !code || !stock) {                          // Comprobamos que el cuerpo este completo
            res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
        } else {

            const product = req.body                                                                      // Tomamos el cuerpo 
            try {
                await prodcuts.save(product)                                                              // Se lo pasamos al contendor
                res.status(200).json({ messaje: 'producto guardado con exito' })
            } catch (error) {
                console.error(`El error es: ${error}`)
            }
        }
    } else {
        res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    }
}

const updateProductByID = async (req, res) => {  // Recibe y actualiza un producto según su id.
    if (administrador == true) {
        const { id } = req.params                                                                   // Tomamos el ID
        const { name, price, urlImage, description, code, stock } = req.body                        // Tomamos el cuerpo

        if (!name || !price || !urlImage || !description || !code || !stock) {                    // Comprobamos que el cuerpo este completo
            res.status(400).json({ error: 'por favor ingrese todos los datos del producto' })
        } else {
            try {
                const product = await prodcuts.getByID(id)
                if (product) {
                    product.name = name
                    product.price = price
                    product.urlImage = urlImage
                    product.description = description
                    product.code = code
                    product.stock = stock
                    await prodcuts.updateById(id, product)
                    res.status(200).json({ messaje: 'producto actualizado con exito' })
                } else {
                    res.status(400).json({ error: 'producto no encontrado' })
                }
            } catch (error) {
                console.error(`El error es: ${error}`)
            }
        }
    } else {
        res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    }
}

const deleteProductById = async (req, res) => {   // Esta funcion elimina un producto segun su ID
    if (administrador == true) {
        const { id } = req.params
        try {
            await prodcuts.deleteById(id)
            res.status(200).json({ messaje: 'producto borrado con exito' })
        } catch (error) {
            console.error(`El error es: ${error}`)
        }
    } else {
        res.status(400).json({ messaje: 'usted no tiene permisos para consultar esta url' })
    }
}

export const productsController = {
    getProductById,
    saveProduct,
    updateProductByID,
    deleteProductById
}