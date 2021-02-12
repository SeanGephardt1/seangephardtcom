import React, { useState, useEffect }from 'react';
//	import Comment from './comment.js';
import './comments.css';

function CommentsBlock()
{
	// Declare a new state variable, which we'll call "count"
	const [commentCount, addComment] = useState(0);

	//useEffect( function ()
	//{	// Update the document title using the browser API
	//	document.title = `You clicked ${commentCount} times`;
	//});

	function OnClick_IncrementState( ev )
	{
		addComment( commentCount + 1 );
		return;
	};
	function OnClick_DecrementState( ev )
	{
		console.debug( "commentCount", commentCount );
		if ( commentCount === 0 )
		{
			return;
		}
		addComment( commentCount - 1 );
		return;
	};

	//	<button onClick={() => addComment(comment + 1)}>Click me</button>
	return (
		<div className="comments-block">
			<h1>Comments panel busing React functional component</h1>
			<div>You clicked {commentCount} times</div>
			<button onClick={OnClick_IncrementState.bind( this )}> Click me</button>
			<button onClick={OnClick_DecrementState.bind( this )}> Click me</button>
		</div>
	);
};
export default CommentsBlock;