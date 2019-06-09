import React, { Component } from 'react';
import styles from './JokeContainer.module.css';
import DOMPurify from 'dompurify';
import Joke from './Joke';

class JokeContainer extends Component {
  state = {
    currentJoke: null,
    jokeId: null,
    oldJokes: {},
    userInput: null
  }

  fetchJoke = () => {
    fetch('https://jokes-api.herokuapp.com/api/joke/33')
      .then(response => {
        return response.json();
       })
      .then(myJson => {
        console.log(JSON.stringify(myJson));
        
        this.setState({currentJoke: myJson.value, jokeId: myJson.value.id})
        // need to check for old joke id to check for repeats - and push current id into old jokes after or on call of joke
        //to add error handling
      });
  }

  componentDidMount() {
    this.fetchJoke();
    
  }

  render () {
    let joke = '';
    let author = '';
    if(this.state.currentJoke) {

      joke = DOMPurify.sanitize(this.state.currentJoke.joke);
      author = DOMPurify.sanitize(this.state.currentJoke.author);
    }
    return (
      
      <div>
        <div className={styles.JokeContainer}> <Joke joke={joke} author={author}/> </div>

        <form>
          <label>
            Looking for a specific joke? Enter the id here: 
            <input type="text" name="name"/>
          </label>
        
           <button> Go! </button>
        </form>
       
      </div>
      
    )
  }
}

export default JokeContainer;