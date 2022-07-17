import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
//components
import SearchForm from './components/SearchForm';
import NavBar from './components/NavBar';
import apiKey from './components/config';
import GifList from './components/GifList';
import NotFound from './components/NotFound';
import { withHook } from './components/withHook';

// using BASE_PATH to make code readable

const BASE_PATH =
  'https://www.flickr.com/services/rest/?method=flickr.photos.search';

//renders all the other components and stores the state
class App extends Component {
  constructor() {
    super();

    this.state = {
      gifs: [],
      dogs: [],
      cats: [],
      computers: [],
      yorkie: [],
      query: '',
      history: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.performSearch('yorkie');
    this.performSearch('cats');
    this.performSearch('dogs');
    this.performSearch('computers');
  }
  // lets loading to false unless there is a query
  performSearch = (query = '') => {
    // if (!query) return;
    // this.setState({ loading: true });
    //fetches the url and posts gifs
    axios
      .get(
        `${BASE_PATH}&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (query === 'cats') {
          this.setState({
            cats: response.data.photos.photo,
            loading:false
          });
        } else if (query === 'dogs') {
          this.setState({
            dogs: response.data.photos.photo,
            loading:false
          });
        } else if (query === 'computers') {
          this.setState({
            computers: response.data.photos.photo,
            loading:false
          });
        } else if (query === 'yorkie') {
          this.setState({
            yorkie: response.data.photos.photo,
            loading:false
          });
        } else {
          this.setState({
            gifs: response.data.photos.photo,
            query: query,
            loading:false
          });
        }
      })
      .catch((error) => {
        console.log('Error fetching and parsing fetch data', error);
      });
    this.setState({ loading: false });
  };

  render() {
    //renders the search bar. nav buttons, and routes.  Depending on path it renders gifs
    return (
      <div className="container">
        <SearchForm
          onSearch={this.performSearch}
          navigate={this.props.navigate}
        />
        <NavBar />

        {this.state.loading ? (
          <p> Loading...</p>
        ) : 
          <Routes>
            <Route
              exact
              path="/"
              element={
                <GifList
                  data={this.state.yorkie}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />
            <Route
              exact
              path="/cats"
              element={
                <GifList
                  data={this.state.cats}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />
            <Route
              exact
              path="/dogs"
              element={
                <GifList
                  data={this.state.dogs}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />

            <Route
              exact
              path="computers"
              element={
                <GifList
                  data={this.state.computers}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />
            <Route
              exact
              path=":query"
              element={
                <GifList
                  data={this.state.gifs}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />
            {/* when query is not found, renders not found page. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      </div>
    );
  }
}

export default withHook(App);
