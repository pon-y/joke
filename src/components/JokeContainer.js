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
    invalidRequest: false
  }

  getNewJoke = (id = '') => {
    this.setState({currentJoke: null});
    requestJoke(id).then(({data, isInvalid}) => {
      let oldJokes = {...this.state.oldJokes};
    
 
      if(id === '' && oldJokes.hasOwnProperty(data.id)) {
        return Promise.reject('Repeated joke. Grabbing new joke...');
      }
      oldJokes[data.id] = true;
      this.setState({currentJoke: data, jokeId: data.id, oldJokes: oldJokes, invalidRequest: isInvalid});
    })
    .catch(response => {
      console.log(response);
      console.log('error in get new joke');
      return setTimeout(()=> this.getNewJoke() , 5000)
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

        <Joke joke={joke} author={author} isInvalid={this.state.invalidRequest} />

        <InputForm
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