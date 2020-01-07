import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';

import Title from './components/Title';
import Author from './components/Author';

import { dateSite } from './components/Author';

import './App.css';


function App() {
  return (
    <Grid justify="center">
      <Title></Title>      
      <Author dateSite={dateSite()}></Author>
    </Grid>
  );
}

export default App;
