import React from 'react';
import Gif from './Gif';
import NotFound from './NotFound';

const GifList = (props) => {
  const results = props.data;
  let gifs;
  if (results.length > 0) {
    gifs = results.map((gif) => (
      <Gif
        key={gif.id}
        url={`https://live.staticflickr.com/${gif.server}/${gif.id}_${gif.secret}_z.jpg`}
      />
    ));
  } else {
    gifs = <NotFound />;
  }

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>{gifs}</ul>
    </div>
  );
};

export default GifList;
