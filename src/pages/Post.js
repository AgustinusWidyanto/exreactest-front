import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
import "../App.css";
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    const [postObject, setPostObject] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComments] = useState("")

    const { authState } = useContext(AuthContext)

    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            commentBody: newComment,
            PostId: id
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                alert("Not Logged In")
            } else {
                console.log("Comment added!");
                setComments([...comments, { commentBody: newComment, username: response.data.username }])
                setNewComments("")
            }
        })
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
            alert("Comment Deleted");
            setComments(comments.filter((val) => {
                return val.id != id
            }))
        });
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post'>
                    <div className='title'>{postObject.title}</div>
                    <div className='body'>{postObject.postText}</div>
                    <div className='footer'>{postObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input
                        type='text'
                        placeholder='Comment..'
                        autoComplete='off'
                        value={(newComment)}
                        onChange={(event) => { setNewComments(event.target.value) }}
                    />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div className='commentGroup'>
                                <div className='comment'>
                                    <div className='commentBody'>
                                        {comment.commentBody}
                                    </div>
                                    <div className='userBody'>{comment.username}</div>

                                </div>
                                {authState.username === comment.username && <button onClick={() => { deleteComment(comment.id) }}>X</button>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post;