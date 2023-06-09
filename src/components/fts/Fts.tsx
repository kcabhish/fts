import React, { useState } from 'react'
import './fts.scss';
import Widget from '../Widget/Widget';

export default function Fts() {
  const [widgetName, setWidgetName] = useState('');
  const [widgets, addWidgets] = useState(['Default Widget']);
  
  const addContainers = (e:any) => {
    e.preventDefault();
    const widgetNameFormVal = e.target.widgetName.value;
    // prevent adding information if name is empty or if it already exists
    if (widgetNameFormVal && !widgets.find(widgetName => widgetName === widgetNameFormVal)) {
      addWidgets([...widgets, widgetNameFormVal]);
      setWidgetName('');
    }
  } 
  return (
    <div className='fts-main-container vertical-container'>
        <div className='fts-header-container'>
            <form name='add-container-form' onSubmit={addContainers}>
              <input type='text'
                placeholder='Enter widget name'
                name='widgetName'
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}></input>
              <button>Add Widget</button>
            </form>
        </div>
        <div className='fts-body-container'>
            {
              widgets.map(widgetName => {
                console.log(widgetName);
                return <Widget key={widgetName} widgetTitle={widgetName}/>
              })
            }
        </div>
    </div>
  )
}
