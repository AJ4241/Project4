import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Credits = (props) => {
  console.log(props);
  let creditsView = () => {
    const {credits} = props;
    return credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date} </li>
      });
    }
    return (
      <div>
        <h1>Credits</h1>
        {creditsView()}
        <Link to="/userProfile">User Profile  </Link>
        <Link to="/Login">Log In  </Link>
        <Link to="/">Return to Home  </Link>
        <Link to="/Debits">Debits  </Link>
        <form onSubmit={props.addCredit}>
          <input type="text" name="description"/>
          <input type="number" name="amount"/>
          <button type="submit">Add a Credit</button>
        </form>
      </div>
    )
}

export default Credits;
                