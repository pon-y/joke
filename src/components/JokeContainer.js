import React, { Component } from 'react';
import DOMPurify from 'dompurify';

import styles from './JokeContainer.module.css';
import Joke from './Joke';
import requestJoke from './requestJoke';
import InputForm from './InputForm';


class JokeContainer extends Component {
  state = {
    currentJoke: null,
    jokeId: null,
    oldJokes: {},
    userInput: '',
    invalidRequest: false,
    jokeTimer: null
  }


  getNewJoke = (id = '') => {
    this.setState({currentJoke: null});
    let oldJokes = {...this.state.oldJokes};
    if(oldJokes.hasOwnProperty(id)) {
      const jokeTimer = setTimeout(()=> this.getNewJoke(), 20000);
      this.setState({currentJoke: oldJokes[id], jokeId: id, jokeTimer});
      return;

    } else {
     requestJoke(id).then(({data, isInvalid}) => {
      
        oldJokes[data.id] = data;
        const jokeTimer = setTimeout(()=> this.getNewJoke(), 20000);
        this.setState({currentJoke: data, jokeId: data.id, oldJokes, invalidRequest: isInvalid, jokeTimer});
    })
    .catch(response => {
      console.log(response);
      console.log('error in get new joke');
      return setTimeout(()=> this.getNewJoke() , 5000)
    });
    }
  }
  handleInputChange = (e) => {
    this.setState({userInput: e.target.value})
  }

  handleInputSubmit = (e) => {
    clearTimeout(this.state.jokeTimer);
    this.getNewJoke(Number(this.state.userInput));
    e.preventDefault();
  }

  callRandomJoke = () => {
    clearTimeout(this.state.jokeTimer);
    this.getNewJoke();
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

        <Joke joke={joke} author={author} isInvalid={this.state.invalidRequest} />

        <InputForm
          callRandomJoke={this.callRandomJoke}
          loading={!this.state.currentJoke}
          userInput={this.state.userInput}
          handleInputChange={this.handleInputChange} 
          handleInputSubmit={this.handleInputSubmit} 
        />
       
      </div>
      
    )
  }
}

export default JokeContainer;