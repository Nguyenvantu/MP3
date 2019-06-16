import React from 'react';
import MainView from '../../MainView';
import GenreMenu from '../../GenreMenu';
// import AlbumCard from './AlbumCard';
import { Card } from '../../HomePage/album';

const AlbumGenrePage = (props) => {
  return (
    <div>
      <GenreMenu type="album" t={props.t}/>
      <MainView type="album" chunkSize={4} {...props} Card={Card} />
    </div>
  );
};

export default AlbumGenrePage;
