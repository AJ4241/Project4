import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import AccountBalance from './components/AccountBalance';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 100,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      debits: [],
      credits: [],
      }
    }
  }
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    
    debits = debits.data
    credits = credits.data
    
    let debitSum = 0, creditSum = 0;
    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })

    let accountBalance = creditSum - debitSum;
    this.setState({debits, credits, accountBalance});
  }
  
  addDebit = (e) => {
    e.preventDefault();
    const descriptionD = e.target[0].value;
    const amountD = Number(e.target[1].value);
    console.log(descriptionD, amountD);

    let num = Number(this.state.debits.length);
    let triii = [num];

    for (const[w] of this.state.debits.entries()) {
      triii[w] = this.state.debits[w];
    }

    triii[num] = {...this.state.debits[0]};
    triii[num].amount = amountD;
    triii[num].description = descriptionD;
    triii[num].id = triii.length+"d";
    triii[num].date = Date();
    this.setState({debits: triii});

    let y = this.state.accountBalance - amountD;
    this.setState({accountBalance: y});
  }
  
  addCredit = (e) => {
    e.preventDefault();
    const descriptionC = e.target[0].value;
    const amountC = Number(e.target[1].value);
    console.log(descriptionC, amountC);
    
    let n = this.state.credits.length;
    let subCredArr = [n];
    for (const[c] of this.state.credits.entries()) {
      subCredArr[c] = this.state.credits[c];
    }

    subCredArr[n] = {...this.state.credits[0]};
    subCredArr[n].amount = amountC;
    subCredArr[n].description = descriptionC;
    subCredArr[n].id = subCredArr.length+"c";
    subCredArr[n].date = Date();
    this.setState({credits: subCredArr});

    let r = this.state.accountBalance + amountC;
    this.setState({accountBalance: r});
  }
  
  render() {
    const {debits} = this.state;
    const {credits} = this.state;
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} />);
      const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={credits}/>);
    return (
      <Router>
      <div>
        <AccountBalance accountBalance={this.state.accountBalance}/>
      </div>
        <Switch>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/Login" render={LogInComponent}/>
          <Route exact path="/Debits" render={DebitsComponent}/>
          <Route exact path="/Credits" render={CreditsComponent}/>
        </Switch>
      </Router>
      );
  }
}

export default App;
