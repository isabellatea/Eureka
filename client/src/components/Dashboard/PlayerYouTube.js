import React, { Component } from 'react';



const PlayerYouTube = function(props) {
  return (
      <iframe width="760" height="515" src={`https://www.youtube.com/embed/${props.videoID}`} frameBorder="0" allowFullScreen></iframe>
  )
}

export default PlayerYouTube;