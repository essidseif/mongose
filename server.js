const express=require("express")
const connectDB=require("./config/connectDB")
const app=express()
const mongoose=require("mongoose")
const person=require("./routes/person")


app.use(express.json())

app.use('/person', require("./routes/person"))


connectDB()

const port=5000
app.listen(port,(err)=>{
    err?console.log(err):console.log(`server is running on port ${port}`)
})