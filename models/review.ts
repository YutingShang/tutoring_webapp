import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({

    review:{
            original: {
                type:String,
                required: true},
            current: {
                type:String,
                required:false}     //nested structure 
    },
    subject:{
        original: {
            type:String,
            required: true},
        current: {
            type:String,
            required:false}
    },
    level:{
        original: {
            type:String,
            required: true},
        current: {
            type:String,
            required:false}
    },
    name:{//could be 'anon'
        original: {
            type:String,
            required: true},
        current: {
            type:String,
            required:false}
    },
    displayed: {
        type: Boolean,
        required: true                
    },
    date:{      //date taught student
        type: String,      
        required: false
    },
    examBoard:{
        type: String,
        required: false
    }
}, {
    timestamps:true,
}

);

export const ReviewModel = mongoose.models.review || mongoose.model("review", ReviewSchema) //mongo will plural your collection name if not specified 'posts'