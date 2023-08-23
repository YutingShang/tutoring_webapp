import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({

    review:{
        type: String, //{review: String, name: String, level: String, subject:String},
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    level:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true   //could be 'anon'
    }
}, {
    timestamps:true,
}

);

export const ReviewModel = mongoose.models.review || mongoose.model("review", ReviewSchema) //mongo will plural your collection name if not specified 'posts'