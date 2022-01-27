import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik"
import { useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { useCookies } from 'react-cookie';

import { editPost } from "../../ducks/posts/operations";

import * as Yup from 'yup';






const PostEditForm = ({ history, post, logUSR, editPost,},props) => {
    useEffect(()=>{
        if(post){
            if(logUSR.login !==post.author){
                history.push(`/wall}`)
            }
        }
    }, )
    
    const [cookies, setCookie] = useCookies(['user']);

    const handleSubmit = (values) => {
        console.log("post edit");
        editPost(values);
        console.log(post);
        history.push(`/users/${post.author}`)
        
    }

    return (
        <div className="editForm">
            {post ?
            <div>
                <h3>Edit User Post</h3>
                <Formik
                initialValues={{
                    _id: post._id,
                    text: post.text,
                    photoUrl: post.photoUrl,
                    responses: 0,
                    author: logUSR.login,

                }}
                onSubmit={(values) => handleSubmit(values)}
                
                
                >
                 {({ errors, touched }) =>(
                     <Form>
                     <Field name="text" placeholder="Create new post!"/>
                     {touched.text && errors.text && <div>{errors.text}</div>}
                     <Field name="photoUrl" placeholder="Photo Url (optional)"/>
                     {touched.photoUrl && errors.photoUrl && <div>{errors.photoUrl}</div>}

                     
                     <button type="submit">
                         Edit Post
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
        post: state.posts.posts ? state.posts.posts.find(x=> x._id === props.match.params.id) : null,
        logUSR: state.users.logged,
    }
};

const mapDispatchToProps = {
    editPost
    
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEditForm));