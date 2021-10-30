import React from 'react';

// Render the icon area with greeting msg.
function WidgetIconArea(props) {
  return (
    <div className="bot-widget-wrapper" onClick={() => props.toggleWidgetOpenState(!props.isWidgetOpen)}>
      {!props.isWidgetOpen &&
        <div 
          className="convo-part" 
          dangerouslySetInnerHTML={{__html: props.initConvoInfo.popupMessage.message}}
        >
        </div>
      }

      <span className="bot-icon">
        {props.isWidgetOpen ? 
          <img src="/assets/images/close-icon.png" width="40"/>
          :
          <img src="/assets/images/bot-icon-2.jpeg" width="72" />
        }
      </span>
    </div>
    ) 
}
export default WidgetIconArea;
