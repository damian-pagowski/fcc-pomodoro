import React from "react";

function n(n){
    return n > 9 ? "" + n: "0" + n;
}
export default function Session(props) {
    const minutes = Math.floor((props.distance % (60 * 60)) / 60);
    const seconds = Math.floor(
        props.distance % 60
      )
  return (
    <div>
      <h5 id="timer-label">{props.mode}</h5>
      <h1>
        <span class="badge badge-danger" id="time-left">
          {`${n(minutes)}:${n(seconds)}`}
        </span>
      </h1>

      <span id="timer-control" class="input-group mb-3">
        <button
          className="btn btn-danger"
          id="start_stop"
          onClick={props.onPause}
        >
          {props.isRunning ? (
            <i class="fa fa-pause fa-2x"></i>
          ) : (
            <i class="fa fa-play fa-2x"></i>
          )}
        </button>
        <button className="btn btn-danger" id="reset" onClick={props.onReset}>
          <i class="fa fa-refresh fa-2x"></i>
        </button>
      </span>
    </div>
  );
}
