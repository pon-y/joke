import React from 'react';

import styles from './Joke.module.css';

function Joke ( props ) {
 let joke = <div className={styles.loadingMessage}>Loading random Joke...</div>;

 let isInvalidStyle = {visibility: 'visible'}
   if( props.isInvalid === true) {
     isInvalidStyle = {visibility: 'visible'}
   } else {
    isInvalidStyle = {visibility: 'hidden'}
   }
 
 if(props.joke !== '') {
   joke = (
   <div className={styles.Joke}>
     <div className={styles.invalidJoke} style={isInvalidStyle}> Well... We couldn't find that joke. Have a random joke instead! </div>
    <div className={styles.JokeContent}dangerouslySetInnerHTML={{__html: props.joke}} />
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