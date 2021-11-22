import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Debits = (props) => {
  let debitsView = () => {
    const {debits} = props;
    return debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date} </li>
    });
  }
  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}
      <Link to="/userProfile">User Profile  </Link>
      <Link to="/Login">Log In  </Link>
      <Link to="/">Return to Home  </Link>
      <Link to="/Credits">Credits  </Link>
      <form onSubmit={props.addDebit}>
        <input type="text" name="description"/>
        <input type="number" name="amount"/>
        <button type="submit">Add a Debit</button>
      </form>
    </div>
  )
}

export default Debits;