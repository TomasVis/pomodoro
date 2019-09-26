

import React from 'react';

function TimerDisplay(props) {
  console.log(props.date)
  let val = props.date.getMinutes().toString().padStart(2, "0")+":"+
  props.date.getSeconds().toString().padStart(2, "0")
  return <h2 id = {props.id} >{val}</h2>;
}

function Adjustment(props) {
  console.log(props.date)
  //return <h2>It is {props.date.getMinutes()}:{props.date.getSeconds()}.</h2>;
  return <h2 id = {props.id}>{props.date.getMinutes()}</h2>;
}


class Clickity extends React.Component {
    constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick(){
    console.log("clickity from child")
    this.props.click(this.props.id)
  }
    render(){
    return <button onClick={this.handleClick} id ={this.props.id}>{this.props.name}</button>

  }
}
class IncDecButton extends React.Component {
    constructor(props){
    super(props);
    this.handleInc = this.handleInc.bind(this);
  }
  handleInc(){
    console.log("IncDecButton from child")
    console.log(this.props)
    this.props.click(this.props.id)
  }
    render(){
    return <button onClick={this.handleInc} id ={this.props.id}> {this.props.name}</button>
    
  }
}

class Clock1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(20000),
      isTimerRunning: false,
      biggerDate: Date.now(),
      timeToAdd:0,
      breakTime:5*60*1000,
      sessionTime: 25*60*1000,
      isBreakTime: false
      
    };
    this.handleClick = this.handleClick.bind(this)
    this.handleInc = this.handleInc.bind(this)
  }

componentDidMount() {
//console.log(this.state.timeToAdd)
  this.setState({
    time:new Date(this.state.sessionTime),
    timeToAdd:this.state.sessionTime
  })
}
reset(){

}


handleInc(id){

  console.log("IncDecButton from parent")
  console.log("ID is : "+id)
  if(!this.state.isTimerRunning){
    let newTime =this.state.sessionTime
    switch (id){
      case "break-decrement":
         newTime =this.state.breakTime - 60000
        this.setState({
          
          breakTime: newTime

        })
      break;

      case "break-increment":
         newTime =this.state.breakTime + 60000
        this.setState({
          
          breakTime: newTime

        })
      break;


      case "session-decrement":
         newTime =this.state.sessionTime - 60000
        this.setState({
          time:new Date(newTime),
          sessionTime: newTime,
          timeToAdd: newTime

        })
      break;


      case "session-increment":
        newTime =this.state.sessionTime + 60000
        this.setState({
          time:new Date(newTime),
          sessionTime: newTime,
          timeToAdd: newTime

        })
      break;
      }
      
    }
    else{
      //do nothing
    }
  
}



  handleClick(id){
    console.log("clickity")
    console.log(id)

    if(!this.state.isTimerRunning){
    this.setState({
      isTimerRunning:true,
      biggerDate:this.state.timeToAdd+Date.now().valueOf()
    })
    this.runTimer()
    }
    //saves amount of timer time left in state.timeToAdd
    else{
      this.setState({
      isTimerRunning:false,
      timeToAdd:this.state.biggerDate-Date.now().valueOf()
    })
    
    }
  }

  runTimer(){

      this.timerSession = setInterval(
        () => {this.tick()
         if(!this.state.isTimerRunning) {
        clearInterval(this.timerSession);
      }},
        100
      );

}

tick() {


  if(new Date(this.state.biggerDate - new Date().valueOf())<0){
    //if timeLeft = 0, switch between break time and session time
    if(!this.state.isBreakTime){
      this.setState({
        isBreakTime: !this.state.isBreakTime,
        biggerDate: Date.now().valueOf()+this.state.breakTime
        //isTimerRunning:false
      })

  }
    else{
      this.setState({
        isBreakTime: !this.state.isBreakTime,
        biggerDate: Date.now().valueOf()+this.state.sessionTime
        //isTimerRunning:false
      })

    }
      
  }
  else{  this.setState({
      time: new Date(this.state.biggerDate - new Date().valueOf())
        });
      }
  }
  
  render() {
    return (
      <div>
        <h1 id="timer-label">{this.state.isBreakTime ? "Break" : "Session"}</h1>
        <TimerDisplay id="time-left" date={this.state.time} />
        <Clickity click= {this.handleClick} id="start_stop" name={'Start/Stop'}/>
        <h1 id="session-label">Session Timer</h1>
        <Adjustment id="session-length" date={new Date(this.state.sessionTime)} />
        <IncDecButton click= {this.handleInc} id={"session-increment"} name={'^'}/>
        <IncDecButton click= {this.handleInc} id={"session-decrement"} name={'V'}/>
        <h1 id="break-label" >Break Timer</h1>
        <Adjustment id="break-length"  date={new Date(this.state.breakTime)} />
        <IncDecButton click= {this.handleInc} id={"break-decrement"} name={'BV'}/>
        <IncDecButton click= {this.handleInc} id={"break-increment"} name={'B^'}/>
      </div>
    );
  }
}





function App() {
  return (
    <div className="App">
     <Clock1 /> 
    </div>
  );
}

export default App;
/*




User Story #10: I can see a clickable element with a corresponding id="reset".
User Story #11: When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length"should return to 5, the value within id="session-length"should return to 25, and the element with id="time-left"should reset to it's default state.


User Story #16: I should not be able to set a session or break length to <= 0.
User Story #17: I should not be able to set a session or break length to > 60.




User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audiotag and have a corresponding id="beep".
User Story #27: The audio element with id="beep"must be 1 second or longer.
User Story #28: The audio element with id of beepmust stop playing and be rewound to the beginning when the element with the id of resetis clicked.

*/