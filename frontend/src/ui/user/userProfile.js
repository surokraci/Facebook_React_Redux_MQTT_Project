import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { loginUser } from "../../ducks/users/operations";
import { getUsersList } from "../../ducks/users/operations";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { addNewPost, DeletePost } from "../../ducks/posts/operations";
import { addNewComment, DeleteComment } from "../../ducks/comments/operations";
import { getLikesList, LikeMinus, LikePlus } from "../../ducks/likes/operations";



const UserDetail = ({history, user, users, logUSR, posts, loginUser, getUsersList, addNewComment, DeletePost, DeleteComment, getLikesList, LikeMinus, LikePlus, likes,comments},props)=>{
    useEffect(()=>{
        cookies.login && loginUser({
            login: cookies.login,
            password: cookies.password
        })
        getLikesList()
        getUsersList()
        
        
    }, [])
    const [cookies, setCookie] = useCookies(['user']);
    const userPosts = []

    
    const handleNewComment = (values, resetForm) => {
        console.log(comments);
        addNewComment(values);
        resetForm({values: ''})

        
    }
    
    if(user && posts){
        
    for(const x of posts){
        if(x.author===user.login){
            userPosts.push(x)
        }
    }
    }

    
    return (
        <div>
            <div className="navigation">
            <Link to={'/'} style={{ textDecoration: 'none', color:'white' }}><h2 className="fbLogoNav"> facebook</h2></Link>
            
            </div>
            {user && logUSR && likes && posts?
                
                <div>
                    <div className="profileContainer">
                        
                        <div className="userNameProfile">{user.firstName} {user.lastName}</div>
                        <img src={user.profilePicture} alt=''></img>
                        <div>
                            {user.login === logUSR.login ?
                            <Link to={`/users/${user.login}/edit`}>
                            <button>
                                Edit Profile
                            </button>
                            </Link>
                            
                            : <span></span>}
                        </div>
                        
                    </div>
                    
                    <div className="profileDown">
                        <div className="profileInformations">
                            <div>Gender: {user.gender}</div>
                            <div>User of facebook from: {user.registrationDate.slice(0,10)}</div>
                            <div>Birthday: {user.dateOfBirth.slice(0,10)}</div>
                        </div>
                        <div className="profilePosts">
                        <div className="postList">
                        
                    {userPosts.slice(0).reverse().map(c=> {
                    let ProperComments = comments.filter(x=>x.post == c._id)
                    
                    
                    return (
                        <div className="postFrame" key={c._id}>
                            <div className="userInfo">
                            <img src={users.find(x=>x.login == c.author).profilePicture}  alt=''></img>
                            <div className="userNamePost">{users.find(x=>x.login == c.author).firstName} {users.find(x=>x.login == c.author).lastName}</div>
                            <div className="PostCreationDate">{c.creationDate.slice(0,10)}</div>
                            <div className="buttonpost2">
                                        {logUSR.login === c.author ?
                                        <Link to={`/posts/${c._id}/edit/`}>
                                            <button>
                                            Edit Post
                                            </button>
                                            </Link>
                                        : <span></span>}
                                    </div>
                            
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
                                    <div className="combutton2">
                                        {logUSR.login === x.author ?
                                        <Link to={`/comments/${x._id}/edit/`}>
                                            <button>
                                            Edit Comment
                                            </button>
                                            </Link>
                                        : <span></span>}
                                    </div>
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
                    
                    
                    
            
                </div>


            
                </div>
            
            :
            <div>Loading</div>
                }
            
        </div>
    )

}

const mapStateToProps = (state, props) => ({
    user: state.users.users ? state.users.users.find(x=> x.login === props.match.params.login) : null,
    users: state.users.users,
    posts: state.posts.posts,
    logUSR: state.users.logged,
    comments: state.comments.comments,
    likes: state.likes.likes
    
});
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail));
