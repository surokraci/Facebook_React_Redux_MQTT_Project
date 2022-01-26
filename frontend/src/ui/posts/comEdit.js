import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"
import { useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { editCom } from "../../ducks/comments/operations";

import { useCookies } from 'react-cookie';



import * as Yup from 'yup';







const ComEditForm = ({ history, com, logUSR, editCom,},props) => {
    useEffect(()=>{
        if(com){
            if(logUSR.login !==com.author){
                history.push(`/wall}`)
            }
        }
    }, )
    
    const [cookies, setCookie] = useCookies(['user']);

    const handleSubmit = (values) => {
        console.log("com edit");
        editCom(values);
        history.push(`/users/${com.author}`)
        
    }

    return (
        <div>
            {com ?
            <div>
                <h3>Edit User Comment</h3>
                <Formik
                initialValues={{
                    _id: com._id,
                    text: com.text,
                    post: com.post,
                    author: com.author

                }}
                onSubmit={(values) => handleSubmit(values)}
                
                
                >
                 {({ errors, touched }) =>(
                     <Form>
                     <Field name="text" placeholder="Edit comment"/>
                     {touched.text && errors.text && <div>{errors.text}</div>}

                     
                     <button type="submit">
                         Edit Comment
                     </button>
                    </Form>
                 )}
                    
                </Formik>
                
            </div>:<div>Loading...</div>}
            
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        com: state.comments.comments ? state.comments.comments.find(x=> x._id === props.match.params.id) : null,
        logUSR: state.users.logged,
    }
};

const mapDispatchToProps = {
    editCom
    
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComEditForm));