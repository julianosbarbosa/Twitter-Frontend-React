import React, { Component } from 'react';
import twitterLogo from '../twitter.svg'
import './Login.css';

export default class Login extends Component {

  state = {
    username: ""
  }

  handleChange = (e) => {
    this.setState({username: e.target.value})
  }

  handleOnSubmit = (e)=>{
    e.preventDefault();
    const {username} = this.state
    if(!username.length){
      return;
    }
    localStorage.setItem('@GoTwitter:username', username);
    this.props.history.push('/timeline')
  }

  render() {
    const {username} = this.state
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="Logo"/>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" 
                 placeholder="Nome do usuario" 
                 onChange={this.handleChange}
                 value={username}/>
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}
