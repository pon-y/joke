import React from 'react';
import styles from './InputForm.module.css';

function InputForm ( props ) {

  const {userInput, handleInputChange, handleInputSubmit, loading} = props;
  let disableInput = false;

if( loading || isNaN(Number(userInput))) {
  disableInput = true;
} else {
  disableInput = false;
}
  return (
    <form className={styles.formContainer}>
      <label>
        <i className={styles.text}>Looking for a specific joke? Enter the id here:</i>
        <input type="text" name="userInput" value={userInput} onChange={handleInputChange}/>
      </label>
     <button className={styles.button} onClick={handleInputSubmit} disabled={disableInput}> Go! </button>
     
  </form>
  )
}

export default InputForm;