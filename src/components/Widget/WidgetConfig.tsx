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
  const [formState, setFormState] = useState({ languageCode: props.languageCode, channelName: props.widgetChannel });

  const editContainer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { languageCode, channelName } = formState;
    if (!!channelName.trim() && !!languageCode) {
      props.editContainer(props.widgetTitle, languageCode, channelName);
    } else {
      console.error('Error: required field not filled');
    }
  };

  return (
    <div className='widget-config-container'>
      <form name='edit-container-form' className='edit-container-form' onSubmit={editContainer}>
        <input
          type='text'
          placeholder='Enter Channel name'
          name='channelName'
          value={formState.channelName}
          onChange={(e) => setFormState({ ...formState, channelName: e.target.value })}
          required
        />
        <select
          name='languageCode'
          value={formState.languageCode}
          onChange={(e) => setFormState({ ...formState, languageCode: e.target.value })}
        >
          {SUPPORTED_LANGUAGE.map((languageObj) => (
            <option key={languageObj.languageCode} value={languageObj.languageCode}>
              {languageObj.language}
            </option>
          ))}
        </select>
        <button className="button-primary" data-testid="update-button">
          Update
        </button>
      </form>
    </div>
  );
}
