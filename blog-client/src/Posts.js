import React, { useEffect, useState } from 'react';
import Post from './Post';
import socketIo from 'socket.io-client';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:8080/posts', {
                    credentials: 'include'
                });
                const posts = await response.json();
                setPosts(posts);

                if (!response.ok) {

                    throw new Error(`${response.status} ${response.statuscode}`)
                }
            }
            catch (e) {
                console.error(e)
            }
        })();
    }, []);
    const io = socketIo('http://localhost:8080');
    useEffect(() => {
        function handleNewPost(newPost) {
            console.log('got this post message')
            //react array immutable style
            const newPostArray = [...posts];
            newPostArray.push(newPost);
            setPosts(newPostArray)

            // without immutable pattern:
            // setPosts(posts.push(newPost))
        }
        io.on('post', newPost => {
            handleNewPost(newPost)
        });
        function handleNewComment(newComment) {
            console.log('got this comments')
            //react array immutable style
            const newCommentArray = [...comments];
            newCommentArray.push(newComment);
            setComments(newCommentArray)
        }
        io.on('comment', newComment => {
            handleNewComment(newComment);
        });
        return () => {
            io.off('posts', handleNewPost);
            io.off('comment', handleNewComment);
        }
    }, [posts, setPosts, io])

    return (
        <div>
            {posts.map(post => <Post post={post} key={post._id}></Post>)}
        </div>
    );
};

export default Posts;