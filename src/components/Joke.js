import React from 'react';

import styles from './Joke.module.css';

function Joke ( props ) {
 let joke = <div>Loading random Joke...</div>;

 let isInvalidStyle = {visibility: 'visible'}
   if( props.isInvalid === true) {
     isInvalidStyle = {visibility: 'visible'}
   } else {
    isInvalidStyle = {visibility: 'hidden'}
   }
 
 if(props.joke !== '') {
   joke = (
   <div>
     <div style={isInvalidStyle}> That input was invalid. Have a random joke instead! </div>
    <div className={styles.Joke}dangerouslySetInnerHTML={{__html: props.joke}} />
    <div className={styles.Author}> - {props.author}</div>
   </div>)
 }
  return (
    <div>
     {joke}
    </div>
   
  )
}

export default Joke;