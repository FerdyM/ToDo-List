import React, { Component} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Card, CardContent, CardActions, TextField, Button, Typography, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import '../App.css'


class ToDoList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            <div className="add-button">
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
                <AddItemCard />
            </>
        )
    }
} 


function AddItemCard() {
  
    return (
      <Card className="add-item-card">

        <Typography className="add-item-title" variant="h5" >Add To-Do Item</Typography>
        <form className="add-item-form">
            <TextField id="standard-basic" label="Name" variant="outlined" />
            <TextField id="standard-basic" label="Task" variant="outlined" />
        </form>

        <div className="add-item-button-box">
            <Button className="add-item-button" variant="contained" color="primary">Add Item</Button>
        </div>

      </Card>
    );
  }
export default ToDoList;