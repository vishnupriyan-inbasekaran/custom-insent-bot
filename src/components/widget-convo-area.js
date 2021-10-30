import React from 'react';
import Chatbox from './chat-box';

// Render the conversation area when widget is opened.
function WidgetConvoArea(props) {
  return (
    <div className={`widget-area ${props.isWidgetOpen ? 'show' : 'hide'}`}>
      <div className="bot-header">
        <span className="bot-icon">
          <img src="/assets/images/bot-icon.jpeg" />
        </span>
        <span className="bot-name">Insent Bot</span>
      </div>

      <Chatbox
       {...props}
      />
   </div>
  )
}
export default WidgetConvoArea;
