const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root12345',
    database:'cruddb',
})

app.get('/',(req,res)=>{

    db.query('SELECT * FROM students',(err,result)=>{
        if(err){
            return res.json({Message:"Error inside server"});
        }
        else{
             res.json(result);
           
            
        }
    })

})

app.post('/student',(req,res)=>{
    const Name = req.body.Name;
    const Email = req.body.Email;
    const sql = 'INSERT INTO students ("Name","Email") VALUES (?,?);'
    console.log(req.body);
    db.query(sql,[Name,Email],(err,result)=>{
        if(err){
            return res.json(err);
        }
        else{
            return res.json(result);
            console.log(result);
        }
    })
})

app.get('/read/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id);
    db.query('SELECT * FROM students WHERE id = ?',[id],(err,result)=>{
        if(err){
            return res.json({Message:"Error inside server"});
        }
        else{
             res.json(result);
            console.log(result);
            
        }
    })

})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const Name = req.body.Nmae;
    const Email = req.body.Email;

    db.query('UPDATE students SET Name = ?,Email = ? WHERE id = ?',[Name,Email,id],(err,result)=>{
        if(err){
            return res.json({Message:"inside server error"})
        }
        else{
            return res.json(result);
        }
    })
})


app.listen(6002,()=>{
    console.log("server running....")
})

