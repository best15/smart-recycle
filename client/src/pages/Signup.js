import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import "../assets/styles/Signup.css"


const SingupForm = () => (
    <div className="signup">
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: 300 }}>
                <h2 style={{ color: "teal" }}>
                    Sign Up
                </h2>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user' iconPosition='left' placeholder='UserName' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                        />

                        <Button color='teal' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already Registered? <Link to={`/`}>Login</Link>
                </Message>

            </Grid.Column>
        </Grid>
    </div>

)

export default SingupForm;