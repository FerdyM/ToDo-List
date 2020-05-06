import React, {Component} from 'react'
import { Card, Checkbox, Button, ButtonGroup } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import {Close, MoreVert, DeleteOutlined, EditOutlined } from '@material-ui/icons'
import axios from 'axios'
import './stylesheet/ToDoItem.css'

const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: process.env.REACT_APP_DEVSERVER
})

class ToDoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            menu: true,
            toDoItemClass: 'to-do-item'
        }
    }
    
    toggleMenu() {
        this.setState({
            menu: !this.state.menu
        })
    }

    handleChange() {
        if (!this.state.checked) {
            this.setState({
                checked: !this.state.checked,
                toDoItemClass: 'to-do-item-done'
            })
        } else {
            this.setState({
                checked: !this.state.checked,
                toDoItemClass: 'to-do-item'
            })
        }
        
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
            <Card className={this.state.toDoItemClass}>

                <div className="to-do-item-box-1">
                    <Typography variant="h5">{this.props.name}</Typography>
                </div>
                <div className="to-do-item-box-2">
                    <Typography>{this.props.task}</Typography>
                </div>
                <div className="to-do-item-checkbox">
                   
                    <Checkbox size='medium'  className="checkbox" color="primary" onChange={this.handleChange.bind(this)}/>
                    <div className="icon-box">
                        <EditOutlined fontSize="small" className="edit" onClick={this.editItem}>Edit</EditOutlined>
                        <DeleteOutlined fontSize="small" className="delete" onClick={this.deleteItem}>Delete</DeleteOutlined>
                    </div>

                </div>
            </Card>
        )
    }
}

export default ToDoItem;