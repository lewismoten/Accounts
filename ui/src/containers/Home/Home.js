import React from 'react';
import Paper from '@mui/material/Paper';
import Page from '../../components/Page';
import { LoremIpsum } from 'lorem-ipsum';
import Typography from '@mui/material/Typography';

const lorem = new LoremIpsum();

const Home = () => {
  return (
    <Page title="Home">
      <Paper>
        {lorem
          .generateParagraphs(10)
          .split('\n')
          .map((paragraph, index) => (
            <Typography key={index} variant="body1" paragraph gutterBottom>
              {paragraph}
            </Typography>
          ))}
      </Paper>
    </Page>
  );
};

export default Home;