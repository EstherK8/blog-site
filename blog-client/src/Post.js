import React, { useState } from 'react';
import AddCommentsForm from './AddCommentsForm';


const Post = (params) => {
    const [commenting, setcommenting] = useState('add comments');
    function handleComment() {
        if (commenting === 'add comments') {
            setcommenting('submit')
        };
        if (commenting === 'submit') {
            setcommenting('add comments')
        };
    }
    let { post: { author, title, body, date, comments, _id } } = params;
    return (
        <div >
            <h1>By: {author} on {new Date(date).toLocaleDateString()}</h1>
            <h2>{title}</h2>
            <p>{body}</p>
            <button onClick={handleComment}>{commenting}</button>
            {commenting === 'submit' ? <addCommentsForm /> : null}
            <AddCommentsForm commentID={_id} />
            <p>hello there</p>

            {comments?.map(comment => (<div id="comment" key={comment.id}>{comment.author ? <p>by: {comment.author}</p> : null}<p>{comment.body}</p></div>))}
        </div>
    );
};

export default Post;