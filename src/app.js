const express = require('express')
//const route =  require('./routes/route')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app =express()
const path = require('path')
const hbs = require("hbs")
const userModel = require("./models/User")
const { error } = require('console')
const routes = express.Router()
const port = process.env.PORT || 3000;

// const multer= require("multer");
// app.use( multer().any())S
// app.use(bodyParser.urlencoded({
//     extended:false
// }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const views = require("../templates/views")

 
const static_path = path.join(__dirname, "../templates/views");//./views
const template_path = path.join(__dirname, "../templates/views");
const template_partials = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(bodyParser.urlencoded({
//     extended:true
// }))

app.use(express.static(static_path)); 
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(template_partials)

app.get("/", (req, res) => {
    res.render("index")
})


mongoose.connect("mongodb+srv://SatyamRandawa:Loveyam@cluster0.d2cql.mongodb.net/?retryWrites=true&w=majority" ,
 { useNewUrlParser: true})
 
.then(() => {
    console.log("MongoDb connected")
}).catch((err) => {
    console.log(err.message)
});



//create New Register Data

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/Login", (req, res) =>{
    res.render("Login")
})

app.get("/Register", (req, res) =>{
    res.render("index")
})

app.get("/Edit", (req, res) =>{
    res.render("edit")
})

app.get("/Delete", (req, res) =>{
    res.render("index")
})

app.post("/Register", async (req, res) =>{
    try{
        //   if(userModel.email === req.body.email){
        //     res.send( "email already exist")
        //   }

        let checkEmail = await userModel.findOne({email:req.body.email})
        if(checkEmail){
           return res.send("This Email is already registered go for login")
        }
        const register = await userModel.create(req.body)
            console.log(register)
            return res.redirect("/Login")
    }catch(error){
        console.log(error)
       return res.status(400).send(error)
    }
})

//////////////////////////////////////////////////////////////////Login///////////////////////////////////////////////////////////////////////////


app.post("/Login", async (req, res) => {

   try{

    let checkEmail = await userModel.findOne({email:req.body.email })
    if(!checkEmail){
        return res.send("Email is not register, gor for registration")
    }

    if(checkEmail.password != req.body.password){
        return res.send("Wrong Password")
    }
     
    var data = checkEmail


    return  res.render('data', {title:'Your... Record', data:data})
    //return res.send({mas:"login sucessfully", data:data} )
}catch(error){
    console.log(error)
    return res.status(400).send(error)
}
    
      
})



////////////////////////////////////////////////////////put data////////////////////////////////////////////////////////////////////////

app.post("/Edit", async(req, res)=>{
    try{
        
        Email = req.body.email
        //console.log(Email)

        let findEmail = await userModel.findOne({email:Email})
        if(!findEmail){
            return res.send("Please enter registered Email")
        }

        let ID = findEmail._id
        //console.log(ID)

        let Update = await userModel.findByIdAndUpdate({_id:ID},{country:req.body.country, state:req.body.state, city:req.body.city},{new:true})
        if(Update){
            return  res.render('data', {title:'Your Record', data:Update})
            //return res.send("Updated Succesfully")
        }

    }catch(error){
          console.log(error)
    }
})


/////////////////////////////////////////////Delete Data///////////////////////////////////////////////////////////////////////////////////////////



app.delete("/Delete", async (req, res) => {
     

})






//app.use('/' , route);

// app.listen( process.env.Port || 3000 ,function(){
//     console.log('App running on port ' + (process.env.PORT || 3000))
// });

app.listen(port, () => {
    console.log(`server connected on ${port}`);
})
