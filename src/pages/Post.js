import React from 'react';

const Post = ({match}) => {
    return (
        <div>
            POST { match.params.id}
        </div>
    );
};

export default Post;