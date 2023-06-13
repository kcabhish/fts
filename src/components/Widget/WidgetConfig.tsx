import React, {useState} from 'react'
import { SUPPORTED_LANGUAGE } from '../../constants';
import './widgetConfig.scss';


interface IWidgetConfig {
    widgetChannel: string;
    // origin language code
    languageCode: string;
    widgetTitle: string;
    editContainer: (widgetTitle: string, languageCode: string, channel: string) => void;
}
export default function WidgetConfig(props: IWidgetConfig) {
//   const [widgetName, setWidgetName] = useState(props.widgetTitle);
  const [languageCode, setLanguageCode] = useState(props.languageCode);
  const [channelName, setChannelName] = useState(props.widgetChannel);

  const editContainer = (e:any) => {
    try {
        e.preventDefault();
        // const widgetNameFormVal = e.target.widgetName.value.trim();
        const languageCodeFormVal = e.target.languageCode.value;
        const channelNameFormVal = e.target.channelName.value.trim();
        if (!!channelNameFormVal && !!languageCodeFormVal) {
            props.editContainer(props.widgetTitle, languageCodeFormVal, channelNameFormVal);
        } else {
            // @todo: enter complete field
            console.log('Error: required field not filled');
        }
    } catch(e) {
        console.log(e);
    }
  }
 
  return (
    <div className='widget-config-container'>
        <form name='edit-container-form' className='edit-container-form' onSubmit={editContainer}>
              <input type='text'
                placeholder='Enter Channel name'
                name='channelName'
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}></input>
              <select name='languageCode' value={languageCode} onChange={(e) => setLanguageCode(e.target.value) }>
                {SUPPORTED_LANGUAGE.map(languageObj => <option key={languageObj.languageCode} value={languageObj.languageCode}>{languageObj.language}</option>)}
              </select>
              <button className='button-primary'>Update</button>
            </form>
    </div>
  )
}
