import React, { Component } from 'react';
import styles from './JokeContainer.module.css';
import requestJoke from './requestJoke';

import DOMPurify from 'dompurify';
import Joke from './Joke';

class JokeContainer extends Component {
  state = {
    currentJoke: null,
    jokeId: null,
    oldJokes: {},
    userInput: null
  }

  componentDidMount() {
    requestJoke().then(jokeData => {
      console.log('jokedata: ', jokeData);
      this.setState({currentJoke: jokeData, jokeId: jokeData.id});
    })
  }

  render () {
    let joke = '';
    let author = '';
    if(this.state.currentJoke) {

      joke = DOMPurify.sanitize(this.state.currentJoke.joke);
      author = DOMPurify.sanitize(this.state.currentJoke.author);
    }
    return (
      
      <div className={styles.JokeContainer}>
        <Joke joke={joke} author={author}/>

        <form>
          <label>
            <i>Looking for a specific joke? Enter the id here: </i>
            <input type="text" name="name"/>
          </label>
        {/* add validation for type of input  */}
           <button> Go! </button>
        </form>
       
      </div>
      
    )
  }
}

export default JokeContainer;