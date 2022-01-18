import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { loginUser } from "../../ducks/users/operations";
import { getUsersList } from "../../ducks/users/operations";




const PostList = ({ history, posts, loading, users, logUSR, loginUser,usersloading, getUsersList} ,props) => {
    useEffect(()=>{
        // cookies.login && loginUser({
        //     login: cookies.login,
        //     password: cookies.password
        // })
        getUsersList()
        
        if(users){
            if(logUSR.login == ''){
                history.push('/login')
            }
        }
    }, [])



    

    

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
            <h1>Main Wall</h1>

            {!users?
                <div>Trwa ładowanie</div>
                :
                <div>
                    
                    <h3>{logUSR.login != '' && users ? <div>{users.find(x=>x.login == logUSR.login).firstName} {users.find(x=>x.login == logUSR.login).lastName}</div>:<span>x</span>}</h3>
                    {posts.map(c=> {
                    return (
                        <div key={c._id}>
                        <div>{c.text}</div>
                        <div>{c.creationDate}</div>
                        <div>{users.find(x=>x._id == c.author).firstName} {users.find(x=>x._id == c.author).lastName}</div>
                        </div>
                        
                    )
                    })}
                </div>
                
                
                
                    
                
            }
            <button onClick={() => handleLogout()}>
                    Log Out
                    </button>

                    <button onClick={() => console.log(logUSR)}>
                    check
                    </button>
        </div>    
    )
};
const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        loading: state.posts.loading,
        users: state.users.users ? state.users.users: null,
        logUSR: state.users.logged,
        usersloading: state.users.loading
    };
}
const mapDispatchToProps = {
    loginUser,
    getUsersList
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));