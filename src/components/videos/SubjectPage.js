import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const SubjectPage = ({ subjectVideos }) => {
  return (
    <div style={{ margin: '30px' }}>
      <h1>Project</h1>
      <Grid container spacing={2}>
        {subjectVideos.map(video => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <CardMedia
                component="img"
                height="240"
                image={video.img}
                alt={video.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {video.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SubjectPage;
