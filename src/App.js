import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
//components
import Search from './components/Search';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import apiKey from './components/config';
import secret from './components/config'
import GifList from './components/GifList';

const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`;



export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
    };
  }

  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          gifs: response.data.photos.photo,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing fetch data', error);
      });
  }

  render() {
    // console.log(this.state.gifs);
    return (
      <div className="App">
        <div className="container">
          <Search />

          <NavBar />
          {/* photo container */}
          <div className="photo-container">
            <h2>Results</h2>

            <GifList data={this.state.gifs} />

            {/* <!-- Not Found --> */}
            {/* <li className="not-found"></li> */}
          </div>
          {/* <PhotoContainer /> */}

          <NotFound />
        </div>{' '}
      </div>
    );
  }
}
