const express= require('express');
const Joi = require('joi')
const app= express();
app.use(express.json());

const posts=[
    {id:1, title:"title1", topic:"post1"},
    {id:2, title:"title2", topic:"post2"},
    {id:3, title:"title2",topic:"post3"}
]
app.get ("/", (req,res)=>{
    res.send("hello world")
})
app.get("/posts", (req, res)=>{
    res.send(posts)
})

app.get("/posts/:id", (req, res)=>{
    const post= posts.find(element=>(parseInt( req.params.id)===element.id))
    if(!post)
    res.status(404).send("Post Not Found")
    else
     res.send(post)
})

app.post("/posts", (req,res)=>{

   const {error}= validatepost(req.body);
   if (error){
       res.status(400).send(error.details[0].message)
       return}
    const post={
        id:posts.length+1,
        title: req.body.title,
        topic:req.body.topic
    }

    posts.push(post);
    res.send(post);
})
app.put("/posts/:id", (req,res)=>{
    const post=posts.find(element=> parseInt(req.params.id)=== element.id)
    if (!post)
    return res.status(404).send("post Not Found")
    
    const {error}= validateput(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return}

     post.title=req.body.title;
     post.topic=req.body.topic;
     res.send(post)
 

})

app.delete("/posts/:id", (req,res)=>{
    const post= posts.find(element=>(parseInt(req.params.id)===element.id))
    if (!post){
     res.status(404).send("post Not Found")
     return
    }
    const index=posts.indexOf(post)
    posts.splice(index,1)
    res.send(post )
})

function validatepost(post){
    const schema= Joi.object({title: Joi.string().min(3).required(),topic: Joi.string().min(3).required()})
    return schema.validate(post);
}

function validateput(post){
    const schema= Joi.object({title: Joi.string().min(3),topic: Joi.string().min(3)})
    return schema.validate(post);

}
const port= 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));

