import React, { Component } from 'react';
import './Timeline.css'
import twitterLogo from '../twitter.svg'

export default class Timeline extends Component {

  state = {
    newTweet: ''
  }

  handleNewTweet = (e)=>{
    if(e.keyCode !==13){
      return;
    }
    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username')

    console.log(content, author)
  }

  handleChange = (e)=>{
    this.setState({newTweet: e.target.value})
  }

  render() {

    const {newTweet} = this.state

    return (
      <div className="timeline-wrapper">
        <img src={twitterLogo} height={24} alt="Logo"/>
        <form>
          <textarea 
              placeholder="O que está acontecendo?"
              value={newTweet}
              onKeyDown={this.handleNewTweet}
              onChange={this.handleChange} 
              />
        </form>
      </div>
    )
  }
}
