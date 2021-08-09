import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import "../assets/styles/Signup.css"

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SingupForm = () => {

    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();


        try {

            const { data } = await addUser({
                variables: { ...formState },
            });


            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div className="signup">
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                {data ? (
                    <p>
                        Success! You may now head{' '}
                        <Link to="/">back to the homepage.</Link>
                    </p>
                ) : (
                    <Grid.Column style={{ minWidth: 300 }}>
                        <h2 style={{ color: "teal" }}>
                            Sign Up
                        </h2>

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
                                    Sign Up
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already Registered? <Link to={`/login`}>Login</Link>
                        </Message>

                    </Grid.Column>
                )}
                {error && (
                    <h3 style={{ color: "teal" }}>
                        {error.message}
                    </h3>

                )}
            </Grid>
        </div>

    )
};
export default SingupForm;