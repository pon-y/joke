import React from 'react';

import styles from './Joke.module.css';

function Joke ( props ) {
 let joke = <div>Loading random Joke...</div>;

 if(props.joke !== '') {
   joke = (
   <div>
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