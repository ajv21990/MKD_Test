import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";

import './styleSheets/formStyle.css'





export default class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fName: "",
            lName: "",
            email: "",
            message: "",
            MessageID: 0
        }
    }
    //Function that sends nessage to DynamoDB
    Submit = async (id, message, subject, email) => {
        try {
            message = this.state.message
            subject = `${this.state.fName} ${this.state.lName}`
            email = this.state.email
            this.SendEmail(email, message, subject)

            //Creating a random ID for DynamoDB
            id = this.state.MessageID + (Math.floor((Math.random() * 100) + 1))

            //Creating object to send to API
            let messageSent = {
                "MessageID": id,
                "message": message
            }
            messageSent = JSON.stringify(messageSent)
            await axios.post('https://cors-anywhere.herokuapp.com/https://kxj3qb0agb.execute-api.us-west-2.amazonaws.com/beta/message', messageSent)
        } catch (err) {
            alert(err)
        }

    }


    //Function that sends email
    SendEmail = async (email, message, subject) => {
        try {
            let emailSent = {
                "email": email,
                "subject": subject,
                "message": message
            }
            emailSent = JSON.stringify(emailSent)
            await axios.post('https://cors-anywhere.herokuapp.com/https://kxj3qb0agb.execute-api.us-west-2.amazonaws.com/beta/send', emailSent)
        } catch (err) {
            alert(err)
        }

    }


    render() {

        return (
            <div>
                <h1>CONTACT FORM</h1>
                <form className="form">
                    <TextField
                        id="FirstName"
                        fullWidth="true"

                        label="First Name"
                        margin="normal"
                        variant="outlined"
                        value={this.state.fName}
                        onChange={event => this.setState({ fName: event.target.value })}
                    />
                    <br />
                    <TextField
                        id="LastName"
                        fullWidth="true"

                        label="Last Name"
                        margin="normal"
                        variant="outlined"
                        value={this.state.lName}
                        onChange={event => this.setState({ lName: event.target.value })}
                    />
                    <br />
                    <TextField
                        fullWidth="true"
                        type="email"
                        id="Email"
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        value={this.state.email}
                        onChange={event => this.setState({ email: event.target.value })}
                    />
                    <br />
                    <TextField
                        fullWidth="true"
                        multiline
                        rows="4"
                        id="Message"
                        label="Message"
                        margin="normal"
                        variant="outlined"
                        value={this.state.message}
                        onChange={event => this.setState({ message: event.target.value })}
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="default" onClick={this.Submit} >SUBMIT</Button>
                </form>
            </div>

        )
    }
} 