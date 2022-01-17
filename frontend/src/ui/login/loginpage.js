import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import * as Yup from 'yup';
import { loginUser } from "../../ducks/users/operations";




const LoginForm = ({ history, loginUser, users, logUSR},props) => {
    useEffect(()=>{
        console.log(users)
    }, [props])

    if(logUSR.login !==''){
        history.push('/')
    }

    const handleSubmit = (values) => {
        const loggedUser = users.find(el=>el.login == values.login)
        if(loggedUser){
            if(loggedUser.password == values.password){
                console.log("zalogowano");
                loginUser(values);
                history.push('/')
            }
            else alert('Wrong login or password')
        }else{
            alert('Wrong login or password')
        }
        
        
    }

    return (
        <div>
            <h3>Login to facebook</h3>
            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                
                
                enableReinitialize={true}>
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
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        logUSR: state.users.logged
    }
};

const mapDispatchToProps = {
    loginUser
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
