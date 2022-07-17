import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      dogs: [],
      cats: [],
      computers: [],
      query: '',
      history: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.performSearch();
    // this.performSearch('cats');
    // this.performSearch('dogs');
    // this.performSearch('computers');
  }

  performSearch = (query = 'yorkie') => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (query === 'cats') {
          this.setState({
            cats: response.data.photos.photo,
            loading: false,
          });
        } else if (query === 'dogs') {
          this.setState({
            dogs: response.data.photos.photo,
            loading: false,
          });
        } else if (query === 'computers') {
          this.setState({
            computers: response.data.photos.photo,
            loading: false,
          });
        } else {
          // console.log(response.data);
          this.setState({
            gifs: response.data.photos.photo,
            query: query,
            loading: false,
          });
        }
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
          ) : 
          <Routes>
            <Route
              exact
              path="/"
              element={
                <GifList
                  data={this.state.gifs}
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
            /><Route
            exact
            path="/computer"
            element={
              <GifList
                data={this.state.computer}
                title={this.state.query}
                query={this.state.query}
              />
            }
          />
            <Route
              exact
              path="/computers"
              element={
                <GifList
                  data={this.state.computers}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />
            <Route exact path="/:query" element={ <GifList results={this.state.photos} title={null}/> } />
            {/* <Route path="/cats" element={dogs} />
            <Route path="/dogs" element={cats} />
            <Route path="/computers" element={computers} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          // (
          //   <GifList data={this.state.gifs} />
          // )
          }

          {/* <!-- Not Found --> */}
          {/* <li className="not-found"></li> */}
          {/* </div> */}
          {/* <PhotoContainer /> */}
          <Routes>
            {/* <Route
              exact
              path="/"
              element={
                <GifList
                  data={this.state.gifs}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            /> */}
            {/* <Route
         
              path="/cats"
              
              element={
                <GifList
                  data={this.state.cats}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            /> */}
            {/* <Route
          
              path="/dogs"
              element={
                <GifList
                  data={this.state.dogs}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            /> */}
            {/* <Route
              
              path="/computers"
              element={
                <GifList
                  data={this.state.computers}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            /> */}
             {/* <Route path="/:query" render={<GifList results={this.state.photos} title={this.state.query}/> } /> */}
            {/* <Route path="/cats" element={dogs} />
            <Route path="/dogs" element={cats} />
            <Route path="/computers" element={computers} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
