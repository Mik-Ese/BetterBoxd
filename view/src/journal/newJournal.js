import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SimpleSlide(review) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <Box sx={{ width: `calc(100px + 16px)` }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          {icon}
        </Slide>
        <div className="text-primary">
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">
                <div class="card align-middle m-5" style={{ width: "25rem" }}>
                    <div class="card-body">
                        <img src={review.review.imgLink} class="card-img-top rounded" style={{ height: "30rem" }} alt="..." />
                        <h5 class="card-title display-5 mt-3">{review.review.title}</h5>
                        <p class="card-text text-success fs-4">Your Review:</p>
                        <p class="card-text text-dark fs-4 ">{review.review.movie_review}</p>
                    </div>
                </div>
            </div>
            <div class="d-inline-flex flex-row justify-content-center p-3">



            </div>
            
      </Box>
    </Box>
  );
}
