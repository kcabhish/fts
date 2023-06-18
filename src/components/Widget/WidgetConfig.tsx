import React, { useState } from 'react';
import { SUPPORTED_LANGUAGE } from '../../constants';
import './widgetConfig.scss';

interface IWidgetConfig {
  widgetChannel: string;
  languageCode: string;
  widgetTitle: string;
  editContainer: (widgetTitle: string, languageCode: string, channel: string) => void;
}

export default function WidgetConfig(props: IWidgetConfig) {
  const [languageCode, setLanguageCode] = useState(props.languageCode);
  const [channelName, setChannelName] = useState(props.widgetChannel);

  const editContainer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const channelNameFormVal = channelName.trim();
    const languageCodeFormVal = languageCode;
    if (!!channelNameFormVal && !!languageCodeFormVal) {
      props.editContainer(props.widgetTitle, languageCodeFormVal, channelNameFormVal);
    } else {
      console.log('Error: required field not filled');
    }
  };

  return (
    <div className='widget-config-container'>
      <form name='edit-container-form' className='edit-container-form' onSubmit={editContainer}>
        <input
          type='text'
          placeholder='Enter Channel name'
          name='channelName'
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <select name='languageCode' value={languageCode} onChange={(e) => setLanguageCode(e.target.value)}>
          {SUPPORTED_LANGUAGE.map((languageObj) => (
            <option key={languageObj.languageCode} value={languageObj.languageCode}>
              {languageObj.language}
            </option>
          ))}
        </select>
        <button className='button-primary'>Update</button>
      </form>
    </div>
  );
}
