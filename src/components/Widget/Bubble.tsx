import React, { useEffect } from 'react'
import './bubble.scss';

export default function Bubble(props: any) {
  console.log('translate here');
  console.log(props);
  // need to add translation here
  useEffect( () => {
    console.log(props);
  },[props]);
  return (
    <div className={`bubble-container-${props.messageType} bubble`}>
        {props.message.text}
    </div>
  )
}
