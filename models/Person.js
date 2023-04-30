const mongoose=require("mongoose")
const schema=mongoose.Schema

const personSchema=new schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        unique:true
    },
    favoriteFoods:{
        type:[String]
    }
})

module.exports=mongoose.model=("persons",personSchema)