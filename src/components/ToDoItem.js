import React, {Component} from 'react'
import { Card, CardContent, Checkbox, Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/todoitems'
})

class ToDoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
        }
    }
    

    handleChange() {
        this.setState({
            checked: !this.state.checked
        })
    }

    deleteItem = () => {
        api.delete("/delete/" + this.props.id).then(() => {
            console.log("deleted successfully")
            this.props.getAllItems()
        })
    }

    editItem = () => {
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
                    <Checkbox size='medium'  color="primary" onChange={this.handleChange.bind(this)} onClick={this.logItem}/>
                    <Button variant="contained" color="primary" onClick={this.deleteItem}>Delete me</Button>
                    <Button onClick={this.editItem}>Edit</Button>
                </div>
            </Card>
        )
    }
}

export default ToDoItem;