import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
  // borderRadius:10
};

export default function BasicModal(props) {
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log('trru')
    props.setModalOpen(true);
    // setOpen(true)
  };
  const handleClose = () => {
    // setOpen(false );
    props.setModalOpen(false);
  };

  // console.log('props.modalOpen', props.modalOpen);
  

  return (
    <div>
      <Button variant='contained' onClick={()=>{handleOpen(); }} style={{backgroundColor:props.color === undefined? "#1976D2" : props.color}}>{props.text}</Button>
      <Modal
        open={props.modalOpen}//props.open === undefined ? open : 
        onClose={handleClose}
      >
        <Box sx={style} >
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}