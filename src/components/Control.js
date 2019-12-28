import React from "react";

export default function Control(props) {
 
  return (
    <div>
      <h5 id={props.labels.titleId}>{props.data.title}</h5>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button
            id={props.labels.decrement}
            className="btn btn-danger"
            onClick={() => props.onUpdate(-1)}
            disabled={props.data.disabled}
          >
            -
          </button>
        </div>

        <div id={props.labels.value} className="alert alert-light mb-0">
          {props.data.value}
        </div>

        <div className="input-group-append">
          <button
            id={props.labels.increment}
            className="btn btn-danger"
            onClick={() => props.onUpdate(1)}
            disabled={props.data.disabled}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
