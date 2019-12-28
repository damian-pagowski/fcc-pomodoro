import React from "react";
import "./App.css";
import Control from "./Control";
import Session from "./Session";

class App extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    isRunning: false,
    distanceSession: 25 * 60,
    distanceBreak: 5 * 60,
    currentMode: "session",
    started: false,
    intervalId: null,
  };

  render() {
    return (
      <div className="App">
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          type="audio/mpeg"
          className="clip"
          id="beep"
        />
        <div className="container">
          <div class="jumbotron mt-5">
            <h3 class="display-4">Pomodoro Clock</h3>
            <hr class="my-4" />

            <Control
              data={{
                title: "Break Length",
                value: this.state.breakLength,
                disabled: this.state.started,
              }}
              labels={{
                titleId: "break-label",
                increment: "break-increment",
                decrement: "break-decrement",
                value: "break-length",
              }}
              onUpdate={this.updateBreak}
            />
            <Control
              data={{
                title: "Session Length",
                value: this.state.sessionLength,
                disabled: this.state.started,
              }}
              labels={{
                titleId: "session-label",
                increment: "session-increment",
                decrement: "session-decrement",
                value: "session-length",
              }}
              onUpdate={this.updateSession}
            />

            <hr class="my-4" />
            <Session
              onReset={this.reset}
              onPause={this.togglePause}
              distance={
                this.state.currentMode == "session"
                  ? this.state.distanceSession
                  : this.state.distanceBreak
              }
              mode={this.state.currentMode}
              isRunning={this.state.isRunning}
            />
          </div>
        </div>
      </div>
    );
  }

  updateBreak = update => {
    const newState = { ...this.state };
    newState.breakLength += update;
    newState.distanceBreak = 60 * newState.breakLength;
    if (newState.breakLength >= 0) this.setState(newState);
  };

  updateSession = update => {
    const newState = { ...this.state };
    newState.sessionLength += update;
    newState.distanceSession = 60 * newState.sessionLength;
    if (newState.sessionLength >= 0) this.setState(newState);
  };

  togglePause = () => {
    const newState = { ...this.state };
    newState.isRunning = !newState.isRunning;
    if (!this.state.started) {
      newState.intervalId = setInterval(this.timer, 1000);
      newState.started = true;
    }
    this.setState(newState);
    console.log("state - after pause: " + JSON.stringify(this.state));
  };

  reset = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isRunning: false,
      distanceSession: 25 * 60,
      distenceBreak: 5 * 60,
      currentMode: "session",
      started: false,
      intervalId: null,
    });
    console.log("state - after reset: " + JSON.stringify(this.state));
  };

  alarm = () => {
    console.log("ALARM");
    const elem = document.getElementById("beep");
    console.log("AUDIO + " + elem);
    elem.play();
  };

  timer = () => {
    console.log("tick " + this.state.isRunning);
    if (this.state.isRunning) {
      const newState = { ...this.state };
      if (newState.currentMode == "session") {
        newState.distanceSession -= 1;
      }
      if (newState.currentMode == "break") {
        newState.distanceBreak -= 1;
      }
      this.setState(newState);
      if (
        this.state.currentMode == "session" &&
        this.state.distanceSession <= 0
      ) {
        this.alarm();
        const newState = { ...this.state };
        newState.currentMode = "break";
        this.setState(newState);
      }
      if (this.state.currentMode == "break" && this.state.distanceBreak <= 0) {
        this.alarm();
        const newState = { ...this.state };
        newState.currentMode = "session";
        this.setState(newState);
      }
    }
  };
}

export default App;
