import React, { useEffect, useState, useRef } from 'react';
import { CONSTANTS } from '../constants';
import { AxiosService } from '../services/AxiosService';
import WidgetIconArea from './widget-icon-area';
import WidgetConvoArea from './widget-convo-area';
import './bot-widget.scss';

// Initial component to render the widget
function BotWidget() {
  const [isWidgetOpen, toggleWidgetOpenState] = useState(false);
  const [initConvoInfo, setInitialConvoInfo] = useState(null);
  const [initMsgInfo, setInitMsgInfo] = useState(null);
  const [projectKey, setProjectKey] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [pusherObj, setPusherObj] = useState(null);
  const textInputRef = useRef('');
  const chatAreaRef = useRef(null);
  const axiosServ = new AxiosService();

  // Get initial convo details and app details to start with.
  async function getInitConversationInfo() {
    try {
      const appDetails = await axiosServ.getAppDetails();
      if (!appDetails || !appDetails.data || !appDetails.data.project || !appDetails.data.project.projectKey) {
        return;
      }
      await setProjectKey(appDetails.data.project.projectKey);

      const conversationInfoResponse = await axiosServ.getConversationInfo(CONSTANTS.DEFAULT_CONVO_ID, appDetails.data.project.projectKey);
      if (!conversationInfoResponse || !conversationInfoResponse.data) {
        return;
      } 
      const convoInfo = conversationInfoResponse.data;
      await setInitialConvoInfo(convoInfo);

      const msgInfoResponse = await axiosServ.getInitMessageInfo(convoInfo.channelId, appDetails.data.project.projectKey, convoInfo.user.id);
      if (!msgInfoResponse || !msgInfoResponse.data) {
        return;
      } 
      await setInitMsgInfo(msgInfoResponse.data);
    } catch(err) {
      console.error(err)
    }
  }

  // Initialize Pusher with the pusher token & cluster
  function initPusher() {
    const AUTH_ENDPOINT_BASE_URL = 'https://insentrecruit.api.insent.ai/'
    const PUSHER_TOKEN = '67bb469433cb732caa7a'
    const PUSHER_CLUSTER = 'mt1'
    const userId = initConvoInfo.user.id

    var pusher = new window.Pusher(PUSHER_TOKEN, {
      cluster: PUSHER_CLUSTER,
      authEndpoint: AUTH_ENDPOINT_BASE_URL + 'pusher/presence/auth/visitor?userid=' + userId,
      auth: {
        headers: {
          Authorization: 'Bearer ' + projectKey,
        },
      },
    });

    return pusher;
  }

  // Bind pusher client/server msg events & its callbacks
  function bindPusherEvents(pusher) {
    const channelId = initConvoInfo.subscriptionChannel
    const channelName = initConvoInfo.channelId
    const userId = initConvoInfo.user.id

    const channel = pusher.subscribe(channelId);
    channel.bind("server-message", (data) => {
      console.log("[server-message] :: ", data)
      addMessages(data.messages, data.messageTimestamp, data.sender)  // Add to chat
    });

    channel.bind('client-widget-message', (data) => {
      console.log("[client-widget-message] :: ", data)
    });

    channel.bind('pusher:subscription_succeeded', function(data) {
      console.log("[pusher:subscription_succeeded] :: ", data);

      addMessages(initMsgInfo.messages, data.messageTimestamp, initMsgInfo.sender); // Add initial message to chat

      const clientData = {
        channelName: channelName,
        message: {lastMessageTimeStamp: initMsgInfo.messageTimestamp},
        senderId: userId
      }

      pusher.channel(channelId).trigger('client-widget-message', clientData); // Send data to server
    });

    channel.bind('pusher:subscription_error', function(status) {
      console.log("[pusher:subscription_error] :: ", status)
    });
  }

  // Send data to server (button click/text response/feedback response)
  function sendServerMsg(fieldValue) {
    const channelName = initConvoInfo.channelId
    const userId = initConvoInfo.user.id
    const channelId = initConvoInfo.subscriptionChannel
    const lastMsg = chatMessages[chatMessages.length - 1];

    let clientData = {
      channelName: channelName,
      message: {
        lastMessageTimeStamp: lastMsg && lastMsg.messageTimestamp
      },
      senderId: userId
    }

    if (fieldValue && lastMsg && lastMsg.buttons) { // Button reply
      clientData.message[lastMsg['buttons']['key']] = [fieldValue];
      replaceLastMsg({
        type: CONSTANTS.MSG_TYPES.TEXT,
        text: fieldValue,
        sentByMe: true
      })
    } else if (fieldValue && lastMsg && lastMsg.type == CONSTANTS.MSG_TYPES.PLAIN_INPUT) {   // Plain text input reply
      clientData.message[lastMsg.plainInput.key] = fieldValue
      addLastMsg({
        type: CONSTANTS.MSG_TYPES.TEXT,
        text: fieldValue,
        sentByMe: true
      })
    } else if (fieldValue && lastMsg && lastMsg.type == CONSTANTS.MSG_TYPES.FEEDBACK) { // Feedback reply
      clientData.message[lastMsg.feedback.key] = {
        submitted: true,
        value: fieldValue
      }
      replaceLastMsg({
        type: CONSTANTS.MSG_TYPES.TEXT,
        text: `
          <img src="/assets/images/${CONSTANTS.FEEDBACK_EMOJIS[fieldValue - 1].imgFileName}"/> 
          ${CONSTANTS.FEEDBACK_VALUES[fieldValue]}
        `,
        isFeedbackResponse: true,
        sentByMe: true
      })
    }

    if (pusherObj) {
      pusherObj.channel(channelId).trigger('client-widget-message', clientData);
    }
  }

  // Replace the last message with new msg
  function replaceLastMsg(msg) {
    setChatMessages((oldChatMessages) => {
      const msgs = [...oldChatMessages];
      msgs.pop();
      return [...msgs, msg]
    });
  }

  // Add a new msg
  function addLastMsg(msg) {
    setChatMessages((oldChatMessages) => {
      return [...oldChatMessages, msg]
    });
  }
  
  // Add message & auto scroll the widget chat area
  function addMessages(msgs, messageTimestamp, sender) {
    for (let i = 0; i < msgs.length; i++) {
      msgs[i]['messageTimestamp'] = messageTimestamp
      msgs[i]['sender'] = sender
    }

    setChatMessages((oldChatMessages) => {
      return [...oldChatMessages, ...msgs]
    });

    setTimeout(() => {
      if (chatAreaRef && chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }, 10);
  }

  // Watch for initial data side-effects and initialize the pusher.
  useEffect(() => {
    if (!initConvoInfo && !projectKey) {
      getInitConversationInfo();
      return;
    }

    if (initConvoInfo && projectKey && initMsgInfo) {
      const pusher = initPusher();
      setPusherObj(pusher);
      bindPusherEvents(pusher);
      return;
    }
  }, [initConvoInfo, projectKey, initMsgInfo])

  // Watch for chatMessages changes & invoke server msg call
  useEffect(() => {
    if(chatMessages.length > 1) {
      const lastMsg = chatMessages[chatMessages.length - 1]
      if (!lastMsg.buttons && lastMsg.type != CONSTANTS.MSG_TYPES.PLAIN_INPUT && lastMsg.type != CONSTANTS.MSG_TYPES.FEEDBACK) {
        sendServerMsg()
      }
    }    
  }, [chatMessages])

  // Input text area change handler
  function handleChatAreaChange() {
    sendServerMsg(textInputRef.current?.value)
  }

  // Enter key check for text input
  function submitTextarea(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChatAreaChange();
    }
  }

  return (
    <React.Fragment>
      {initConvoInfo && 
        <React.Fragment>
          <WidgetIconArea
          initConvoInfo={initConvoInfo}
          isWidgetOpen={isWidgetOpen}
          toggleWidgetOpenState={toggleWidgetOpenState}
          />

          <WidgetConvoArea
          isWidgetOpen={isWidgetOpen}
          chatAreaRef={chatAreaRef}
          chatMessages={chatMessages}
          textInputRef={textInputRef}
          submitTextarea={submitTextarea}
          handleChatAreaChange={handleChatAreaChange}
          sendServerMsg={sendServerMsg}
          />
          
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default BotWidget;
