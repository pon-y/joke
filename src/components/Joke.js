import React from 'react';

function Joke ( props ) {
 
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: props.joke}} />
      <div> - {props.author}</div>
    </div>
   
  )
}

export default Joke;