import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function SingleCard( {img, title, description}) {
  return (
    <Card sx={{ maxWidth: 500, border: 'none', boxShadow: 'none', background: 'transparent' }}>
        <CardMedia
          component="img"
          height="440"
          image= {img}
          alt="photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
    </Card>
  );
}