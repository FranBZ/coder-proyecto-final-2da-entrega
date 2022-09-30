import { Schema, model } from "mongoose"

const cartSchema = Schema({
    products: {
        type: Array,
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Cart', cartSchema)