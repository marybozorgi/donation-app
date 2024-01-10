import * as React from 'react';
import { useEffect } from "react";
import Stack from '@mui/material/Stack';
import BasicSelect from './BasicSelect';
import BasicTable from './BasicTable';
import DonationItem from './DonationItem';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { v4 as uuid } from 'uuid';
import './App.css';

// style for Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(
  id,
  name,
  type,
  amount,
  date,
) {
  return { id, name, type, amount, date };
}

//default donation data
const rows = [
  createData(1,'Ali', 'money', 200, '01-12-2023'),
  createData(2,'Alex', 'money', 300, '04-12-2023'),
  createData(3, 'Mary', 'money', 100, '08-12-2023'),
  createData(4, 'Sam', 'cloth', 15, '15-12-2023'),
  createData(5, 'Max', 'food', 3, '01-11-2023'),
];

function App() {

  // states defined for Modal
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({name:"", type:"", amount:0});
  const handleOpen = () => {setOpen(true);}
  const handleClose = () => setOpen(false);
  
  // states to keep donation data
  const [donations, setDonations] = React.useState(rows);
  const [money, setMoney] = React.useState(0);
  const [cloth, setCloth] = React.useState(0);
  const [food, setFood] = React.useState(0);
  const [category, setCategory] = React.useState(rows);
  const [type, setType] = React.useState('all');

  // functions to handle add/delete/edit data

  const handleDelete = (e) => {
    setDonations(donations.filter(i => i.id != e));
  }

  const handleEdit = (e) => {
    handleOpen();
    setItem({name:e.name, type:e.type, amount:e.amount})
  }

  const handleSubmit = (item) => {
  setDonations([ ...donations, createData(uuid(), item.name, item.type, parseInt(item.amount), "12-12-2023")]);
  }

  const handleEditSubmit = (item) => {
    // TODO state update for edit not working  
    //  setDonations(donations.filter(i => i.id != item.id).push(createData(uuid(), item.name, item.type, parseInt(item.amount), item.date))) 
    handleClose();  
    }

  const handleClick = (e) => {
    setType(e);
  }

  // only showing donations in specific type by changing Select type
  useEffect(() => {
    if (type != 'all')
      setCategory(donations.filter(i => i.type == type));
    else setCategory(donations);
  }, [type, donations]);


  //calculating total donation
  useEffect(() => {
      setMoney(donations.filter(i => i.type == "money").reduce(( sum, cur ) => sum + cur.amount , 0));
      setCloth(donations.filter(i => i.type == "cloth").reduce(( sum, cur ) => sum + cur.amount , 0));
      setFood(donations.filter(i => i.type == "food").reduce(( sum, cur ) => sum + cur.amount , 0));
  }, [donations]);

  return (
    <div className="App">

        <h3>Time to Donate!!</h3>
        <DonationItem name= "" type="" amount="" onClick= {(item) => handleSubmit(item)}/>

        <h3>Donation List</h3>
        <BasicSelect onClick={(e) => handleClick(e)}/>
        <BasicTable donations={category} onDelete= {(e) => handleDelete(e)}  onEdit= {(e) => handleEdit(e)}/>
        <h3>Total Donationed </h3>
        
        <Stack spacing={2} direction="column">
          <p>Money :${money}</p>
          <p>Cloth :{cloth}</p>
          <p>Food :{food}</p>
        </Stack>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit
            </Typography>
            <DonationItem name= {item.name} type={item.type} amount={item.amount} onClick= {(item) => handleEditSubmit(item)}/>
          </Box>
      </Modal>
    </div>
  );
}

export default App;
