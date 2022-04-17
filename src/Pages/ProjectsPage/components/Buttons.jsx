import { Button, Stack, Card, CardHeader, CardContent, TextField, CardActions } from '@mui/material';
import React, {useState} from 'react'
import BasicModal from './Modal';
import { Link } from 'react-router-dom';

const Buttons = (props) => {

  const [modalEditProjectOpen, setModalEditProjectOpen] = useState(false);
  const [modalDeleteProjectOpen, setModalDeleteProjectOpen] = useState(false);

  

  const handleDelete = ()=>{
    props.handleDelete(props.id);
    setModalDeleteProjectOpen(false);
  }

  const [editInputText, setEditInputText] = useState(props.editDefaultValue);
  
  const handleEdit = ()=>{
    console.log('edited', editInputText)
    props.handleEdit(props.id, editInputText);
    setModalEditProjectOpen(false)
  };

  return (
    <Stack spacing={2} direction="row" style={{width:130}}>
      
      <BasicModal text="Edit" modalOpen={modalEditProjectOpen} setModalOpen={setModalEditProjectOpen} color="#343A40">
        <Card>
          <CardHeader
            subheader="Edit project"
          />
          <CardContent>
            <TextField value={editInputText} onChange={e=>setEditInputText(e.target.value)} label="Project name" variant="outlined" fullWidth  />
          </CardContent>
          <CardActions style={{height:40, position:'relative'}}>
            <Stack spacing={2} direction="row" style={{width:110, position:'absolute', right:50, top:4}}>
              <Button variant="contained" style={{backgroundColor:'gray'}} onClick={()=>{setModalEditProjectOpen(false)}}>Cancel</Button>
              <Button variant="contained" color="success" onClick={handleEdit}  >Save</Button>
            </Stack>
          </CardActions>
        </Card>
      </BasicModal>
      
      <BasicModal text="Delete" modalOpen={modalDeleteProjectOpen} setModalOpen={setModalDeleteProjectOpen} color="#E3342F">
        <Card>
          <CardHeader
            subheader="Delete"
          />
          <CardContent>
            This item will be deleted. Are your sure?
          </CardContent>
          <CardActions style={{height:40, position:'relative'}}>
            <Stack spacing={2} direction="row" style={{width:110, position:'absolute', right:50, top:4}}>
              <Button variant="contained" style={{backgroundColor:'gray'}} onClick={()=>{setModalDeleteProjectOpen(false)}}>Cancel</Button>
              <Button variant="contained" color="error" onClick={handleDelete}  >Delete</Button>
            </Stack>
          </CardActions>
        </Card>
      </BasicModal>
      
      <Link to={`/projects/${props.id}`} style={{ textDecoration: 'none' }}><Button variant="contained"style={{backgroundColor:'#6C757D'}} >Details</Button></Link>
    
    </Stack>
  );
}

export default Buttons
