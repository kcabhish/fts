import React, { useState } from 'react'
import './fts.scss';
import Widget from '../Widget/Widget';
import { SUPPORTED_LANGUAGE } from '../../constants';

const DEFAULT_CHANNEL = 'default channel';
const DEFAULT_LANGUAGE = 'en';

export interface IMessage {
  id: string,
  text: string,
  source: {
      languageCode: string,
      widgetName: string,
      channelName: string
  }
}

export default function Fts() {
  const [widgetName, setWidgetName] = useState('');
  const [channelName, setChannelName] = useState(DEFAULT_CHANNEL);
  const [languageCode, setLanguageCode] = useState(DEFAULT_LANGUAGE);

  // @todo: this needs to be redefined for translation in phase 2
  const [messageList, setMessageList] = useState<IMessage[]>([]);

    /**
   * Grabs contents from the message after the message is sent and updates the messageList
   * @param e 
   */
    const updateMessageList = (message: IMessage) => {
      if (message) {
          if (messageList.length > 0) {
              setMessageList([...messageList, message]);
          } else {
              setMessageList([message]);
          }
      }
    }

  const [widgets, updateWidgets] = useState([{
    widgetTitle: 'Default Widget',
    channelName: DEFAULT_CHANNEL,
    languageCode: DEFAULT_LANGUAGE,
    isActive: true
  }]);
  
  /**
   * Adds a new chat container on the UI 
   * @param e 
   */
  const addContainers = (e:any) => {
    e.preventDefault();
    const widgetNameFormVal = e.target.widgetName.value.trim();
    const channelNameFormVal = e.target.channelName.value.trim();
    // prevent adding information if name is empty or if it already exists
    if (widgetNameFormVal && !widgets.find(widgetObject => widgetObject.widgetTitle === widgetNameFormVal)) {
      updateWidgets([...widgets, {
        widgetTitle: widgetNameFormVal,
        channelName: channelNameFormVal || DEFAULT_CHANNEL,
        languageCode: languageCode || DEFAULT_LANGUAGE,
        isActive: true
      }]);
      setWidgetName('');
    }
  }

  /**
   * Call back function to remove the container when user clicks on the close icon
   * @param widgetTitle 
   */
  const removeContainer = (widgetTitle: string) => {
    try {
      widgets.forEach(widgetObject => {
        if (widgetObject.widgetTitle === widgetTitle) {
          widgetObject.isActive = false;
        }
      });
      updateWidgets([...widgets]);
    } catch (e) {
      console.log(e);
    }
  }

    /**
   * Call back method that receives the language code and channel, then updates the value of the object in the widgets list
   * @param title 
   * @param languageCode 
   * @param channel 
   */
    const editContainer = (title: string, languageCode: string, channel: string ) => {
      try {
          widgets.forEach(widgetObject => {
            if (widgetObject.widgetTitle === title) {
              widgetObject.channelName = channel;
              widgetObject.languageCode = languageCode
            }
          });
          updateWidgets([...widgets]);
      } catch (e) {
          console.log(e);
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
                return widgetObject.isActive && <Widget 
                          key={widgetObject.widgetTitle}
                          updateMessageList={updateMessageList}
                          messageList={messageList}
                          languageCode={widgetObject.languageCode}
                          widgetChannel={widgetObject.channelName}
                          widgetTitle={widgetObject.widgetTitle}
                          editContainer={editContainer}
                          removeContainer={removeContainer}/>
              })
            }
        </div>
    </div>
  )
}
