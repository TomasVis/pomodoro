import React from 'react';
import logo from './logo.svg';
import './App.css';


/*


User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length"should return to 5, the value within id="session-length"should return to 25, and the element with id="time-left"should reset to it's default state.
User Story #12: When I click the element with the id of break-decrement, the value within id="break-length"decrements by a value of 1, and I can see the updated value.
User Story #13: When I click the element with the id of break-increment, the value within id="break-length"increments by a value of 1, and I can see the updated value.
User Story #14: When I click the element with the id of session-decrement, the value within id="session-length"decrements by a value of 1, and I can see the updated value.
User Story #15: When I click the element with the id of session-increment, the value within id="session-length"increments by a value of 1, and I can see the updated value.
User Story #16: I should not be able to set a session or break length to <= 0.
User Story #17: I should not be able to set a session or break length to > 60.
User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.
User Story #19: If the timer is running, the element with the id of time-leftshould display the remaining time in mm:ssformat (decrementing by a value of 1 and updating the display every 1000ms).
User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.
User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.
User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-labelshould display a string indicating a break has begun.
User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the id="break-length"element.
User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-labelshould display a string indicating a session has begun.
User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the id="session-length"element.
User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audiotag and have a corresponding id="beep".
User Story #27: The audio element with id="beep"must be 1 second or longer.
User Story #28: The audio element with id of beepmust stop playing and be rewound to the beginning when the element with the id of resetis clicked.*/
class App extends React.Component {
  constructor(props){
    super(props)
this.state ={
    timerOn: false,            //if false, timer is either paused, or was not started
    isSessionRunning: true ,  //if false, break time is running, if true, session time is running
    timerStart: "",           //date now + sessionLength/breakLength
    sessionTime: 25*60*1000,  //default value of session
    breakTime: 5*60*1000,     //default value of break
    timeLeft: 25*60*1000 //25*60*1000,  // if pause is pressed this gets value of timerStart - date.now()
    //breakTime: 5000 //5*60*1000
  }
this.setState({
  timeLeft:this.state.sessionTime
})
}

handleTimeChange = (id) =>{
  if(!this.state.timerOn){
    switch (id){
      case "br-dec":this.setState({

      breakTime:this.state.breakTime-60000
      })
      break;

      case "br-inc":this.setState({

      breakTime:this.state.breakTime+60000
      })
      break;


      case "se-dec":this.setState({

      sessionTime:this.state.sessionTime-60000
      })
      break;


      case "se-inc":this.setState({

      sessionTime:this.state.sessionTime+60000
      })
      break;
      }
      this.setState({
        timeLeft:this.state.sessionTime
      })
    }
    else{
      //do nothing
    }
}
switchSesionToBreak = () => {
console.log("time to switch")
  if(this.isSessionRunning){
    this.setState({
      timeLeft: this.state.sessionTime
    })
  }
  else{
    this.setState({
      timeLeft: this.state.breakTime
    })
  }
this.runTimer()
}
startTimer = async () => {
  await this.setState({
    timerOn: !this.state.timerOn,

  })
  this.runTimer()           //state needs to be set before running the timer
}

runTimer = ()  => {
  
  if(this.state.timerOn){
  this.setState({
    timerStart:  Date.now()+ this.state.timeLeft

  })
  this.run = setInterval(() => {
    this.setState({
      timeLeft:this.state.timerStart  - Date.now() 
    });
    if(!this.state.timerOn) {
      clearInterval(this.run);
    }
    else if(this.state.timeLeft<999){
      console.log("time is up")
      this.setState({
        isSessionRunning:!this.state.isSessionRunning     // switch between session and break
      })
      clearInterval(this.run);
      this.switchSesionToBreak();
    }
  }, 50);
}
  else if(!this.state.timerOn){
  console.log("pause was pressed")
  this.setState({
    timeLeft: this.state.timerStart - Date.now()
  })
  this.stop = setInterval(() => {
      this.setState({
        timeLeft:this.state.timeLeft
      });
      if(this.state.timerOn) {
        clearInterval(this.stop);
      }
    }, 0.1);
  }
}
  render(){
    const seconds = (Math.floor(this.state.timeLeft /1000) %60).toString().padStart(2, "0")
    const minutes = (Math.floor(this.state.timeLeft / 60000) % 60).toString().padStart(2, "0")
    const breakTime = (Math.floor(this.state.breakTime/ 60000) % 60).toString().padStart(2, "0")
    const sessionTime = (Math.floor(this.state.sessionTime/ 60000) % 60).toString().padStart(2, "0")
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div>

        <div>
          
          <h2 id="session-label">Session Length</h2>
          <div id="session-length">{sessionTime}</div>
                    <button id="session-increment" onClick={() => this.handleTimeChange("se-inc")}  >^</button>
          <button id="session-decrement" onClick={() => this.handleTimeChange("se-dec")} >V</button>

          <h2 id="break-label">Break Length</h2>
          <div id="break-length" >{breakTime}</div>
          <button id="break-decrement" onClick={() => this.handleTimeChange("br-dec")} >bV</button>

          <button id="break-increment" onClick={() => this.handleTimeChange("br-inc")} >b^</button>
          

          
          

          <h2 id="timer-label">Session</h2>
          <h2 id="time-left">{minutes+":"+seconds}</h2>
         
          <button id="start_stop" onClick={this.startTimer} >Start/stop</button>
          <button id="reset" >Reset</button>

        </div>


      </div>
    </div>
  );
}
}



export default App;
