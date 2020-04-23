import React, {Component} from 'react'
import { Card, CardContent, Checkbox } from '@material-ui/core'
import { Typography } from '@material-ui/core'

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

    render() {
        return (
            <Card className="to-do-item">

                <div className="to-do-item-box-1">
                    <Typography variant="h5">{this.props.name}</Typography>
                </div>
                <div className="to-do-item-box-2">
                    <Typography>{this.props.task}</Typography>
                </div>
                <Checkbox size='medium' className="to-do-item-checkbox" color="primary" onChange={this.handleChange.bind(this)}/>

            </Card>
        )
    }
}

export default ToDoItem;