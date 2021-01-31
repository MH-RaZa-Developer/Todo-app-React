import { Avatar, Button, FormControl, Input, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import React, { useState } from 'react';
import './Todo.css';
import db from './firebase';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
      width: 350,
      textAlign: 'center',
      margin: 'auto',
      marginTop: '150px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Todo = (props) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateTodo = (event) =>{

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});
        setInput('');
        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={false}
        >
            <div className={classes.paper}>
                <h1>Update Your Todo</h1>
                <FormControl>
                <InputLabel>Write New Todo...</InputLabel>
                <Input value={input} onChange={e => setInput(e.target.value)}/>
                </FormControl>
                <br />
                <Button disabled={!input} onClick={updateTodo} style={{marginTop:'10px'}} color="primary" variant="contained" size="small">Update</Button> 
                <Button style={{marginLeft: '10px', marginTop: '10px'}} color="secondary" variant="contained" size="small" onClick={e => setOpen(false)}>Cancel</Button>
            </div>
        </Modal>

        <div className="todo_list">
            <List className="list">
                <ListItem>
                    <ListItemAvatar>
                    <Avatar style={{background:'black'}}>
                        <ListAltRoundedIcon style={{color:'#0652DD'}} />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Todo" />
                </ListItem>
                <Tooltip title="Delete" placement="top">
                    <IconButton size="medium">
                        <DeleteIcon color="secondary" onClick={() => db.collection('todos').doc(props.todo.id).delete()} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Update" placement="top">
                    <IconButton size="medium">
                        <UpdateIcon color="primary" onClick={() => setOpen(true)} />
                    </IconButton>
                </Tooltip>
            </List>
        </div>
        </>
    );
};

export default Todo;