import React from 'react';
import SingleCard from "./SingleCard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Ensure this is the correct import path
import './card.css';

const Item = styled(Paper)(({ theme }) => ({
  // Styling for the Paper component
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  overflow: 'hidden',
}));

export default function MultiCards({ cardsData }) {

    return (
      <div className='CardContainer'>
        <Box sx={{ flexGrow: 1, width: '100%' }}> {/* Ensure full width */}
          <Grid container spacing={0} justifyContent="center"> {/* Center items if they don't fill the row */}
            {cardsData.map((card, index) => (
              <Grid key={index} xs={12} sm={6} md={4} lg={3} item>
                <Item>
                  <SingleCard
                    img={card.img}
                    title={card.title}
                    description={card.description}
                  />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
}


