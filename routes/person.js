const express = require('express')

const router=express.Router()
const Person=require('../models/Person')


router.post("/", async (req,res)=>{
    const {name, age, favoriteFoods}= req.body
    try{
    const newPerson = new Person({
        name,
        age,
        favoriteFoods
    })
    const person = await newPerson.save()
    res.send({msg:"person added", person})
} catch (err) {
    console.log(err)}
})



router.post(("/creat"),(req, res)=> {
    const arrayOfPepole=req.body.arrayOfPepole
    Person.create(arrayOfPepole)
    .then((newPerson)=>res.json(newPerson))
    .catch((err)=>console.log(err))
    });


    router.get(("/:name"),(req, res)=> {
    var {name}=req.params
    Person.find({name})
    .then(newPerson=>res.json(newPerson))
   .catch(err=>console.log(err))
  });
 

  router.get(("/:food"),(req, res)=> {
    var {food}=req.params
    Person.findOne({favoriteFoods:food})
      .then(newPerson=>res.json(newPerson))
     .catch(err=>console.log(err))
    })
  
    router.get('find/:_id',(req,res)=>{
          const personId = req.params._id
          Person.findById({_id:personId })
          .then(newPerson=>res.send(newPerson))
          .catch(err=>console.log(err))
      })


    router.post('/findeditsave/:_id',(req, res) => {
    const personId = req.params._id
    const [foodadd] = req.body.favoriteFoods
              Person.findById({_id:personId },(err,data)=>{
                if (err) {console.log(err)}else{data.favoriteFoods.push(foodadd)
                data.save()
              res.send(data)};
                });
            });

//Perform New Updates on a Document Using model.findOneAndUpdate :

router.put('/findupdate/:name',(req, res) => {
    var ageSet = req.body.age
    var personName = req.params.name;
    Person.findOneAndUpdate(
        {name: personName},
        {$set: {age:ageSet}},{new : true})
        .then((newPerson)=>res.send(newPerson))
        .catch(err=>console.log(err))
      });
    

      router.delete('/findremove/:_id',(req, res) => {
        const personId = req.params._id
        Person.findByIdAndRemove({_id:personId })
        .then((newPerson)=>res.send(newPerson))
        .catch(err=>console.log(err))
  
          });


router.delete('/removeperson/:name',(req, res) => {
            var nameToRemove = req.params.name;
  
          Person.remove({name: nameToRemove})
          .then((newPerson)=>res.send(newPerson))
          .catch(err=>console.log(err))
        });

//Chain Search Query Helpers to Narrow Search Results :

router.get('/search/:food',(req, res) => {
          const {food} = req.params;
           Person.find({favoriteFoods:food}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
               err ? res.status(400).send(err):res.send(data);
               console.log(data);
           });
       });
  
    module.exports = router;