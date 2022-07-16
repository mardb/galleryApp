import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
//components
import SearchForm from './components/SearchForm';
import NavBar from './components/NavBar';
import apiKey from './components/config';
import GifList from './components/GifList';
import NotFound from './components/NotFound';
// import secret from './components/config'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      query: '',
      history: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'yorkie') => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        // console.log(response.data);
        this.setState({
          gifs: response.data.photos.photo,
          query: query,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing fetch data', error);
      });
  };

  render() {
    // console.log(this.state.gifs);

    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />

          <NavBar />

          {this.state.loading ? (
            <p> Loading...</p>
          ) : (
            <GifList data={this.state.gifs} />
          )}

          {/* <!-- Not Found --> */}
          {/* <li className="not-found"></li> */}
          {/* </div> */}
          {/* <PhotoContainer /> */}
          <Routes>
            <Route
              exact
              path="/"
              render={() => (
                <GifList
                  data={this.state.gifs}
                  title={this.state.query}
                  query={this.state.query}
                />
              )}
            />
            <Route path="/nav" render={() => <NavBar />} />
            <Route path="/search" render={() => <SearchForm />} />
            <Route path="/notfound" render={() => <NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
