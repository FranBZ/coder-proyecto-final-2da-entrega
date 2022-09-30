import { fsConteiner } from '../conteiners/fsConteiner.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbCart = path.join(__dirname, '../database/cart.txt')
const dbProducts = path.join(__dirname, '../database/products.txt')

const carts = new fsConteiner(dbCart)
const productsCont = new fsConteiner(dbProducts)

const saveCart = async (req, res) => {    // Esta funcion guarda un carrito nuevo

    const cart = { products: [] }
    try {
        await carts.save(cart)
        const db = await carts.getAll()
        res.status(200).json({ messaje: `carrito creado con éxito, ID: ${db[db.length - 1].id}` })
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const deleteCartById = async (req, res) => {   // Esta funcion elimina un carrito segun su ID

    const { id } = req.params                                                                   // Tomamos el ID
    try { 
        if(await carts.getByID(id)) {
            await carts.deleteById(id)
            res.status(200).json({ messaje: 'carrito borrado con exito'})
        } else {
            res.status(400).json({ error: 'carrito no encontrado' })
        }
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const getProductsFromCart = async (req, res) => { // Esta funcion muestra todos los productos de un carrito

    const { id } = req.params                                // Tomamos el ID
    try {
        const db = await carts.getByID(id)
        res.send(db.products)
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const saveProductInCartByID = async (req, res) => { // Esta funcion guarda un producto en un carrito
    const { id } = req.params                                           // Tomamos el ID
    const { arrID } = req.body                                          // Tomamos el array de productos a guardar

    try {
        const cart = await carts.getByID(id)
        if (cart) {
            for (let i=0; i<arrID.length; i++) {
                let prod = await productsCont.getByID(arrID[i])
                cart.products.push(prod)
                await carts.updateById(id, cart)
            }
            res.status(200).json({ messaje: 'productos agregados con exito'})
        } else {
            res.status(400).json({ error: 'carrito no encontrado' })
        }
    } catch (error) {
        console.error(`El error es: ${error}`)
    }
}

const deleteProductFromCartByID = async (req, res) => { // Esta funcion borra un producto de un carrito

    const { id, id_prod } = req.params

    try {
        const cart = await carts.getByID(id)
        if (cart) {                                                                             // En caso de encontrarlo
            const prodIndex = cart.products.findIndex(product => product.id == id_prod)         // Buscamos el indice del producto en el array
            if (prodIndex != -1) {                                                                  // En caso de encontra run producto lo borramos
                cart.products.splice(prodIndex, 1)
                await carts.updateById(id, cart)
                res.status(200).json({ messaje: 'producto borrado con éxito' })
            } else {
                res.status(400).json({ error: 'producto no encontrado' })
            }
        } else {
            res.status(400).json({ error: 'carrito no encontrado' })
        }

    } catch (error) {

    }
}

export const cartControllers = {
    saveCart,
    deleteCartById,
    getProductsFromCart,
    saveProductInCartByID,
    deleteProductFromCartByID
}