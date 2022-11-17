const router=require('express').Router();
//import todo model
const todoItemsModel=require('../models/todoItems');

//lets create our first route - we will add todo item to our db

router.post('/api/item',async(req,res)=>{
    try{
        const newItem=new todoItemsModel({
            item: req.body.item
        })
        //save this item in db
        const saveItem= await newItem.save()
        res.status(200).json(saveItem);
    }
    catch(err){
        res.json(err);
    }
})

//lets create second route -- get data from db
router.get('/api/items',async(req,res)=>{
    try{
        const allTodoItems= await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err);
    }
})

//lets update item
router.put('/api/item/:id',async(req,res)=>{
    try{
        const updateItem=await todoItemsModel.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json(updateItem);
    }catch(err){
        res.json(err);
    }
})

//lets delete item from db
router.delete('/api/item/:id',async(req,res)=>{
    try{
        const deleteItem=await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteItem);

    }catch(err){
        res.json(err);
    }
})



//export router
module.exports=router;