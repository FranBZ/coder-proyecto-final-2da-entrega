import { Schema, model } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    urlImage: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    code: {
        type: Number,
        required: true
    }, 
    stock: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)