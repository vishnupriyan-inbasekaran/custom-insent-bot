(this["webpackJsonpinsent-custom-bot"]=this["webpackJsonpinsent-custom-bot"]||[]).push([[0],{29:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),c=n(20),r=n.n(c),i=(n(29),n(3)),o=n(11),u=n.n(o),l=n(5),g=n(21),d={1:"Disappointing",2:"Bad",3:"Just Ok",4:"Good",5:"Excellent"},p={USER_CREDENTIALS:{EMAIL:"vishnupriyan.inba@gmail.com",PASSWORD:"Testzoominfo@1"},DEFAULT_CONVO_ID:"clZoOcE1635055310486",FEEDBACK_EMOJIS:[{imgFileName:"disappointingEmoji.svg",altName:d[1]},{imgFileName:"badEmoji.svg",altName:d[2]},{imgFileName:"justokEmoji.svg",altName:d[3]},{imgFileName:"goodEmoji.svg",altName:d[4]},{imgFileName:"excellentEmoji.svg",altName:d[5]}],MSG_TYPES:{TEXT:"text",FEEDBACK:"feedback",PLAIN_INPUT:"plainInput"},FEEDBACK_VALUES:d},m=n(22),b=n(23),h=n(4),j=n.n(h),f="https://insentrecruit.api.insent.ai",O=function(){function e(){Object(m.a)(this,e),this.LOGIN_URL=f+"/app/login",this.GET_APP_DETAILS_URL=f+"/app/details",this.GET_CONVO_URL=f+"/getuser",this.GET_INIT_MESSAGE_URL=f+"/user/channels/{channel_id}",j.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),j.a.interceptors.response.use((function(e){return e}),(function(e){throw e}))}return Object(b.a)(e,[{key:"getHeaders",value:function(e,t){var n=e&&"Bearer ".concat(e)||this.getAuthToken(),s={headers:{"Content-Type":"application/json;charset=UTF-8"}};return n&&(s.headers.Authorization=n),t&&(s.headers.userid=t),s}},{key:"loginUser",value:function(e){return j.a.post(this.LOGIN_URL,e,this.getHeaders())}},{key:"getAppDetails",value:function(){var e="".concat(this.GET_APP_DETAILS_URL);return j.a.get(e,this.getHeaders())}},{key:"getConversationInfo",value:function(e,t){var n="".concat(this.GET_CONVO_URL,"?url=insentrecruit.insent.ai/conversations/").concat(e,"/simulator");return j.a.get(n,this.getHeaders(t))}},{key:"getInitMessageInfo",value:function(e,t,n){var s=this.GET_INIT_MESSAGE_URL.replace("{channel_id}",e);return j.a.get(s,this.getHeaders(t,n))}},{key:"getAuthToken",value:function(){return"Bearer ".concat(localStorage.getItem("insent-token"))}},{key:"getRecommendedTutors",value:function(){return j.a.get(this.GET_RECOMMENDED_TUTORS_URL,this.getHeaders())}},{key:"updateTopicStatus",value:function(e,t){return j.a.put(this.UPDATE_TOPIC_STATUS.replace("{topicId}",t),e,this.getHeaders())}}]),e}(),E=n(0);var T=function(e){return Object(E.jsxs)("div",{className:"bot-widget-wrapper",onClick:function(){return e.toggleWidgetOpenState(!e.isWidgetOpen)},children:[!e.isWidgetOpen&&Object(E.jsx)("div",{className:"convo-part",dangerouslySetInnerHTML:{__html:e.initConvoInfo.popupMessage.message}}),Object(E.jsx)("span",{className:"bot-icon",children:e.isWidgetOpen?Object(E.jsx)("img",{src:"/assets/images/close-icon.png",width:"40"}):Object(E.jsx)("img",{src:"/assets/images/bot-icon-2.jpeg",width:"72"})})]})},v=n(24);var S=function(e){var t=e.chatMessages&&e.chatMessages.length&&e.chatMessages[e.chatMessages.length-1]||null;return console.log(e),Object(E.jsxs)(a.a.Fragment,{children:[Object(E.jsx)("div",{className:"chat-area",ref:e.chatAreaRef,children:e.chatMessages&&e.chatMessages.map((function(t,n){return Object(E.jsxs)("div",{className:"chat-msg ".concat(t.buttons?"block":""," ").concat(t.sentByMe?"sent-by-me":""),children:[t.sender&&t.sender.img&&!t.buttons&&t.type!=p.MSG_TYPES.PLAIN_INPUT&&Object(E.jsx)("span",{className:"msg-sender",children:Object(E.jsx)("img",{src:t.sender.img})}),t.type&&t.type==p.MSG_TYPES.TEXT&&Object(E.jsx)("div",{className:"chat-txt ".concat(t.isFeedbackResponse?"fb-response":""),dangerouslySetInnerHTML:{__html:t.text}}),t.buttons&&t.buttons.fields.length&&t.buttons.fields.map((function(t,n){return Object(E.jsx)("div",{className:"btn-name",onClick:function(){return e.sendServerMsg(t)},dangerouslySetInnerHTML:{__html:t}},"chat-btn-key-".concat(n))})),t.type&&t.type==p.MSG_TYPES.FEEDBACK&&Object(E.jsx)(a.a.Fragment,{children:Object(E.jsxs)("div",{className:"feedback-msg chat-txt",children:[Object(E.jsx)("div",{className:"",dangerouslySetInnerHTML:{__html:t.feedback.message}}),Object(E.jsx)("div",{className:"feedback-wrapper",children:p.FEEDBACK_EMOJIS.map((function(t,n){return Object(E.jsx)("span",{className:"emoji-wrapper",onClick:function(){return e.sendServerMsg(n+1)},children:Object(E.jsx)("img",{id:"insent-rating-card-rating-icon",src:"/assets/images/".concat(t.imgFileName),alt:t.altName})},"emoji"+n)}))})]})})]},"msg-key-".concat(n))}))}),t&&t.type==p.MSG_TYPES.PLAIN_INPUT&&Object(E.jsx)("div",{className:"chat-input-wrapper",children:Object(E.jsx)("textarea",{ref:e.textInputRef,name:"message",placeholder:"Type your reply",rows:"1",id:"textInputArea",onKeyDown:function(t){return e.submitTextarea(t)}})})]})};var _=function(e){return Object(E.jsxs)("div",{className:"widget-area ".concat(e.isWidgetOpen?"show":"hide"),children:[Object(E.jsxs)("div",{className:"bot-header",children:[Object(E.jsx)("span",{className:"bot-icon",children:Object(E.jsx)("img",{src:"/assets/images/bot-icon.jpeg"})}),Object(E.jsx)("span",{className:"bot-name",children:"Insent Bot"})]}),Object(E.jsx)(S,Object(v.a)({},e))]})};n(50);var x=function(){var e=Object(s.useState)(!1),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(s.useState)(null),o=Object(i.a)(r,2),d=o[0],m=o[1],b=Object(s.useState)(null),h=Object(i.a)(b,2),j=h[0],f=h[1],v=Object(s.useState)(null),S=Object(i.a)(v,2),x=S[0],I=S[1],N=Object(s.useState)([]),y=Object(i.a)(N,2),M=y[0],A=y[1],k=Object(s.useState)(null),C=Object(i.a)(k,2),P=C[0],L=C[1],D=Object(s.useRef)(""),F=Object(s.useRef)(null),R=new O;function U(){return(U=Object(g.a)(u.a.mark((function e(){var t,n,s,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R.getAppDetails();case 3:if((t=e.sent)&&t.data&&t.data.project&&t.data.project.projectKey){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,I(t.data.project.projectKey);case 8:return e.next=10,R.getConversationInfo(p.DEFAULT_CONVO_ID,t.data.project.projectKey);case 10:if((n=e.sent)&&n.data){e.next=13;break}return e.abrupt("return");case 13:return s=n.data,e.next=16,m(s);case 16:return e.next=18,R.getInitMessageInfo(s.channelId,t.data.project.projectKey,s.user.id);case 18:if((a=e.sent)&&a.data){e.next=21;break}return e.abrupt("return");case 21:return e.next=23,f(a.data);case 23:e.next=28;break;case 25:e.prev=25,e.t0=e.catch(0),console.error(e.t0);case 28:case"end":return e.stop()}}),e,null,[[0,25]])})))).apply(this,arguments)}function w(e){var t,n=d.channelId,s=d.user.id,a=d.subscriptionChannel,c=M[M.length-1],r={channelName:n,message:{lastMessageTimeStamp:c&&c.messageTimestamp},senderId:s};e&&c&&c.buttons?(r.message[c.buttons.key]=[e],G({type:p.MSG_TYPES.TEXT,text:e,sentByMe:!0})):e&&c&&c.type==p.MSG_TYPES.PLAIN_INPUT?(r.message[c.plainInput.key]=e,t={type:p.MSG_TYPES.TEXT,text:e,sentByMe:!0},A((function(e){return[].concat(Object(l.a)(e),[t])}))):e&&c&&c.type==p.MSG_TYPES.FEEDBACK&&(r.message[c.feedback.key]={submitted:!0,value:e},G({type:p.MSG_TYPES.TEXT,text:'\n          <img src="/assets/images/'.concat(p.FEEDBACK_EMOJIS[e-1].imgFileName,'"/> \n          ').concat(p.FEEDBACK_VALUES[e],"\n        "),isFeedbackResponse:!0,sentByMe:!0})),P&&P.channel(a).trigger("client-widget-message",r)}function G(e){A((function(t){var n=Object(l.a)(t);return n.pop(),[].concat(Object(l.a)(n),[e])}))}function B(e,t,n){for(var s=0;s<e.length;s++)e[s].messageTimestamp=t,e[s].sender=n;A((function(t){return[].concat(Object(l.a)(t),Object(l.a)(e))})),setTimeout((function(){F&&F.current&&(F.current.scrollTop=F.current.scrollHeight)}),10)}function K(){var e;w(null===(e=D.current)||void 0===e?void 0:e.value)}return Object(s.useEffect)((function(){if(d||x){if(d&&x&&j){var e=function(){var e=d.user.id;return new window.Pusher("67bb469433cb732caa7a",{cluster:"mt1",authEndpoint:"https://insentrecruit.api.insent.ai/pusher/presence/auth/visitor?userid="+e,auth:{headers:{Authorization:"Bearer "+x}}})}();return L(e),void function(e){var t=d.subscriptionChannel,n=d.channelId,s=d.user.id,a=e.subscribe(t);a.bind("server-message",(function(e){console.log("[server-message] :: ",e),B(e.messages,e.messageTimestamp,e.sender)})),a.bind("client-widget-message",(function(e){console.log("[client-widget-message] :: ",e)})),a.bind("pusher:subscription_succeeded",(function(a){console.log("[pusher:subscription_succeeded] :: ",a),B(j.messages,a.messageTimestamp,j.sender);var c={channelName:n,message:{lastMessageTimeStamp:j.messageTimestamp},senderId:s};e.channel(t).trigger("client-widget-message",c)})),a.bind("pusher:subscription_error",(function(e){console.log("[pusher:subscription_error] :: ",e)}))}(e)}}else!function(){U.apply(this,arguments)}()}),[d,x,j]),Object(s.useEffect)((function(){if(M.length>1){var e=M[M.length-1];e.buttons||e.type==p.MSG_TYPES.PLAIN_INPUT||e.type==p.MSG_TYPES.FEEDBACK||w()}}),[M]),Object(E.jsx)(a.a.Fragment,{children:d&&Object(E.jsxs)(a.a.Fragment,{children:[Object(E.jsx)(T,{initConvoInfo:d,isWidgetOpen:n,toggleWidgetOpenState:c}),Object(E.jsx)(_,{isWidgetOpen:n,chatAreaRef:F,chatMessages:M,textInputRef:D,submitTextarea:function(e){"Enter"===e.key&&(e.preventDefault(),K())},handleChatAreaChange:K,sendServerMsg:w})]})})};n(51);var I=function(){var e=Object(s.useState)(localStorage.getItem("insent-token")),t=Object(i.a)(e,2),n=t[0],a=t[1];return Object(s.useEffect)((function(){n||(new O).loginUser({email:p.USER_CREDENTIALS.EMAIL,password:p.USER_CREDENTIALS.PASSWORD}).then((function(e){e.data.token&&(a(e.data.token),localStorage.setItem("insent-token",e.data.token))}))})),Object(E.jsxs)("div",{className:"app",children:[Object(E.jsx)("header",{className:"app-header",children:Object(E.jsx)("h1",{className:"text-center",children:"Custom Insent.ai Bot"})}),n&&Object(E.jsx)(x,{})]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),c(e),r(e)}))};r.a.render(Object(E.jsx)(a.a.StrictMode,{children:Object(E.jsx)(I,{})}),document.getElementById("root")),N()}},[[52,1,2]]]);
//# sourceMappingURL=main.bebec82d.chunk.js.map