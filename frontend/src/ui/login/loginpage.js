import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import * as Yup from 'yup';
import { loginUser, addNewUser } from "../../ducks/users/operations";





const LoginForm = ({ loading, history, loginUser, users, logUSR, addNewUser},props) => {
    useEffect(()=>{
        if(users){
            if(logUSR.login !==''){
                history.push('/wall')
            }
        }
    }, )

   
    

    const [cookies, setCookie] = useCookies(['user']);

    const handleSubmit = (values) => {
        console.log('ok');
        const loggedUser = users.find(el=>el.login == values.login)
        if(loggedUser){
            if(loggedUser.password == values.password){
                setCookie('login', values.login, { path: '/' })
                setCookie('password', values.password, { path: '/' })
                console.log("zalogowano");
                console.log(users);
                loginUser(values);
                history.push('/wall')
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
            setCookie('password', values.password, { path: '/' })
            console.log("utworzono uzytkownika");
            loginUser({
                login: values.login,
                password: values.password
            });
            addNewUser(values)
            history.push('/wall')
            
        }else{
            alert('User with this login already exists')
        }
        
        
    }

    return (
        <div>
            {!loading ? <div>
            <h3>Login to facebook</h3>
            <div>
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
                     <Field name="password" placeholder="password"/>
                     {touched.password && errors.password && <div>{errors.password}</div>}

                     
                     <button type="submit">
                         Log In
                     </button>
                    </Form>
                 )}
                    
                </Formik>
                </div>
                <div>
                <h3>New to facebook? Register now!</h3>
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
            </div> : <div>loading</div>}
            
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
