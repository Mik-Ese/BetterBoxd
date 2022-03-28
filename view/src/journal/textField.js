import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields({description, setDescription}) {

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        
        <TextField className='mt-4'
          id="outlined-textarea"
          label="Your Review"
          placeholder="Placeholder"
          multiline
          onChange={handleChange}
        />
        
      </div>
      
     
    </Box>
  );
}
