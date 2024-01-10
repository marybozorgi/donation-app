import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Donation Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.type}
          label="Type"
          onChange={(event)=> props.onClick(event.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="money">Money</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="cloth">Cloth</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}