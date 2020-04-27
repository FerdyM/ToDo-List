import React, {Component} from 'react'
import { Card, CardContent, Checkbox, Button, ButtonGroup } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import  MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'https://limitless-cove-69990.herokuapp.com/todoitems'
})

class ToDoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            menu: true
        }
    }
    
    toggleMenu() {
        this.setState({
            menu: !this.state.menu
        })
    }

    handleChange() {
        this.setState({
            checked: !this.state.checked
        })
    }

    deleteItem = () => {
        this.toggleMenu()
        api.delete("/delete/" + this.props.id).then(() => {
            console.log("deleted successfully")
            this.props.getAllItems()
        })
    }

    editItem = () => {
        this.toggleMenu()
        api.get("/edit/" + this.props.id).then((res) => {
            this.props.editItem(res.data)
        })
    }

    render() {
        return (
            <Card className="to-do-item">

                <div className="to-do-item-box-1">
                    <Typography variant="h5">{this.props.name}</Typography>
                </div>
                <div className="to-do-item-box-2">
                    <Typography>{this.props.task}</Typography>
                </div>
                <div className="to-do-item-checkbox">
                   
                    <Checkbox size='medium'  color="primary" onChange={this.handleChange.bind(this)}/>
                    {this.state.menu ? 
                        (<MoreVertIcon onClick={this.toggleMenu.bind(this)}/>) 
                        : (
                            <>
                                <CloseIcon onClick={this.toggleMenu.bind(this)}/>
                                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                    <Button variant="contained" color="primary" onClick={this.deleteItem}>Delete</Button>
                                    <Button onClick={this.editItem}>Edit</Button>
                                </ButtonGroup>
                            </>
                        )}
                </div>
            </Card>
        )
    }
}

export default ToDoItem;