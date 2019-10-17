import React, { Component } from 'react';
import './Timeline.css';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

export default class Timeline extends Component {

  state = {
    tweets: [],
    newTweet: ''
  }

  async componentDidMount(){
    this.subscribeToEvents();

    const response  = await api.get('tweets');
    this.setState({tweets: response.data})
  }

  subscribeToEvents = ()=>{
    const io = socket('http://localhost:3333');

    io.on('tweet', data => {
      this.setState({tweets: [data, ...this.state.tweets]})
    })
    io.on('like', data => {
      this.setState({tweets: this.state.tweets.map(tweet=>(
        tweet._id===data._id? data: tweet
      ))})
    })
  }

  handleNewTweet = async (e) =>{
    if(e.keyCode !==13){
      return;
    }
    const content = this.state.newTweet;
    const author = localStorage.getItem('@GoTwitter:username')

    await api.post('tweets', {content, author})
    this.setState({ newTweet:'' })
  }

  handleChange = (e)=>{
    this.setState({newTweet: e.target.value})
  }

  render() {

    const {newTweet, tweets} = this.state

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
        <ul className="tweet-list">
          {tweets.map((tweet)=>(
            <Tweet key={tweet._id} tweet={tweet}/>
          ))}
        </ul>
      </div>
    )
  }
}
