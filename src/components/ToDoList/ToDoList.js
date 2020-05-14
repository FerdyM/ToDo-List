import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import { Fab, Card, TextField, Button, Typography,} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import ToDoItem from '../ToDoItem/ToDoItem'
import axios from 'axios'
import Nav from '../Nav/Nav'
import LandingPage from '../LandingPage/LandingPage'
import './stylesheet/ToDoList.css'

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'https://salty-brushlands-62535.herokuapp.com/'
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
    }

    componentWillMount() {
        this.getAllItems()
    }

    componentDidMount() {
        console.log(this.props.username)
    }

    getAllItems = async () => {
        await api.post("/todoitems/allitems/", {username: this.props.username}).then((res) => {
            let allItems = res.data
            this.setState({
                items: allItems,
            })
        }).catch(err => console.log(err))
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
        api.post("/todoitems/update/" + item.id, {item}).then(async () => {
            await this.getAllItems()
        }).catch((err) => console.log(err))
    }

    addItem = (item) => {
        let newItem = {
            name: item.name,
            task: item.task,
            username: this.props.username
        }
        if (item.name !== '' && item.task !== '') {
            api.post("/todoitems/create/", {newItem}).then(() => {
                this.getAllItems()
            }).catch((err) => console.log(err))
        }
        this.deActivateAddItemCard()
    }

    render() {

        if (this.props.loggedIn) {
            return (
            <>
            
            {this.state.addItemCardTriggered ? (
                <>
                    <Nav username={this.props.username} loggedIn={this.props.loggedIn} updateUser={this.props.updateUser}/>
                    <div>
                        <AddItemCard addItem={this.addItem} currentItem={this.state.currentItem}/>
                        <div className="add-button">
                        <Fab color="primary" aria-label="add" onClick={() => this.deActivateAddItemCard()}>
                            
                            <CloseIcon />
                        </Fab>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Nav username={this.props.username} loggedIn={this.props.loggedIn} updateUser={this.props.updateUser}/>
                    <div>
                        {this.state.editItemCardTriggered ? (<EditItemCard updateItem={this.updateItem} currentItem={this.state.currentItem} />) : (<></>)}
                        <div className="add-button">
                        <Fab color="primary" aria-label="add" onClick={() => this.activateAddItemCard()}>
                            
                            <AddIcon />
                        </Fab>
                        </div>
                        {this.state.items.map((item, index) => <ToDoItem editItem={this.editItem} getAllItems={this.getAllItems} name={item.name} id={item._id} task={item.task} key={index} />)}
                        
                    </div>
                </>
            )}
                
            </>
        )} else {
            return (
                <LandingPage />
            )
        }
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
                <Typography variant="h4" >Add To-Do Item</Typography>
            <form className="add-item-form" >
                    <TextField id="standard-basic" value={this.state.name} label="Name" variant="outlined" onChange={this.handleNameChange}/>
                    <br></br>
                    <TextField id="standard-basic" value={this.state.task} label="Task" variant="outlined" onChange={this.handleTaskChange}/>
                    <br></br>
                    <Button className="add-item-button" variant="contained" color="primary" onClick={() => {
                    let item = {
                        name: this.state.name,
                        task: this.state.task
                    }
                    this.props.addItem(item)
                    }}>Add Item</Button>
            </form>
    
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
            <Typography variant="h4" >Edit To-Do Item</Typography>
            <form className="add-item-form" >
                <TextField id="standard-basic" value={this.state.name} label="Name" variant="outlined" onChange={this.handleNameChange}/>
                <br></br>
                <TextField id="standard-basic" value={this.state.task} label="Task" variant="outlined" onChange={this.handleTaskChange}/>
                <br></br>
                <Button className="add-item-button" variant="contained" color="primary" onClick={() => {
                    let item = {
                        name: this.props.currentItem.name,
                        task: this.props.currentItem.task,
                        id: this.props.currentItem.id,
                    }
                    this.props.updateItem(item)
                    }}>Edit Item</Button>
            </form>
    
                
    
          </Card>
        );
    }
}

export default ToDoList;