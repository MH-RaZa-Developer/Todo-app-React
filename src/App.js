import './App.css';
import { useState, useEffect } from 'react';
import {FormControl, InputLabel, Input, Button} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  //console.log(input);

  useEffect(() =>{
    db.collection('todos').orderBy("timestamp",'desc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo:doc.data().todo})));
    })
  }, [])

  const addTodo = (event) =>{
      event.preventDefault();

      db.collection('todos').add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
  }

  return (
    <div className="App">
      <div style={{background:'#dcdde1',padding:'20px',width:'400px',margin:'auto',borderRadius:'0',position:'sticky', top:'5%', zIndex:'1'}}>
        <h1>Todo App</h1>
        <form>
          <FormControl>
              <InputLabel>Enter Todo Here...</InputLabel>
              <Input style={{width: '250px'}} value={input} onChange={event => setInput(event.target.value)}/>
          </FormControl>
          <Button type="submit" disabled={!input} onClick={addTodo} style={{textTransform:'capitalize',fontSize:'18px'}} variant="contained" color="primary" >Add Todo</Button>
        </form>
      </div>

      <div style={{background:'#a4b0be',width:'410px',padding:'15px',margin:'auto',marginTop:'20px', marginBottom:'20px'}}>
        <center><h2>Add Todo Here <AddCircleOutlineRoundedIcon /></h2></center>
        <ul style={{listStyle:'none',padding:'0'}}>
          {
            todos.map(todo => (<Todo todo={todo} />))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
