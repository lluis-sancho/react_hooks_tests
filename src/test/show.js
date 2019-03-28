import React, { useState, useEffect } from 'react';

export default function TestShow(props) {


  return (
    <div>
      <p>{props.userSelected.first_name}</p>
      <button onClick={() => {props.deSelect()}}>
        Volver
      </button>
    </div>
  );
}
