import React from 'react';
import Paper from '@mui/material/Paper';
import Page from '../../components/Page';
import Typography from '@mui/material/Typography';


const Home = () => {
  return (
    <Page title="Home">
      <Paper>
        <Typography variant="body1" paragraph gutterBottom>
            Hello World.
        </Typography>
      </Paper>
    </Page>
  );
};

export default Home;