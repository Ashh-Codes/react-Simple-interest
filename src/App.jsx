
import { useState } from 'react';
import './App.css'
import { TextField,Stack,Button} from '@mui/material';

function App() {
  const [Principal,setPrincipal] = useState(0)
  const [rate,setRate] = useState(0)
  const [year,setYear] = useState(0)
  const [interest,setInterest] = useState(0)
  const [isPrincipleInvalid,setisPrincipleInvalid] = useState(false)//initially value is not invalid
  const [isRateInvalid,setisRateInvalid] = useState(false)
  const [isyearInvalid,setisyearInvalid] = useState(false)


  const validInput =(inputTag)=>{
    //give input tag(target) so that fn can recognise which input fieild is calling the fn to validate.as all input tag use same fn to validate
    //input tag is object
    //so to object destructuring using const {key1,key2...} = object-name
    //so can also be given like const validInput =({name,value})=>{ also destructuring

    //type of value is string so use js string match method and regular expressions of js
    const {name,value} = inputTag 
    console.log(name,value);
    console.log(!!value.match(/^[0-9]*.?[0-9]+$/)); //!! to make it boolean ,\d =[0-9]  ,second \d for decimal
    console.log(!!value.match(/^\d*\.?\d+$/));//learn more about regular expressions

    if(name=="principle"){
      setPrincipal(value)
      !!value.match(/^\d*\.?\d+$/) ? setisPrincipleInvalid(false):setisPrincipleInvalid(true)
    }
    if(name=="rate"){
      setRate(value)
      !!value.match(/^\d*\.?\d+$/) ? setisRateInvalid(false):setisRateInvalid(true)
    }
    if(name=="year"){
      setYear(value)
      !!value.match(/^\d*\.?\d+$/) ? setisyearInvalid(false):setisyearInvalid(true)
    }
    
    
    

  }
  const handleCalculate =(e)=>{
    e.preventDefault()  //this prevent all unwanteed refresh of page,only submit need to work onclicking the button
    // // setInterest((Principal*rate*year)/100);
    console.log("Inside real dom");
    if(Principal && rate && year){
    setInterest(Principal*rate*year/100)
    }else{
      alert("please fill the form completely")
    }

    // // console.log(interest);
    
    
  }
  // const restdata=()=>{
  //    if (TextField.current)
  // }
  const handleReset =()=>{
    setPrincipal(0)
    setInterest(0)
    setYear(0)
    setRate(0)
    setisPrincipleInvalid(false)
    setisRateInvalid(false)
    setisyearInvalid(false)
  }

  return (
    
    <div style={{minHeight:'100vh',width:'100%'}} className='d-flex justify-content-center align-items-center bg-dark'>
      <div style={{width:'500px'}} className='bg-light rounded p-5'>
      <h3>Simple interest calculator</h3>
      <p>Calculate your simple interest easily</p>
      <div className='d-flex flex-column text-light justify-content-center align-items-center bg-warning shadow p-3 rounded'>
        <h1>{interest}</h1>
        <p className='fw-bolder'>
          Total Simple interest
        </p>
      </div>
      <form className='mt-5'>
        <div className="mb-3">
          {/* //if no principle value then it shows initial value 0,so set as empty string */}
        <TextField value={Principal || ""} name="principle" id="outlined-basic" className='w-100' label="₹ Principal Amount"  onChange={e=>validInput(e.target)}  variant="outlined" />
        </div>
        {
          isPrincipleInvalid &&
          <div className='mb-3 text-danger fw-bolder'>Invalid principle amount</div>
        }
        <div className="mb-3">
        <TextField value={rate || ""} name="rate" id="outlined-basic1" className='w-100' label="₹ Rate of Interest (p.a)%"  onChange={e=>validInput(e.target)} variant="outlined" />
         </div>
         {/* type of input is object */}
         {
          isRateInvalid &&
          <div className='mb-3 text-danger fw-bolder'>Invalid Rate</div>
        }
        <div className="mb-3">
        <TextField value={year || ""} name="year" id="outlined-basic2" className='w-100' label="₹ Time  period(yr)" onChange={e=>validInput(e.target)}  variant="outlined" />
        </div>
        {
          isyearInvalid &&
          <div className='mb-3 text-danger fw-bolder'>Invalid year</div>
        }

        <Stack direction="row" spacing={2}>
        <Button disabled={isPrincipleInvalid || isRateInvalid || isyearInvalid} onClick={handleCalculate} style={{width:'50%',height:'70px'}} className='bg-dark' variant="contained">Calculate</Button>
        <Button onClick={handleReset} style={{width:'50%',height:'70px'}}  variant="outlined">Reset</Button>

        </Stack>
      </form>
      </div>
   
    </div>
      
    
  )
}

export default App
