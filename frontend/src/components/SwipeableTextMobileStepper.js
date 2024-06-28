import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  
  {
   
    imgPath:
      'https://img.freepik.com/premium-photo/handwriting-content-marketing-word-notebook-wood-table_132358-3968.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=sph',
  },
  {
   
    imgPath:
      'https://img.freepik.com/free-photo/world-with-hand-drawn-icons_1134-404.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=sph',
  },
  
  {
   
    imgPath:
      'https://img.freepik.com/free-photo/social-media-networking-online-communication-connect-concept_53876-124862.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=sph',
  },
  {
   
    imgPath:
      'https://img.freepik.com/premium-photo/social-media-blog-concept-futuristic-icon-design-graphics-hand-with-smartphone_102583-6104.jpg?size=626&ext=jpg&ga=GA1.1.1122057081.1697127890&semt=sph',
  },
];




function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 1600, flexGrow: 1,backgroundColor:'ButtonFace',":hover":{
      boxShadow:'10px 10px 20px #ccc '
    } }} borderRadius={5} padding={1} >
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          
          height: 0,
          borderRadius:4,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: '80vh',
                  display: 'block',
                  maxWidth: '100%',
                  objectFit:'fill',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
          sx={{ background:' rgba(2,0,36,1)'}}
          variant='contained'
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button  sx={{ background:' rgba(2,0,36,1)'}}
          variant='contained' 
          size="small" 
          onClick={handleBack} 
          disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;