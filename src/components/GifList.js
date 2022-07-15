import React from 'react';
import Gif from './Gif';

const GifList = (props) => {
  const results = props.data;

  let gifs;
  if (results.length > 0) {
    gifs = results.map((gif) => {
      return (
        <Gif
          key={gif.id}
          url={`https://live.staticflickr.com/${gif.server}/${gif.id}_${gif.secret}_z.jpg`}
        />
      );
    });
  }

  return (
    <ul>
      <Gif />
    </ul>
  );
};

export default GifList;
