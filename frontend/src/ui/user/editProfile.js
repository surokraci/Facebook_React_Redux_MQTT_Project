import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"
import { useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { editUser, DeleteUser } from "../../ducks/users/operations";
import { useCookies } from 'react-cookie';
import { loginUser } from "../../ducks/users/operations";

import * as Yup from 'yup';






const UserEditForm = ({ history, user, logUSR, editUser, DeleteUser, loginUser},props) => {
    useEffect(()=>{
        if(user){
            if(logUSR.login !==user.login){
                history.push(`/users/${user.login}`)
            }
        }
    }, )
    
    const [cookies, setCookie] = useCookies(['user']);

    const handleSubmit = (values) => {
        console.log("user edit");
        editUser(values);
        console.log(user);
        history.push(`/users/${user.login}`)
        
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            console.log(id);
            DeleteUser(id)
            setCookie('login', '', { path: '/' })
            setCookie('password', '', { path: '/' })
            loginUser({login:'', password:''});
            history.push('/login')
            window.location.reload(false);
          }
        

    }

    return (
        <div>
            {user ?
            <div>
                <h3>Edit User Informations</h3>
            <Formik
                initialValues={{
                    _id: user._id,
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: user.password,
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth.slice(0,10),
                    profilePicture: user.profilePicture,
                    registrationDate: user.registrationDate

                    
                }}
                onSubmit={(values) => handleSubmit(values)}
                
                
                enableReinitialize={true}>
                {({ errors, touched}) =>(
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
                          Edit Profile
                      </button>
                     </Form>
                 )}
                    
                </Formik>
                <div>
                <button onClick={()=>handleDelete(user.login)}>
                          Delete Account
                      </button>
                </div>
            </div>:<div>Loading...</div>}
            
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user: state.users.users ? state.users.users.find(x=> x.login === props.match.params.login) : null,
        logUSR: state.users.logged,
    }
};

const mapDispatchToProps = {
    editUser,
    DeleteUser,
    loginUser
    
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEditForm));
