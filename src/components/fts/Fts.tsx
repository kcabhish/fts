import React, { useState, useEffect, useCallback } from 'react';
import './fts.scss';
import Widget from '../Widget/Widget';
import { SUPPORTED_LANGUAGE } from '../../constants';
import { sendMessageToOpenAi } from '../../services/service';

const DEFAULT_CHANNEL = 'default channel';
const DEFAULT_LANGUAGE = 'en';

export interface IMessage {
  id: string;
  text: string;
  source: {
    languageCode: string;
    widgetName: string;
    channelName: string;
  };
}

export default function Fts() {
  const [widgetName, setWidgetName] = useState('');
  const [channelName, setChannelName] = useState(DEFAULT_CHANNEL);
  const [languageCode, setLanguageCode] = useState(DEFAULT_LANGUAGE);
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [widgets, setWidgets] = useState([
    {
      widgetTitle: 'Default Widget',
      channelName: DEFAULT_CHANNEL,
      languageCode: DEFAULT_LANGUAGE,
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (messageList.length > 0) {
      const lastMessage = messageList[messageList.length - 1];
      const isOpenAi = lastMessage?.source.widgetName === 'openAi';
      if (!isOpenAi) {
        const sendMessage = async () => {
          const response = await sendMessageToOpenAi({ message: lastMessage?.text });
          const newOpenAiResponseObject = {
            id: new Date().toISOString(),
            text: response.reply,
            source: {
              widgetName: 'openAi',
              channelName,
              languageCode,
            },
          };
          setMessageList((prevMessageList) => [...prevMessageList, newOpenAiResponseObject]);
        };
        sendMessage();
      }
    }
  }, [messageList, channelName, languageCode]);

  const updateMessageList = useCallback(
    (message: IMessage) => {
      if (message) {
        setMessageList((prevMessageList) => [...prevMessageList, message]);
      }
    },
    []
  );

  const addContainers = (e: any) => {
    e.preventDefault();
    const widgetNameFormVal = e.target.widgetName.value.trim();
    const channelNameFormVal = e.target.channelName.value.trim();
    if (widgetNameFormVal && !widgets.find((widgetObject) => widgetObject.widgetTitle === widgetNameFormVal)) {
      setWidgets((prevWidgets) => [
        ...prevWidgets,
        {
          widgetTitle: widgetNameFormVal,
          channelName: channelNameFormVal || DEFAULT_CHANNEL,
          languageCode: languageCode || DEFAULT_LANGUAGE,
          isActive: true,
        },
      ]);
      setWidgetName('');
    }
  };

  const removeContainer = useCallback(
    (widgetTitle: string) => {
      try {
        setWidgets((prevWidgets) =>
          prevWidgets.map((widgetObject) =>
            widgetObject.widgetTitle === widgetTitle ? { ...widgetObject, isActive: false } : widgetObject
          )
        );
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const editContainer = useCallback(
    (title: string, languageCode: string, channel: string) => {
      try {
        setWidgets((prevWidgets) =>
          prevWidgets.map((widgetObject) =>
            widgetObject.widgetTitle === title
              ? { ...widgetObject, channelName: channel, languageCode }
              : widgetObject
          )
        );
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return (
    <div className="fts-main-container vertical-container">
      <div className="fts-header-container">
        <form name="add-container-form" className="add-container-form" onSubmit={addContainers}>
          <input
            type="text"
            placeholder="Enter widget name"
            name="widgetName"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Channel name"
            name="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <select name="languageCode" value={languageCode} onChange={(e) => setLanguageCode(e.target.value)}>
            {SUPPORTED_LANGUAGE.map((languageObj) => (
              <option key={languageObj.languageCode} value={languageObj.languageCode}>
                {languageObj.language}
              </option>
            ))}
          </select>
          <button className="button-primary">Add Widget</button>
        </form>
      </div>
      <div className="fts-body-container">
        {widgets.map((widgetObject) => {
          return (
            widgetObject.isActive && (
              <Widget
                key={widgetObject.widgetTitle}
                updateMessageList={updateMessageList}
                messageList={messageList}
                languageCode={widgetObject.languageCode}
                widgetChannel={widgetObject.channelName}
                widgetTitle={widgetObject.widgetTitle}
                editContainer={editContainer}
                removeContainer={removeContainer}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
