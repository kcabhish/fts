import React, {useState} from 'react'
import './widget.scss';
import { ReactComponent as SendSvg } from '../svg/send.svg';
import { ReactComponent as PlusSvg } from '../svg/plus.svg';

interface IWidget {
    widgetTitle: string;
    widgetChannel: string;
    languageCode?: string;
}
export default function Widget(props: IWidget) {
  console.log('checking props');
  console.log(props);
  const [chatInputMsg, setChatInputMsg] = useState('');
  // @todo: this needs to be redefined for translation in phase 2
  const [messageList, setMessageList] = useState<string[]>([]);

  /**
   * Grabs contents from the message after the message is sent
   * @param e 
   */
  const sendMsg = (e: any) => {
    e.preventDefault();
    const message = e.target.chatMsg.value
    if (message) {
        // add translation service here
        setChatInputMsg('');
        if (messageList.length > 0) {
            setMessageList([...messageList, message]);
        } else {
            setMessageList([message]);
        }
    }
  }

  return (
    <div className='widget-container'>
        <div className='widget-header'>
            <div className='widget-title'>
                <h3>{props.widgetTitle}</h3>
                <h5>{props.widgetChannel}</h5>
            </div>
            <div className='widget-icons'>
                <span className='close-icon'><PlusSvg /></span>
            </div>
            
        </div>
        <div className='widget-body'>
            {messageList.map(msg => {
                // @TODO: need to update the key after using object for messages
                return <p key={msg}>{msg}</p>
            })}
        </div>

        <div className='widget-footer'>
            <form name='send-msg-form' className='send-msg-form' onSubmit={sendMsg}>
                <textarea name='chatMsg' value={chatInputMsg} onChange={(e) => setChatInputMsg(e.target.value)}></textarea>
                <button><SendSvg /></button>
            </form>
        </div>
    </div>
  )
}
