import Box from '@mui/material/Box';
import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import BasicSelect from './BasicSelect';
import Button from '@mui/material/Button';


function DonationItem(props) {
    // states to keep one donation item data and validation data
    const [item, setItem]= useState({name: props.name, type:props.type,amount: props.amount })
    const [errorSelect, setErrorSelect]= useState(false);
    const [errorNumber, setErrorNumber]= useState(false);
    const [errorName, setErrorName]= useState(false);
    const [validated, setValidated]= useState(false);
    
    const handleSelect = (e) => {
        setItem({...item, type:e});
      }

    const handleChangeName = (e) => {
      setItem({...item, name:e.target.value});
    }

    const handleChangeAmount = (e) => {
      setItem({...item, amount:e.target.value});
    }
    
    // updating errors status by updating input values
    useEffect(() => {
      if (item.type == 'all' || item.type == "")
        setErrorSelect(true);
      else setErrorSelect(false);
      if (isNaN(item.amount) || item.amount == 0) setErrorNumber(true);
      else setErrorNumber(false);
      if (item.name.length == 0) setErrorName(true);
      else setErrorName(false);
    }, [item]);

    // check validation by changing errors
    useEffect(() => {
      if (!errorName && !errorNumber && !errorSelect)
        setValidated(true);
      else setValidated(false); 
    }, [item, errorNumber, errorSelect, errorName]);

    return (
        <Box
            component="form"
            sx={{
              bgcolor: 'lightgray',
              boxShadow: 5,
              borderRadius: 2,
              p: 2,
              minWidth: 300,
              maxWidth:800,
              margin:'auto',
            }}
        >
          <BasicSelect type= {item.type} onClick={(e) => handleSelect(e)}/>
          {errorSelect ? <p style={{color:"red"}}>Please select one donation type other than All</p> : null}
          <TextField
            id="name"
            label="Donor 's Name"
            error={errorName}
            value={item.name}
            onChange={(e) => handleChangeName(e)}
            style={{margin:'20px 20px'}}
            helperText={errorName ? "Please enter name" : ""}
          />

          <TextField
            required
            error={errorNumber}
            id="amount"
            label="Donor 's Amount"
            value={item.amount}
            onChange={(e) => handleChangeAmount(e)}
            style={{margin:'20px 20px'}}
          />

          <Button 
            variant="outlined" 
            disabled ={!validated}
            style={{margin:'20px 20px'}}
            onClick={()=> 
              {props.onClick(item); setItem({name: props.name, type:props.type,amount: props.amount })}}
          > 
          SAVE 
          </Button>
      </Box>
    );
  }
  
  export default DonationItem;
  