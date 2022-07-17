import React from 'react';
import Gif from './Gif';
import NotFound from './NotFound';

const BASE_PATH = "https://live.staticflickr.com";
//this component renders gifs or not found page. returns the results. 
const GifList = (props) => {
  const results = props.data;
  let gifs;

  if (results.length > 0 ) {
    gifs = results.map((gif) => (
      <Gif
        key={gif.id}
        url={`${BASE_PATH}/${gif.server}/${gif.id}_${gif.secret}_z.jpg`}
      />
    ));
  } else {
    gifs = <NotFound />;
  }
//This is where the results are returned
  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{gifs}</ul>
    </div>
  );
};

export default GifList;
