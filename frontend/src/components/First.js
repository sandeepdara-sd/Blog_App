import { Button, Card, CardActionArea, CardMedia, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import SwipeableTextMobileStepper from './SwipeableTextMobileStepper'

const First = () => {
  return (
    <div>

<Typography align='center' variant='h2' fontFamily={'revert-layer'} color='aqua' marginTop={'10px'}>
        <b> WELCOME TO THE BLOGGING WORLD </b>
        </Typography>

      <Box marginTop='20px' padding={1}>
       < SwipeableTextMobileStepper/>
       </Box>
       <Grid item xs={10}>
        <Typography align='center'>
       <Button variant='contained'component='a' href='/signup' size='large' sx={{width:'300px',fontSize:'25px',border:'whitesmoke',borderRadius:3,height:'80px', background:'grey',marginTop:'100px',color:'whitesmoke',':hover':{color:' rgba(2,0,36,1)',background:'aqua'}}}><b>GET STARTED</b></Button>
       </Typography>
       </Grid>
    <Divider orientation='horizontal' sx={{marginLeft:'auto', color:'whitesmoke',width: 28}}/>
     
          <Typography marginTop='80px' color={'aqua'}  marginLeft={'30px'} >
           <h2>KNOW MORE</h2>
          </Typography>
          
          <Typography marginLeft={'30px'} color={'gray'} >
         <b><p> A content management tool (CMT) is a software application or system designed to facilitate the creation, editing, organization, and publication of digital content. It serves as a centralized platform for managing various types of content, including text, images, videos, and other multimedia elements. Content management tools are essential for individuals, businesses, and organizations looking to streamline the content creation and publishing process across digital platforms.

Key features of content management tools typically include a user-friendly interface for content creation and editing, version control to track changes and revisions, and collaborative capabilities to enable multiple users to work on content simultaneously. These tools often provide content categorization, metadata tagging, and search functionalities, making it easier to organize and retrieve information efficiently.

Content management tools play a crucial role in maintaining consistency and coherence across a website, blog, or any digital platform by allowing users to update and modify content without the need for extensive technical expertise. They also facilitate content scheduling and publishing, enabling users to plan and automate the release of content at specific times.

In addition to managing content creation and publication, some advanced content management tools offer analytics and reporting features. These features help users assess the performance of their content, analyze user engagement, and make informed decisions to optimize their content strategy.

Whether used by individual bloggers, marketing teams, or large enterprises, content management tools contribute significantly to enhancing productivity, ensuring content quality, and maintaining a seamless and organized digital presence.
 </p></b>
          </Typography>
        

  <Grid container spacing={3}>
  <Grid item xs={3}>
        <Card sx={{ maxWidth: 350 , marginTop:'100px'  }}>
      <CardActionArea>
        <CardMedia

          component="img"
          height="300"
          image="https://img.freepik.com/premium-photo/business-concept-text-start-blog-white-board-with-paper-clips-wooden-table-background_406607-3944.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais"
          alt="green iguana"
        />
        </CardActionArea>
        </Card>
        </Grid>

        <Grid item xs={3} >
        <Card sx={{ maxWidth: 350, marginTop:'200px' }}>
      <CardActionArea>
        <CardMedia

          component="img"
          height="300"
          image="https://img.freepik.com/premium-photo/notebook-with-toolls-notes-about-blog-concept_132358-752.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais"
          alt="green iguana"
        />
        </CardActionArea>
        </Card>
        </Grid>

        <Grid item xs={3} >
        <Card sx={{ maxWidth: 350 , marginTop:'300px'}}>
      <CardActionArea>
        <CardMedia

          component="img"
          height="300"
          image="https://img.freepik.com/premium-photo/view-desktop-with-coffee-laptop_325774-1964.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais"
          alt="green iguana"
        />
        </CardActionArea>
        </Card>
        </Grid>

        <Grid item xs={3} >
        <Card sx={{ maxWidth: 350 , marginTop:'400px'}}>
      <CardActionArea>
        <CardMedia

          component="img"
          height="300"
          image="https://img.freepik.com/free-photo/business-branding-label-chart-graphic_53876-133806.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=ais"
          alt="green iguana"
        />
        </CardActionArea>
        </Card>
        </Grid>
        </Grid>
       
      
       
        
    </div>
  )
}

export default First