import React, { Component} from 'react'
import { Fab, Card, TextField, Button, Typography,} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import ToDoItem from './ToDoItem'
import axios from 'axios'
import '../App.css'

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'https://limitless-cove-69990.herokuapp.com/todoitems'
})

class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addItemCardTriggered: false,
            editItemCardTriggered: false,
            currentItem: '',
            items: [],
        }
        this.addItem = this.addItem.bind(this)
        this.getAllItems()
    }

    getAllItems = async () => {
        await api.get("/allitems").then((res) => {
            let allItems = res.data
            this.setState({
                items: allItems,
            })
        })
    }

    activateAddItemCard = () => {
        this.setState({
            addItemCardTriggered: true,
            editItemCardTriggered: false
        })
    }

    deActivateAddItemCard() {
        this.setState({
            addItemCardTriggered: false,
            editItemCardTriggered: false
        })
    }

    activateEditItemCard() {
        this.setState({
            editItemCardTriggered: true,
            
        })

    }
    editItem = (item) => {
        console.log(item)
        this.setState({
            currentItem: item,
        })
        this.activateEditItemCard()
    }

    updateItem = (item) => {
        this.deActivateAddItemCard()
        api.post("/update/" + item.id, {item}).then(() => {
            this.getAllItems()
        }).catch((err) => console.log(err))
    }

    addItem = (item) => {
        if (item.name !== '' && item.task !== '') {
            api.post("/create", {item}).then(() => {
                this.getAllItems()
            }).catch((err) => console.log(err))
        }
        this.deActivateAddItemCard()
    }

    render() {
        return (
            <>
            
            {this.state.addItemCardTriggered ? (
                <>
                    <AddItemCard addItem={this.addItem} currentItem={this.state.currentItem}/>
                    <div className="add-button">
                    <Fab color="primary" aria-label="add" onClick={() => this.deActivateAddItemCard()}>
                        
                        <CloseIcon />
                    </Fab>
                    </div>
                </>
            ) : (
                <>
                    {this.state.editItemCardTriggered ? (<EditItemCard updateItem={this.updateItem} currentItem={this.state.currentItem} />) : (<></>)}
                    <div className="add-button">
                    <Fab color="primary" aria-label="add" onClick={() => this.activateAddItemCard()}>
                        
                        <AddIcon />
                    </Fab>
                    </div>
                    {this.state.items.map((item, index) => <ToDoItem editItem={this.editItem} getAllItems={this.getAllItems} name={item.name} id={item._id} task={item.task} key={index} />)}
                    
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
            task: ''
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

  class EditItemCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.currentItem.name,
            task: this.props.currentItem.task,
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
                    <Typography variant="h5" >Edit To-Do Item</Typography>
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
                        task: this.state.task,
                        id: this.props.currentItem._id
                    }
                    this.props.updateItem(item)
                }}>Update Item</Button>
            </div>
    
          </Card>
        );
    }
  }
export default ToDoList;