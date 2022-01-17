import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";



const PostList = ({ history, posts, loading, users, logUSR} ,props) => {

    if(logUSR.login == ''){
        history.push('/login')
    }


    return (
        <div>
            <h3>Main Wall</h3>

            {loading ?
                <div>Trwa ładowanie</div>
                :
                
                posts.map(c=> {
                    return (
                        <div key={c._id}>
                        <div>{c.text}</div>
                        <div>{c.creationDate}</div>
                        <div>{c.author}</div>
                        </div>
                        
                    )
                    })
            }
        </div>    
    )
};
const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        loading: state.posts.loading,
        users: state.users.users,
        logUSR: state.users.logged
    };
}
// const mapDispatchToProps = {
    
// }

export default withRouter(connect(mapStateToProps, null)(PostList));