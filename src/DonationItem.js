import Box from '@mui/material/Box';
import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import BasicSelect from './BasicSelect';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function DonationItem(props) {
    // states to keep one donation item data and validation data
    const [item, setItem]= useState({name: props.name, type:props.type,amount: props.amount, date:props.date })
    const [errorSelect, setErrorSelect]= useState(false);
    const [errorNumber, setErrorNumber]= useState(false);
    const [errorName, setErrorName]= useState(false);
    const [errorDate, setErrorDate]= useState(false);
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

    const handleChangeDate = (e) => {
      setItem({...item, date:e});
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
      if (item.date == "") setErrorDate(true);
      else setErrorDate(false);
    }, [item]);

    // check validation by changing errors
    useEffect(() => {
      if (!errorName && !errorNumber && !errorSelect && !errorDate)
        setValidated(true);
      else setValidated(false); 
    }, [item, errorNumber, errorSelect, errorName, errorDate]);

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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Select a date"
                value={item.date}
                onChange={(newValue) => handleChangeDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <BasicSelect type= {item.type} onClick={(e) => handleSelect(e)}/>
          {errorSelect ? <p style={{color:"red"}}>Please select one donation type other than All</p> : null}


          <TextField
            id="name"
            label="Donor's Name"
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
            label="Donation Amount"
            value={item.amount}
            onChange={(e) => handleChangeAmount(e)}
            style={{margin:'20px 20px'}}
          />

          <Button 
            variant="outlined" 
            disabled ={!validated}
            style={{margin:'30px 20px'}}
            onClick={()=> 
              {props.onClick(item); setItem({name: props.name, type:props.type,amount: props.amount, date:props.date })}}
          > 
          SAVE 
          </Button>
      </Box>
    );
  }
  
  export default DonationItem;
  