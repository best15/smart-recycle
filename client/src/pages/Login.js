import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import "../assets/styles/Login.css"


const LoginForm = () => (
    <div className="login">
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ minWidth: 300 }}>
                <h2 style={{ color: "teal" }}>
                    Log-in to your account
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
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to={`/signup`}>Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </div>

)

export default LoginForm