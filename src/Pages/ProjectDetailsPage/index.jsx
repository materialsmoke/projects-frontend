import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Navbar from '../../components/Navbar';
import { get, post, patch } from '../../services/backend';
import LiveTimer from '../../components/LiveTimer';

// function createData(startDate,	endDate,	timeSpent) {
//   return {startDate,	endDate,	timeSpent };
// }

const ProjectDetails = (props) => {

  let params = useParams();
  // console.log('params of this page',params);

  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);

  const [startButton, setStartButton] = useState(true);
  const handleStartButton = ()=>{
    setLoading(true)
    post(`/projects/${params.id}/start`).then(data=>{
      setLoading(false);
      setStartButton(false);
    });
  };
  
  const handleStopButton = ()=>{
    setLoading(true);
    patch(`/projects/${params.id}/stop`).then(data=>{
      setLoading(false);
      setStartButton(true);
    });
  };

  const [projectName, setProjectName] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [liveSecondsFromZero, setLiveSecondsFromZero] = useState(0);
  // const [liveSecondsTotalTime, setLiveSecondsTotalTime] = useState(0);

  const [unfinishedRowStartDate, setUnfinishedRowStartDate] = useState(new Date());
  const [totalWorkingTimeStartDate, setTotalWorkingTimeStartDate] = useState(new Date());
  const [totalWorkingTime, setTotalWorkingTime] = useState("00:00:00");

  const [customTimerComponent, setCustomTimerComponent] = useState(null);

  useEffect(()=>{
    get(`/projects/${params.id}`).then(data=>{
      data = data.data;
      setProjectName(data.name);
      setTimeSpent(data.totalWorkingTime)
      setRows(
        data.entries.map((item, index)=>{
          if(item.end !== null){
            return {
              'startDate': item.start,
              'endDate' : item.end,
              'timeSpent': item.timeSpent,
            }
          }
          setStartButton(false);

          let t1 = new Date(item.start);
          let t2 = new Date();
          let dif = ( t2.getTime() - t1.getTime() ) / 1000;
          setLiveSecondsFromZero(Math.round(dif));

          setUnfinishedRowStartDate(item.start);

          setTotalWorkingTimeStartDate(item.start)
      
          setCustomTimerComponent(<LiveTimer startDate={item.start} totalWorkingTime={data.totalWorkingTime} />)

          setTotalWorkingTime(data.totalWorkingTime)

          return {
            'startDate': item.start,
            'endDate' : 'Waiting for stop...',
            'timeSpent': '-',
          }
        })
      )
    });
  }, [startButton, params]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSecondsFromZero(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar/>
      <div style={{padding:20}}>
        <TableContainer component={Paper}>
          <div style={{display:'flex' ,flexDirection:'row', justifyContent:'space-between', padding:20, alignItems:'center', height:20,backgroundColor:'#F7F7F7'}}>
            <div style={{display:'flex' ,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Link to="/" style={{textDecoration:'none', marginRight:20}}><Button variant="contained" color="info" >back</Button></Link>
              <h1 style={{}}>{projectName}</h1> 
            </div>
            {startButton?(
              loading?(
                <Button variant="contained" disabled >Starting...</Button>
              ):(
                <Button variant="contained" color="success" onClick={()=>{handleStartButton()}}>Start</Button>
              )
            ):(
              loading ?(
                <Button variant="contained" disabled >Stopping...</Button>
              ):(
                <Button variant="contained" color={liveSecondsFromZero % 2 ? "error" : "warning"} onClick={()=>{handleStopButton()}}>Stop ({liveSecondsFromZero})s</Button>
              )
            )}
                  
          </div>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Time Spent({startButton ? timeSpent : customTimerComponent})</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" style={{width: '33%'}}>{row.startDate}</TableCell>
                  <TableCell align="left" style={{width: '33%'}}>{row.endDate}</TableCell>
                  <TableCell align="left" style={{width: '33%'}}>
                    {row.timeSpent === '-' ? (
                      <span><LiveTimer startDate={unfinishedRowStartDate} /> <span>{'Continuing' + calculateNumberOfDots(liveSecondsFromZero)}</span></span>
                    ) : (
                      row.timeSpent
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  )
}

const calculateNumberOfDots = (seconds)=>{
  let dots = '';
  for(let i = 0 ; i < seconds % 4; i++){
    dots += '.';
  }

  return dots;
}

export default ProjectDetails