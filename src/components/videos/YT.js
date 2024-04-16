import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavLink } from 'react-router-dom';
import './YT.css';


const YT = ({data,resetData,isInitialView,onDataChange}) => {
    const [subject, setSubject] = useState();
    const [topicData] = useState([
        {
            id: 1,
            name: 'All of Biology in 9 minutes',
            img: 'https://i3.ytimg.com/vi/ax0yjzbSBa4/maxresdefault.jpg',
            actionType: 'redirect',
            actionValue: 'https://www.youtube.com/watch?v=ax0yjzbSBa4',
            category: 'Biology'
        },
        {
            id: 2,
            name: 'What is Biology?',
            img: 'https://i3.ytimg.com/vi/6v8djXa-IPQ/maxresdefault.jpg',
            actionType: 'redirect',
            actionValue: 'https://www.youtube.com/watch?v=6v8djXa-IPQ',
            category: 'Biology'
        },
        {
            id: 3,
            name: 'GENERAL CHEMISTRY explained in 19 minutes',
            img: 'https://i3.ytimg.com/vi/5iTOphGnCtg/maxresdefault.jpg',
            actionType: 'redirect',
            actionValue: 'https://www.youtube.com/watch?v=5iTOphGnCtg',
            category: 'Chemistry'
        },
        {
            id: 4,
            name: 'Introduction to chemistry | Atoms, compounds, and ions | Chemistry | Khan Academy',
            img: 'https://i3.ytimg.com/vi/Rd4a1X3B61w/maxresdefault.jpg',
            actionType: 'redirect',
            actionValue: 'https://www.youtube.com/watch?v=Rd4a1X3B61w',
            category: 'Chemistry'
        },
        {
            id: 5,
            name: 'ALL OF PHYSICS explained in 14 minutes',
            img: 'https://i3.ytimg.com/vi/ZAqIoDhornk/maxresdefault.jpg',
            actionType: 'redirect',
            actionValue: 'https://www.youtube.com/watch?v=ZAqIoDhornk',
            category: 'Physics'
        },
        {
            id: 6,
            name: 'What is Physics?',
            img: 'https://i3.ytimg.com/vi/yWMKYID5fr8/maxresdefault.jpg',
            actionType: 'redirect',
            actionValue: 'https://www.youtube.com/watch?v=yWMKYID5fr8',
            category: 'Physics'
        }
    ]);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAction = (item) => {
        console.log('Action:', item);
        if (item.actionType === 'redirect') {
            window.location.href = item.actionValue;
        } else if (item.actionType === 'renderComponent') {
            setSubject(item.name);
            // Instead of setting a component, change the data to trigger re-render.
            onDataChange(topicData);
        }
    };

    return (
        <div className="yt-container" style={{ display: 'flex', flexDirection: 'column', margin: '30px' }}>
            {!isInitialView && (
                <div className="yt-button-container">
                    <button onClick={resetData} style={{ background: 'transparent', border: 'none', textDecoration: 'underline' }}>{'< Back'}</button>
                </div>
            )}
            <h1 style={{ marginBottom: '1rem' }}>{isInitialView ? "Select a Subject" : subject}</h1>
            <Grid container spacing={2}>
                {data.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id} onClick={() => handleAction(item)}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="240"
                                image={item.img}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default YT;

