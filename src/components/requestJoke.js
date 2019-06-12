const requestJoke = (jokeId = '', invalid = false) => {
  let url = 'https://jokes-api.herokuapp.com/api/joke'

  if (typeof jokeId === 'number') {
    url = `https://jokes-api.herokuapp.com/api/joke/${jokeId}`;
  }

  return fetch(url)
    .then(response => {
      if(response.status === 200) {
        return response.json();
      } else {
          return Promise.reject(response.status);
      }
     })
    .then(myJson => {
      return {data: myJson.value, isInvalid: invalid};
    })
    .catch(reason => {
      if(Number(reason) >= 500) {
        return requestJoke(jokeId);
      } else if (Number(reason) === 404) {
        return requestJoke('', true);
      }
      else if (Number(reason) === 429) {
        return new Promise((resolve, reject) => {
          setTimeout(()=> {
            resolve(requestJoke(jokeId));
          }, 5200);
        });
      }
    });
}

export default requestJoke;