import React, { Component} from 'react'
import { Fab, Card, TextField, Button, Typography,} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import ToDoItem from './ToDoItem'
import '../App.css'


class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addItemCardTriggered: false,
        }
    }

    activateAddItemCard = () => {
        this.setState({
            addItemCardTriggered: true,
        })
    }

    deActivateAddItemCard() {
        this.setState({
            addItemCardTriggered: false,
        })
    }
    render() {
        return (
            <>
            
            {this.state.addItemCardTriggered ? (
                <>
                    <AddItemCard />
                    <div className="add-button">
                    <Fab color="primary" aria-label="add" onClick={() => this.deActivateAddItemCard()}>
                        
                        <CloseIcon />
                    </Fab>
                    </div>
                </>
            ) : (
                <>
                    <div className="add-button">
                    <Fab color="primary" aria-label="add" onClick={() => this.activateAddItemCard()}>
                        
                        <AddIcon />
                    </Fab>
                    </div>
                    <ToDoItem name="example to do item" task="example task" />
                    <ToDoItem name="example number two" task="example task" />
                    <ToDoItem name="Do the laundry" task="Make sure to do all of laundry and put it on the line after" />
                </>
            )}
                
            </>
        )
    }
} 


class AddItemCard extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <Card className="add-item-card">
              <div className="add-item-title-container">
                <div className="add-item-title">
                    <Typography variant="h5" >Add To-Do Item</Typography>
                </div>
    
              </div>
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
  }
export default ToDoList;