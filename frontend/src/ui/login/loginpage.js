import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import sha1 from "js-sha1"

import * as Yup from 'yup';
import { loginUser, addNewUser } from "../../ducks/users/operations";
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttUnSub,mqttSub,mqttPublish} from '../../mqtt/mqtt.js';





const LoginForm = ({ loading, history, loginUser, users, logUSR, addNewUser},props) => {
    
    useEffect(()=>{
        if(users){
            if(logUSR.login !==''){
                history.push('/')
            }
        }
    }, )

    
   
    

    const [cookies, setCookie] = useCookies(['user']);
    const record = {topic:"default",qos: 0};
    const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
    const publish = (payload) => {mqttPublish({...record,...payload})};
    const subscribe = (topic)=>{mqttSub({...record,"topic":topic})};
    const unsubscribe = (topic)=>{mqttUnSub({...record,"topic":topic})};
    const disconnect = () => {mqttDisconnect()};
    useEffect(()=>{disconnect();connect()},[])

    const handleSubmit = (values) => {
        console.log('ok');
        const loggedUser = users.find(el=>el.login == values.login)
        if(loggedUser){
            if(loggedUser.password == values.password){
                setCookie('login', values.login, { path: '/' })
                setCookie('password', sha1(values.password), { path: '/' })
                console.log("zalogowano");
                console.log(users);
                loginUser(values);
                history.push('/');
                window.location.reload(false);
            }
            else alert('Wrong login or password')
        }else{
            alert('Wrong login or password')
        }
        
        
    }

    const handleRegistartion = (values) => {
        console.log('ok');
        const loggedUser = users.find(el=>el.login == values.login)
        if(!loggedUser){
            setCookie('login', values.login, { path: '/' })
            setCookie('password', sha1(values.password), { path: '/' })
            console.log("utworzono uzytkownika");
            addNewUser(values)
            loginUser({
                login: values.login,
                password: values.password
            });
            
            history.push('/')
            
        }else{
            alert('User with this login already exists')
        }
        
        
    }

    return (
        <div>
            <div className="navigation">
            <h2 className="fbLogoNav"> facebook</h2>

            </div>
            {!loading ? 
            <div className="LoginPage">
                <div className="loginForm">
            <h3>Login to facebook</h3>
            <div className="formLP">
            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                
                
                >
                 {({ errors, touched }) =>(
                     <Form>
                     <Field name="login" placeholder="login"/>
                     {touched.login && errors.login && <div>{errors.login}</div>}
                     <Field name="password" type='password' placeholder="password"/>
                     {touched.password && errors.password && <div>{errors.password}</div>}

                     
                     <button type="submit">
                         Log In
                     </button>
                    </Form>
                 )}
                    
                </Formik>
                </div>
                </div>
                <div className="registerForm">
                <h3>New to facebook? Register now!</h3>
            <div className="formLP">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    login: '',
                    password: '',
                    gender: '',
                    dateOfBirth: '',
                    profilePicture: ''
                }}
                onSubmit={(values) => handleRegistartion(values)}
                
                
                >
                 {({ errors, touched }) =>(
                     <Form>
                    <Field name="firstName" placeholder="Fisrt name"/>
                     {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}
                     <Field name="lastName" placeholder="Last name"/>
                     {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}
                     <Field name="login" placeholder="login"/>
                     {touched.login && errors.login && <div>{errors.login}</div>}
                     <Field name="password" placeholder="password"/>
                     {touched.password && errors.password && <div>{errors.password}</div>}
                     <Field as="select" name="gender" placeholder="Gender">
                     <option defaultValue disabled value=''> Select Gender </option>  
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Field>
                     {touched.gender && errors.gender && <div>{errors.gender}</div>}
                     <Field name="dateOfBirth" placeholder="Birthday Date"/>
                     {touched.dateOfBirth && errors.dateOfBirth && <div>{errors.dateOfBirth}</div>}
                     <Field name="profilePicture" placeholder="Profile Picture (optional)"/>
                     {touched.profilePicture && errors.profilePicture && <div>{errors.profilePicture}</div>}

                     
                     <button type="submit">
                         Register
                     </button>
                    </Form>
                 )}
                    
                </Formik>
                </div>
                </div>
            </div> : <div>loading...</div>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        logUSR: state.users.logged,
        loading: state.users.loading
    }
};

const mapDispatchToProps = {
    loginUser,
    addNewUser
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
