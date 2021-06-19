import React from 'react';
import commentBox from 'commentbox.io';

class CommentBox extends React.Component {
    
    componentDidMount() {
        
        this.removeCommentBox = commentBox('5766111958138880-proj', {defaultBoxId : this.props.id});
    }
    
    componentWillUnmount() {
        
        this.removeCommentBox();
    }
    
    render() {
        
        return (
            <div className="commentbox" />
        );
    }
}

export default CommentBox