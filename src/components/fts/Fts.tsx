import React, { useState } from 'react'
import './fts.scss';
import Widget from '../Widget/Widget';
import { SUPPORTED_LANGUAGE } from '../../constants';

const DEFAULT_CHANNEL = 'default channel';
const DEFAULT_LANGUAGE = 'en';

export default function Fts() {
  const [widgetName, setWidgetName] = useState('');
  const [channelName, setChannelName] = useState(DEFAULT_CHANNEL);
  const [languageCode, setLanguageCode] = useState(DEFAULT_LANGUAGE);

  const [widgets, addWidgets] = useState([{
    widgetTitle: 'Default Widget',
    channelName: DEFAULT_CHANNEL,
    languageCode: DEFAULT_LANGUAGE
  }]);
  
  const addContainers = (e:any) => {
    e.preventDefault();
    const widgetNameFormVal = e.target.widgetName.value.trim();
    const channelNameFormVal = e.target.channelName.value.trim();
    // prevent adding information if name is empty or if it already exists
    if (widgetNameFormVal && !widgets.find(widgetObject => widgetObject.widgetTitle === widgetNameFormVal)) {
      addWidgets([...widgets, {
        widgetTitle: widgetNameFormVal,
        channelName: channelNameFormVal || DEFAULT_CHANNEL,
        languageCode: languageCode || DEFAULT_LANGUAGE
      }]);
      setWidgetName('');
    }
  }

  return (
    <div className='fts-main-container vertical-container'>
        <div className='fts-header-container'>
            <form name='add-container-form' className='add-container-form' onSubmit={addContainers}>
              <input type='text'
                placeholder='Enter widget name'
                name='widgetName'
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}></input>
              <input type='text'
                placeholder='Enter Channel name'
                name='channelName'
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}></input>
              <select name='languageCode' value={languageCode} onChange={(e) => setLanguageCode(e.target.value) }>
                {SUPPORTED_LANGUAGE.map(languageObj => <option key={languageObj.languageCode} value={languageObj.languageCode}>{languageObj.language}</option>)}
              </select>

              <button className='button-primary'>Add Widget</button>
            </form>
        </div>
        <div className='fts-body-container'>
            {
              widgets.map(widgetObject => {
                return <Widget 
                          key={widgetObject.widgetTitle}
                          languageCode={widgetObject.languageCode}
                          widgetChannel={widgetObject.channelName}
                          widgetTitle={widgetObject.widgetTitle}/>
              })
            }
        </div>
    </div>
  )
}
