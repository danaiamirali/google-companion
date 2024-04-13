import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import Space from './components/Space';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import mhacks from './static/images/mhacks.png'
import campus from './static/images/campus.jpeg'

function Home() {
  const [showCreate, setShowCreate] = useState(false)
  const [nameToCreate, setNameToCreate] = useState("")
  const handleClickOpen = () => {
    setShowCreate(true);
  };
  const [gridItems, setGridItems] = useState(() => {
    // Retrieve the items from local storage; if none exist, use the default array
    const savedItems = localStorage.getItem('gridItems');
    return savedItems ? JSON.parse(savedItems) : [
      {
        "name": "Google/MHacks Hackthon",
        "route": convertToRoute("Google/MHacks Hackthon"),
        "date_created": 'April 12, 2024',
        "button_title": 'Enter',
        'tags': ['school', 'e/acc', 'hackathons'],
        'image': mhacks
      },
      {
        "name": "Dr. Google Research Lab",
        "route": convertToRoute("Dr. Google Research Lab"),
        "date_created": 'March 4, 2024',
        "button_title": 'Enter',
        'tags': ['school', 'research'],
        'image': campus
      },
    ];
  });
  useEffect(() => {
    // Store gridItems in local storage whenever they change
    localStorage.setItem('gridItems', JSON.stringify(gridItems));
  }, [gridItems]);

  function convertToRoute(str) {
    return str
      .trim() 
      .toLowerCase()
      .replace(/[^a-z0-9 ]/gi, '') 
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-'); 
  }


  const handleClose = (name) => {
    let date = new Date();
    let formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    console.log(`Created ${name} at ${formatter.format(date)}`); 
    setGridItems(gridItems => [...gridItems, 
      {
      "name": name,
      "route": convertToRoute(name),
      "date_created": formatter.format(date),
      "button_title": 'Enter',
      'tags': [],
      'image': mhacks
      }
    ])
    setShowCreate(false);
  };
  
  return (
    <div className="App">
      <header className="App-header">
      <Grid container spacing={8}>
          {gridItems.map((item, index) => ( 
            <Grid item xs={6} key={index}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Space 
                    name={item.name}
                    date_created={"Created: " + item.date_created}
                    button_title={item.button_title}
                    tags={item.tags}
                    image={item.image}
                    setShowCreate={setShowCreate}
                  />
                </Box>
            </Grid>
          ))}
          <Grid item xs={6}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Space 
                    name={"Add a new space!"}
                    date_created={"Create a world with Google"}
                    button_title={"Create new"}
                    tags={[]}
                    setShowCreate={setShowCreate}
                  />
                </Box>
            </Grid>
      </Grid>
      {showCreate &&  <React.Fragment>
      <Dialog
        open={showCreate}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            console.log(`Created Space named ${name} `)
            handleClose(name);
          },
        }}
      >
        <DialogTitle>Create a space</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new space with just a name!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="John Doe"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>}
      </header>
      
    </div>
  );
}

export default Home;