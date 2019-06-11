import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import styles from './JokeContainer.module.css';

import Joke from './Joke';

import requestJoke from './requestJoke';


class JokeContainer extends Component {
  state = {
    currentJoke: null,
    jokeId: null,
    oldJokes: {},
    userInput: '33',
    validInput: true,
    invalidRequest: false
  }

  getNewJoke = (id = '') => {
    this.setState({currentJoke: null});
    requestJoke(id).then(jokeData => {
      let oldJokes = {...this.state.oldJokes};
    
      if(oldJokes.hasOwnProperty(jokeData.data.id)) {
        return Promise.reject('repeat joke');
      }
      oldJokes[jokeData.data.id] = true;
      this.setState({currentJoke: jokeData.data, jokeId: jokeData.data.id, invalidRequest: jokeData.isInvalid, oldJokes: oldJokes});
    })
    .catch(response => {
      console.log(response);
      return setTimeout(()=> this.getNewJoke() , 4000)
    });
  }

  handleInputChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  handleInputSubmit = (e) => {
    this.getNewJoke(Number(this.state.userInput));
    e.preventDefault();
  }


  componentDidMount() {
    this.getNewJoke();
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
        <Joke joke={joke} author={author} isInvalid={this.state.isInvalid} />

        <form>
          <label>
            <i>Looking for a specific joke? Enter the id here: </i>
            <input type="text" name="userInput" value={this.state.userInput} onChange={this.handleInputChange}/>
          </label>
        {/* add validation for type of input  */}
           <button onClick={this.handleInputSubmit}> Go! </button>
        </form>
       
      </div>
      
    )
  }
}

export default JokeContainer;