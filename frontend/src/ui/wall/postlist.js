import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { loginUser } from "../../ducks/users/operations";
import { getUsersList } from "../../ducks/users/operations";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { addNewPost, DeletePost, addNewMQTTPost, addNewMQTTLikes,DeleteMQTTPost,EditMQTTPost } from "../../ducks/posts/operations";
import { addNewComment, DeleteComment, addNewMQTTCom, DeleteMQTTCom } from "../../ducks/comments/operations";
import { getLikesList, LikeMinus, LikePlus, thumbMQTTUp, thumbMQTTDown } from "../../ducks/likes/operations";
import {client,connectStatus,mqttConnect,mqttDisconnect,mqttUnSub,mqttSub,mqttPublish} from '../../mqtt/mqtt.js';
import { addNewMQTTUser } from "../../ducks/users/operations";
import { addMessage } from "../../ducks/messenger/actions";


const PostList = ({ history, posts, loading, users, logUSR, loginUser,usersloading, getUsersList, addNewPost, comments, addNewComment,
    DeleteComment, DeletePost, likes, getLikesList, LikeMinus, LikePlus, addNewMQTTLikes, addNewMQTTPost,DeleteMQTTPost,EditMQTTPost, addNewMQTTUser,
    messenger,addMessage, addNewMQTTCom, DeleteMQTTCom, thumbMQTTUp, thumbMQTTDown} ,props) => {
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

    

    

    const [connStatus,setConnStatus] = useState(connectStatus)
    
    /*MQTT*/

      useEffect(() => {
        if (client) {
          client.on('connect', () => {
            setConnStatus('Connected');
          });
          client.on('error', (err) => {
            console.error('Connection error: ', err);
            client.end();
          });
          client.on('reconnect', () => {
            setConnStatus('Reconnecting');
          });
          client.on('message', (topic, message) => {
              switch (topic){
                    case `poke/${logUSR.login}`:
                        alert(message.toString());
                        break;
                    case 'newPost/likes':
                        const msg = JSON.parse(message)
                        addNewMQTTLikes(msg)
                        break
                    case 'newPost/post':
                        const msg2 = JSON.parse(message)
                        addNewMQTTPost(msg2)
                        break;
                    case 'newPost/delete':
                        const msg3 = JSON.parse(message)
                        DeleteMQTTPost(msg3)
                        break
                    case 'newPost/edit':
                        const msg4 = JSON.parse(message)
                        EditMQTTPost(msg4)
                        break
                    case 'newUserX/create':
                        const msg5 = JSON.parse(message)
                        addNewMQTTUser(msg5)
                        break
                    case 'messenger/new':
                        const msg6 = JSON.parse(message)
                        addMessage(msg6)
                        break
                    case 'newComment/com':
                        const msg7 = JSON.parse(message)
                        addNewMQTTCom(msg7)
                        break
                    case 'newComment/del':
                        const msg8 = JSON.parse(message)
                        DeleteMQTTCom(msg8)
                        break
                    case 'newLike/plus':
                        const msg9 = JSON.parse(message)
                        thumbMQTTUp(msg9)
                        break
                    case 'newLike/minus':
                        const msg10 = JSON.parse(message)
                        thumbMQTTDown(msg10)
                        break
                    default:
                        break;
              }
          });
        }
      }, [client]);
    
      const record = {topic:"default",qos: 2};
      const connect = () => {mqttConnect(`ws://broker.emqx.io:8083/mqtt`)};
      const publish = (payload) => {mqttPublish({...record,...payload})};
      const subscribe = (topic)=>{mqttSub({...record,"topic":topic});console.log('sub')};
      const unsubscribe = (topic)=>{mqttUnSub({...record,"topic":topic});console.log('unsub');};
      const disconnect = () => {mqttDisconnect()};
    useEffect(()=>{disconnect();connect()},[])
    useEffect(()=>{
    if(connStatus==="Connected"){
        console.log('connected');
        subscribe(`poke/${logUSR.login}`);
        subscribe(`newPost/likes`);
        subscribe(`newPost/post`);
        subscribe(`newPost/delete`);
        subscribe(`newPost/edit`);
        subscribe('newUserX/create');
        subscribe('messenger/new');
        subscribe('newComment/com');
        subscribe('newComment/del');
        subscribe('newLike/plus');
        subscribe('newLike/minus')
        }
    },[connStatus])


    /*MQTT*/


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

    const handlePoke = (login, fn, ln)=>{
        console.log('poke');
        publish({"topic":`poke/${login}`,"payload":`You were poked by ${fn} ${ln}`})

    }

    const handleMessenger = (values, resetForm)=>{
        publish({"topic":`messenger/new`,"payload":JSON.stringify(values)})
        resetForm({values: ''})

    }
    

    

    const [cookies, setCookie] = useCookies(['user']);

    const handleLogout = () => {
        setCookie('login', '', { path: '/' })
        setCookie('password', '', { path: '/' })
        loginUser({login:'', password:''});
        disconnect()
        unsubscribe(`poke/${logUSR.login}`);
        history.push('/login')
        window.location.reload(false);
        
    }

    return (
        <div>
            <div className="navigation">
            <h2 className="fbLogoNav"> facebook</h2>
            <div className="navTools">
                <img src={logUSR.login != '' && users ? users.find(x=>x.login == logUSR.login).profilePicture:''}  alt=''></img>
                <div className="userNameNav">{logUSR.login != '' && users ? <Link onClick={()=>disconnect()} to={`users/${logUSR.login}`} style={{ textDecoration: 'none', color:'white' }}>{users.find(x=>x.login == logUSR.login).firstName} {users.find(x=>x.login == logUSR.login).lastName}</Link>:<span>x</span>}</div>
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
                                    {logUSR.login !== x.login ? 
                                    <button onClick={()=>{handlePoke(x.login, users.find(x=>x.login == logUSR.login).firstName, users.find(x=>x.login == logUSR.login).lastName)}}>
                                    Poke 👉
                                    </button>:
                                    <span></span>
                                    }
                                    
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
                            <img className="photoinpost" src={c.photoUrl}></img>
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
                    <div className="messenger">
                    
                    <div className="messengerField">
                            <Formik
                                initialValues={{
                                    text: '',
                                    author: logUSR.login

                                }}
                                onSubmit={(values, {resetForm}) => handleMessenger(values, resetForm)}
                                enableReinitialize={true}
                                
                                >
                                {({ errors, touched }) =>(
                                    <Form>
                                    <Field name="text" placeholder="New message!"/>
                                    {touched.text && errors.text && <div>{errors.text}</div>}

                                    
                                    <button type="submit" >
                                        Send
                                    </button>
                                    </Form>
                                )}
                                    
                                </Formik>
                            </div>
                            <div className="messengerlist">{messenger.slice(0).reverse().map(x=>{
                                return (<div className='message' key={x._id}>
                                    <img src={users.find(u=>u.login == x.author).profilePicture}  alt=''></img>
                                    <div className="mesname">{users.find(u=>u.login === x.author).firstName} {users.find(u=>u.login === x.author).lastName}</div>
                                    <div className="mestxt">{x.text}</div>
                                    
                                    
                                    
                                </div>

                                )
                                
                            })} </div>
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
        likes: state.likes.likes,
        messenger: state.messenger
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
    LikePlus,
    addNewMQTTLikes,
    addNewMQTTPost,
    DeleteMQTTPost,
    EditMQTTPost,
    addNewMQTTUser,
    addMessage,
    addNewMQTTCom,
    DeleteMQTTCom,
    thumbMQTTUp,
    thumbMQTTDown
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));