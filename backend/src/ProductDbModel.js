import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    quantity:  {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price:  {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export default model('ProductDbModel', ProductSchema);