import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicModal from '../../../components/Modal';
import { Card, CardHeader, CardContent, CardActions} from '@mui/material';
import TextField from '@mui/material/TextField';
import Buttons from './Buttons';
import { get, post, patch, destroy } from '../../../services/backend';

// function createData(name, entries, time, action) {
//   return { name, entries, time, action };
// }

export default function BasicTable(props) {

  const [modalAddProjectOpen, setModalAddProjectOpen] = useState(false);

  const [rows, setRows] = useState([
    // createData('Frozen yoghurt', 159, 6.0, <Buttons id="2" />),
    // createData('Ice cream sandwich', 237, 9.0, <Buttons/>),
    // createData('Eclair', 262, 16.0, <Buttons/>),
    // createData('Cupcake', 305, 3.7, <Buttons/>),
    // createData('Gingerbread', 356, 16.0, <Buttons/>),
  ]);

  const [reloadComponent, setReloadComponent] = useState(new Date());


  useEffect(()=>{
    get('/projects').then(data=>{
      data = data.data.data;
      setRows(data.map((item)=>{
        return {
          id:item.id,
          name:item.name,
          workingTimeSeconds: item.workingTimeSeconds,
          totalEntries: item.totalEntries,
          isStopped: item.isStopped,
        };
      }));
    });
  },[reloadComponent]);

  const [createProjectInput, setCreateProjectInput] = useState('');

  const handleSave = (e)=>{
    post('/projects', {
      name:createProjectInput
    }).then(data=>{
      setModalAddProjectOpen(false);
      setCreateProjectInput('');
      setReloadComponent(new Date());
      console.log('saved', createProjectInput)
    });
  };


  const handleEdit = (id, text)=>{
    patch(`/projects/${id}`, {
      name:text
    }).then(data=>{
      console.log('edited', data)
      setReloadComponent(new Date());
    }).catch(e=>{
      console.log('console has error while updating...this name already exist.please change the name')
    })
  }

  const handleDelete = (id)=>{
    destroy(`/projects/${id}`).then(data=>{
      console.log('deleted', data)
      setReloadComponent(new Date());
    })
  }
  
  return (
    <TableContainer component={Paper}>
      <div style={{display:'flex' ,flexDirection:'row', justifyContent:'space-between', padding:20, alignItems:'center', height:20,backgroundColor:'#F7F7F7'}}>
        <h1 style={{}}>Projects</h1>
        <BasicModal text="Add project" modalOpen={modalAddProjectOpen} setModalOpen={setModalAddProjectOpen}>
          <Card>
            <CardHeader
              subheader="Add project"
            />
            <CardContent>
              <TextField autoComplete='off' value={createProjectInput} onChange={(e)=>setCreateProjectInput(e.target.value)} label="Project name" variant="outlined" fullWidth  />
            </CardContent>
            <CardActions style={{height:40, position:'relative'}}>
              <Stack spacing={2} direction="row" style={{width:110, position:'absolute', right:50, top:4}}>
                <Button variant="contained" style={{backgroundColor:'gray'}} onClick={()=>{setModalAddProjectOpen(false)}}>Cancel</Button>
                <Button variant="contained" color="success" onClick={(e)=>{handleSave(e)}}>Save</Button>
              </Stack>
            </CardActions>
          </Card>
        </BasicModal>
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="left">Entries</TableCell>
            <TableCell align="left">Total time</TableCell>
            <TableCell align="left">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{backgroundColor:(row.isStopped ? 'white': '#def8ff')}}
            >
              <TableCell align="left" style={{width:'25%'}}>{row.name}</TableCell>
              <TableCell align="left" style={{width:'25%'}}>{row.totalEntries}</TableCell>
              <TableCell align="left" style={{width:'25%'}}>{row.workingTimeSeconds + (row.isStopped ? '' : ' Still Working')}</TableCell>
              <TableCell align="left" style={{width:'25%', minWidth:300}}><Buttons id={row.id} handleEdit={handleEdit} editDefaultValue={row.name} handleDelete={handleDelete} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}