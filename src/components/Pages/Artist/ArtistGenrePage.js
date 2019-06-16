import React from 'react';
import MainView from '../../MainView';
import GenreMenu from '../../GenreMenu';
// import ArtistCard from './ArtistCard';
import { Card } from '../../HomePage/artist';
const AlbumGenrePage = (props) => {
  return (
    <div>
      <GenreMenu type="artist" t={props.t}/>
      <MainView type="artist" {...props} Card={Card}/>
    </div>
  );
};

export default AlbumGenrePage;