import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
//components
import SearchForm from './components/SearchForm';
import NavBar from './components/NavBar';
import apiKey from './components/config';
import GifList from './components/GifList';
// import NotFound from './components/NotFound';
// import secret from './components/config'


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.performSearch()
  }
 

  performSearch = (query='yorkie') => {
    axios
    .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then((response) => {
      // console.log(response.data);
      this.setState({
        gifs: response.data.photos.photo,
        loading: false
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
          <SearchForm onSearch={this.performSearch}/>

          <NavBar />
        
            {
              (this.state.loading)
              ? <p> Loading...</p>
              : <GifList data={this.state.gifs} />
            }
            

            {/* <!-- Not Found --> */}
            {/* <li className="not-found"></li> */}
          {/* </div> */}
          {/* <PhotoContainer /> */}

        </div>{' '}
      </div>
    );
  }
}
