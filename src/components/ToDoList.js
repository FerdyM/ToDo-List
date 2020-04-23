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
            items: [

            ]
        }
        this.addItem = this.addItem.bind(this)
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

    addItem(item) {
        if (item.name !== '' && item.task !== '') {
            let items = this.state.items
            console.log(items)
            items.push(item)
            console.log(items)
            this.setState({
                items: items,
            })
        }
        this.deActivateAddItemCard()
    }

    render() {
        return (
            <>
            
            {this.state.addItemCardTriggered ? (
                <>
                    <AddItemCard addItem={this.addItem}/>
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
                    {this.state.items.map((item, index) => <ToDoItem name={item.name} task={item.task} key={index}/>)}
                    
                </>
            )}
                
            </>
        )
    }
} 


class AddItemCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            task: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }

    handleTaskChange(event) {
        this.setState({task: event.target.value})
    }

    render() {
        return (
          <Card className="add-item-card">
              <div className="add-item-title-container">
                <div className="add-item-title">
                    <Typography variant="h5" >Add To-Do Item</Typography>
                </div>
    
              </div>
            <form className="add-item-form" >
                <TextField id="standard-basic" value={this.state.name} label="Name" variant="outlined" onChange={this.handleNameChange}/>
                <TextField id="standard-basic" value={this.state.task} label="Task" variant="outlined" onChange={this.handleTaskChange}/>
            </form>
    
            <div className="add-item-button-box">
                <Button className="add-item-button" variant="contained" color="primary" onClick={() => {
                    let item = {
                        name: this.state.name,
                        task: this.state.task
                    }
                    this.props.addItem(item)
                }}>Add Item</Button>
            </div>
    
          </Card>
        );
    }
  }
export default ToDoList;