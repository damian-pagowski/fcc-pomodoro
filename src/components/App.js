import React from "react";
import "./App.css";
import Control from "./Control";
import Timer from "./Timer";

const FREQUENCY = 1000;
const MAX_SESSION_OR_BREAK = 60;
const SECONDS_IN_MINUTE = 60;

const DEFAULT_BREAK_MINUTES =  5;
const DEFAULT_SESSION_MINUTES = 25;

const DEFAULT_STATE = {
  breakLength: DEFAULT_BREAK_MINUTES,
  distanceBreak: DEFAULT_BREAK_MINUTES * SECONDS_IN_MINUTE,
  sessionLength: DEFAULT_SESSION_MINUTES,
  distanceSession: DEFAULT_SESSION_MINUTES * SECONDS_IN_MINUTE,
  isRunning: false,
  currentMode: "session",
  started: false,
  intervalId: null,
};
class App extends React.Component {
  state = { ...DEFAULT_STATE };

  render() {
    return (
      <div className="App">
        <audio
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Cracow_trumpet_signal.ogg"
          type="audio/ogg"
          className="clip"
          id="beep"
        />
        <div className="container">
          <div class="jumbotron mt-5">
            <h3 class="display-4" id="app-title">
              Pomodoro Clock
            </h3>
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
            <Timer
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
    newState.distanceBreak = SECONDS_IN_MINUTE * newState.breakLength;
    if (
      newState.breakLength >= 1 &&
      newState.breakLength <= MAX_SESSION_OR_BREAK
    )
      this.setState(newState);
  };

  updateSession = update => {
    const newState = { ...this.state };
    newState.sessionLength += update;
    newState.distanceSession = SECONDS_IN_MINUTE * newState.sessionLength;
    if (
      newState.sessionLength >= 1 &&
      newState.sessionLength <= MAX_SESSION_OR_BREAK
    )
      this.setState(newState);
  };

  togglePause = () => {
    const newState = { ...this.state };
    newState.isRunning = !newState.isRunning;
    if (!this.state.started) {
      newState.intervalId = setInterval(this.timer, FREQUENCY);
      newState.started = true;
    }
    this.setState(newState);
  };

  reset = () => {
    clearInterval(this.state.intervalId);
    this.setState({ ...DEFAULT_STATE });
    this.stopAlarm();
  };

  stopAlarm = () => {
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  };

  alarm = () => {
    const sound = document.getElementById("beep");
    sound.play();
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
        this.state.distanceSession < 0
      ) {
        this.alarm();
        this.startBreak();
      }
      if (this.state.currentMode == "break" && this.state.distanceBreak < 0) {
        this.alarm();
        this.startSession();
      }
    }
  };

  startSession() {
    const newState = { ...this.state };
    newState.currentMode = "session";
    newState.distanceSession = this.state.sessionLength * SECONDS_IN_MINUTE;
    newState.distenceBreak = this.state.breakLength * SECONDS_IN_MINUTE;
    this.setState(newState);
  }

  startBreak() {
    const newState = { ...this.state };
    newState.currentMode = "break";
    newState.distenceBreak = this.state.breakLength * SECONDS_IN_MINUTE;
    newState.distenceBreak = this.state.breakLength * SECONDS_IN_MINUTE;
    this.setState(newState);
  }
}
export default App;
