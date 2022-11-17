import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const[itemText,setItemText]=useState('');
  const[listItems,setListItems]=useState([]);
  const[isUpdating,setIsUpdating]=useState('');
  const [updateItemText,setUpdateItemText]=useState('');

  //add new item to database
  const addItem=async(e)=>{
    e.preventDefault();
    try{
      const res= await axios.post('http://localhost:3300/api/item',{item:itemText})
      setListItems(prev =>[...prev, res.data]);
      console.log('New Item Added');
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  //create function to fetch all todo items from db -- we will use useEffect hook
  useEffect(()=>{
    const getItemsList=async()=>{
      try {
        const res=await axios.get('http://localhost:3300/api/items')
        setListItems(res.data);
        console.log('render');
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  },[])

  //delete items when click on delete
  const deleteItem= async(id)=>{
    try {
      const res= await axios.delete(`http://localhost:3300/api/item/${id}`)
      console.log(res.data);
      console.log('Item Deleted');
      const newListItems=listItems.filter(item=>item._id !==id);
      setListItems(newListItems);
    } catch (err) { 
      console.log(err);
    }
  }

  //update item
  const updateItem=async(e)=>{
    e.preventDefault()
    try {
      const res=await axios.put(`http://localhost:3300/api/item/${isUpdating}`,{item: updateItemText});
      console.log(res.data);
      const updatedItemIndex=listItems.findIndex(item=>item._id===isUpdating);
      const updatedItem=listItems[updatedItemIndex].item= updateItemText;
      console.log(updatedItem.data);
      console.log('Item Updated');
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  }



  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm=()=>(
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}}>
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  );

  

  return (
    <div>
      <div>
        <h1><center>MERN Stack Web Development Project</center></h1>
      </div>
    <div className="App">
      <h1 style={{color:'orange', textShadow: '0px 2px 2px black'}}>Todo List</h1>
      <form className="form" onSubmit={e=>addItem(e)}>
        <input required type="text" placeholder="Add Todo Item" onChange={e=>{setItemText(e.target.value)}} value={itemText} />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item=>(
            <div className="todo-item">
              {
                isUpdating === item._id
                ?renderUpdateForm()
                :<>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                </>
              }
            </div>
          ))
        }
        
      </div>
    </div>
    </div>
  );
}

export default App;
