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
    timerOn: false,
    timerTime: 25*60*1000,
    timerStart: "", //date now + sessionLength/breakLength
    sessionLength: 25*60*1000,
    breakLength: 5*60*1000,
    timeLeft: 25*60*1000  // if pause is pressed this gets value of timerStart - date.now()
  }

}

startTimer = async () =>{
  await this.setState({
    timerOn: !this.state.timerOn
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
      timerTime:this.state.timerStart  - Date.now() 
    });
    if(!this.state.timerOn) {
      clearInterval(this.run);
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
      timerTime:this.state.timeLeft
    });
    if(this.state.timerOn) {
      clearInterval(this.stop);
    }
  }, 0.1);
}
}
  render(){
    const seconds = Math.floor(this.state.timerTime /1000) %60
    const minutes = Math.floor(this.state.timerTime / 60000) % 60
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div>

        <div>
          <h2 id="break-label">Break Length</h2><h2 id="session-label">Session Length</h2>
          <button id="break-decrement" >V</button>
          
          <button id="break-increment" >^</button>
          

          <div id="break-length">5</div>
          <div id="session-length">25</div>

          <h2 id="timer-label">Session</h2>
          <h2 id="time-left" >{minutes}:{seconds}</h2>
          <Sesion/>

          <button id="start_stop" onClick={this.startTimer} >Start/stop</button>
          <button id="reset" >Reset</button>

        </div>


      </div>
    </div>
  );
}
}

const Sesion = () => {
  return (
    <div>
      <button id="session-increment" onClick={startTimer} >^</button>
      <button id="session-decrement" >V</button>
    </div>
  );
};

export default App;
