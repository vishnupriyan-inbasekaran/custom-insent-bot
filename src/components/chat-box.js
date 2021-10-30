import React from 'react';
import { CONSTANTS } from '../constants';

// Render the chat box with messages & user responses. 
function ChatBox(props) {
  const lastChatMsg = (props.chatMessages && props.chatMessages.length && props.chatMessages[props.chatMessages.length - 1]) || null;
  console.log(props)
  return (
    <React.Fragment>
      <div className="chat-area" ref={props.chatAreaRef}>
      {
        props.chatMessages && props.chatMessages.map((msg, i) => {
          return (
            <div 
            className={`chat-msg ${msg.buttons ? "block" : ""} ${msg.sentByMe ? 'sent-by-me': ''}`}
            key={`msg-key-${i}`} 
            >
              {/* Sender Image render */}
              {msg.sender && msg.sender.img && !msg.buttons && msg.type != CONSTANTS.MSG_TYPES.PLAIN_INPUT &&
                <span className="msg-sender">
                  <img src={msg.sender.img} />
                </span>
              }
              
              {/* Text message render */}
              {msg.type && msg.type == CONSTANTS.MSG_TYPES.TEXT &&
                <div 
                className={`chat-txt ${msg.isFeedbackResponse ? 'fb-response' : ''}`}
                dangerouslySetInnerHTML={{__html: msg.text}}
                >
                </div>
              }

              {/* Buttons message render */}
              {msg.buttons && msg.buttons.fields.length &&
                msg.buttons.fields.map((btnName, bkey) => {
                  return (
                    <div 
                    key={`chat-btn-key-${bkey}`} 
                    className="btn-name"
                    onClick={() => props.sendServerMsg(btnName)}
                    dangerouslySetInnerHTML={{__html: btnName}}
                    >
                    </div>
                  )
                })
              }

              {/* Feedback question render */}
              {msg.type && msg.type == CONSTANTS.MSG_TYPES.FEEDBACK &&
                (
                  <React.Fragment>
                    <div className="feedback-msg chat-txt">
                      <div 
                      className=""
                      dangerouslySetInnerHTML={{__html: msg.feedback.message}}
                      >
                      </div>
                      <div className="feedback-wrapper">
                        {CONSTANTS.FEEDBACK_EMOJIS.map((fd, feedBackVal) => {
                          return (
                            <span 
                            key={"emoji" + feedBackVal}
                            className="emoji-wrapper" 
                            onClick={() => props.sendServerMsg(feedBackVal + 1)}
                            >
                              <img id="insent-rating-card-rating-icon" src={`/assets/images/${fd.imgFileName}`} alt={fd.altName}/>
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </React.Fragment>
                )
              }
            </div>
          )
        })
      }
    </div>

    {/* Chat input text area render */}
    {lastChatMsg && lastChatMsg.type == CONSTANTS.MSG_TYPES.PLAIN_INPUT &&
      <div className="chat-input-wrapper">
        <textarea 
        ref={props.textInputRef}
        name="message" 
        placeholder="Type your reply" 
        rows="1" 
        id="textInputArea"
        onKeyDown={(e) => props.submitTextarea(e)}
        ></textarea>
      </div>
    }
  </React.Fragment>
  )
}
export default ChatBox;
