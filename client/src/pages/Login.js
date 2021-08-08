import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import "../assets/styles/Login.css"


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginForm = () => {

    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="login">
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>

                <Grid.Column style={{ minWidth: 300 }}>
                    <h2 style={{ color: "teal" }}>
                        Log-in to your account
                    </h2>
                    {data ? (
                        <p>
                            Log in Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (<div>
                        <Form onSubmit={handleFormSubmit} size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid icon='user'
                                    iconPosition='left'
                                    name="username"
                                    placeholder='UserName'
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name="password"
                                    placeholder='Password'
                                    type='password'
                                    value={formState.name}
                                    onChange={handleChange}
                                />

                                <Button color='teal' fluid size='large' type="submit">
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to={`/signup`}>Sign Up</Link>
                        </Message>
                    </div>)}
                    {error && (
                        <h3 style={{ color: "red" }}>
                            {error.message}
                        </h3>

                    )}
                </Grid.Column>

            </Grid>
        </div>

    )
};

export default LoginForm