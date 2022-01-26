import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { loginUser } from "../../ducks/users/operations";
import { getUsersList } from "../../ducks/users/operations";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { addNewPost, DeletePost } from "../../ducks/posts/operations";
import { addNewComment, DeleteComment } from "../../ducks/comments/operations";
import { getLikesList, LikeMinus, LikePlus } from "../../ducks/likes/operations";


const PostList = ({ history, posts, loading, users, logUSR, loginUser,usersloading, getUsersList, addNewPost, comments, addNewComment, DeleteComment, DeletePost, likes, getLikesList, LikeMinus, LikePlus} ,props) => {
    useEffect(()=>{
        cookies.login && loginUser({
            login: cookies.login,
            password: cookies.password
        })
        getLikesList()
        getUsersList()
        
        
        if(users){
            if(logUSR.login == ''){
                history.push('/login')
            }
        }
    }, [])


    const handleNewPost = (values, resetForm) => {
        console.log();
        addNewPost(values)
        resetForm({values:''})
        console.log(likes);

        
    }

    const handleNewComment = (values, resetForm) => {
        console.log(comments);
        addNewComment(values);
        resetForm({values: ''})

        
    }
    

    

    const [cookies, setCookie] = useCookies(['user']);

    const handleLogout = () => {
        setCookie('login', '', { path: '/' })
        setCookie('password', '', { path: '/' })
        loginUser({login:'', password:''});
        history.push('/login')
        window.location.reload(false);
        
    }

    return (
        <div>
            <div className="navigation">
            <h2 className="fbLogoNav"> facebook</h2>
            <div className="navTools">
                <img src={logUSR.login != '' && users ? users.find(x=>x.login == logUSR.login).profilePicture:''}  alt=''></img>
                <div className="userNameNav">{logUSR.login != '' && users ? <Link to={`users/${logUSR.login}`}  style={{ textDecoration: 'none', color:'white' }}>{users.find(x=>x.login == logUSR.login).firstName} {users.find(x=>x.login == logUSR.login).lastName}</Link>:<span>x</span>}</div>
                <button onClick={() => handleLogout()}>
                    Log Out
                    </button>
            </div>

            </div>
            
            {!users ?
                <div>Trwa ładowanie</div>
                :
                <div className="postPage">
                    <div className="usersList">
                        {users.map(x=>{
                            return(
                                <div key={x.login}>
                                    <Link to={`users/${x.login}`} style={{ textDecoration: 'none', color:'black'}} >{x.firstName} {x.lastName}</Link>
                                </div>
                                
                            )
                        })}

                    </div>
                    
                    <div className="postList">
                        <div className="newpostform">
                    <Formik
                initialValues={{
                    text: '',
                    photoUrl: '',
                    responses: 0,
                    author: logUSR.login

                }}
                onSubmit={(values, {resetForm}) => handleNewPost(values, resetForm)}
                
                
                >
                 {({ errors, touched }) =>(
                     <Form>
                     <Field name="text" placeholder="Create new post!"/>
                     {touched.text && errors.text && <div>{errors.text}</div>}
                     <Field name="photoUrl" placeholder="Photo Url (optional)"/>
                     {touched.photoUrl && errors.photoUrl && <div>{errors.photoUrl}</div>}

                     
                     <button type="submit">
                         Publish Post
                     </button>
                    </Form>
                 )}
                    
                </Formik>
                    </div>
                    {posts.slice(0).reverse().map(c=> {
                    let ProperComments = comments.filter(x=>x.post == c._id)
                    
                    
                    return (
                        <div className="postFrame" key={c._id}>
                            <div className="userInfo">
                            <img src={users.find(x=>x.login == c.author).profilePicture}  alt=''></img>
                            <div className="userNamePost">{users.find(x=>x.login == c.author).firstName} {users.find(x=>x.login == c.author).lastName}</div>
                            <div className="PostCreationDate">{c.creationDate.slice(0,10)}</div>
                            <div className="buttonpost">
                                        {logUSR.login === c.author ?
                                            <button onClick={()=>DeletePost(c._id)}>
                                            Delete Post
                                            </button>
                            
                                        : <span></span>}
                                    </div>
                            </div>
                            <div className="textField">{c.text}</div>
                            <div className="postResponses">{likes ? likes.find(x=>x.post == c._id).authors.length: 0} 👍</div>
                            <div className="likebuttons">{likes && logUSR ? likes.find(x=>x.post == c._id).authors.find(y=>y == logUSR.login) ?
                            <button onClick={()=>{LikeMinus({
                                _id: likes.find(x=>x.post == c._id)._id,
                                author: logUSR.login
                            })}}>👎 Dislike</button> : <button onClick={()=>{LikePlus({
                                _id: likes.find(x=>x.post == c._id)._id,
                                author: logUSR.login
                                })}}>👍 Like</button>: <span></span>}</div>
                            
                        
                            
                            

                            <div className="commentField">
                            <Formik
                                initialValues={{
                                    text: '',
                                    post: c._id,
                                    author: logUSR.login

                                }}
                                onSubmit={(values, {resetForm}) => handleNewComment(values, resetForm)}
                                enableReinitialize={true}
                                
                                >
                                {({ errors, touched }) =>(
                                    <Form>
                                    <Field name="text" placeholder="New comment!"/>
                                    {touched.text && errors.text && <div>{errors.text}</div>}

                                    
                                    <button type="submit" >
                                        Comment!
                                    </button>
                                    </Form>
                                )}
                                    
                                </Formik>
                            </div>
                            <div className="properComments">{ProperComments.map(x=>{
                                return (<div className='properCom' key={x._id}>
                                    <img src={users.find(u=>u.login == x.author).profilePicture}  alt=''></img>
                                    <div className="comname">{users.find(u=>u.login === x.author).firstName} {users.find(u=>u.login === x.author).lastName}</div>
                                    <div className="comtxt">{x.text}</div>
                                    <div className="combutton">
                                        {logUSR.login === x.author ?
                                            <button onClick={()=>DeleteComment(x._id)}>
                                            Delete
                                            </button>
                            
                                        : <span></span>}
                                    </div>
                                    
                                    
                                </div>

                                )
                                
                            })} </div>
                        
                        
                        </div>
                        
                        
                    )
                    })}
                    </div>
                </div>
                
                
                
                    
                
            }
            

        </div>    
    )
};
const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        loading: state.posts.loading,
        users: state.users.users ? state.users.users: null,
        logUSR: state.users.logged,
        usersloading: state.users.loading,
        comments: state.comments.comments,
        likes: state.likes.likes
    };
}
const mapDispatchToProps = {
    loginUser,
    getUsersList,
    addNewPost,
    addNewComment,
    DeleteComment,
    DeletePost,
    getLikesList,
    LikeMinus,
    LikePlus
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));