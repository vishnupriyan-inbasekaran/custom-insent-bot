const MSG_TYPES = {
    TEXT: "text",
    FEEDBACK: "feedback",
    PLAIN_INPUT: "plainInput"
}

const FEEDBACK_VALUES = {
    1: 'Disappointing',
    2: 'Bad',
    3: 'Just Ok',
    4: 'Good',
    5: 'Excellent'
}
  
const FEEDBACK_EMOJIS = [
{
    imgFileName: 'disappointingEmoji.svg',
    altName: FEEDBACK_VALUES[1]
},
{
    imgFileName: 'badEmoji.svg',
    altName: FEEDBACK_VALUES[2]
},
{
    imgFileName: 'justokEmoji.svg',
    altName: FEEDBACK_VALUES[3]
}, {
    imgFileName: 'goodEmoji.svg',
    altName: FEEDBACK_VALUES[4]
},
{
    imgFileName: 'excellentEmoji.svg',
    altName: FEEDBACK_VALUES[5]
}
];

export const CONSTANTS = {
    USER_CREDENTIALS: {
        EMAIL: "vishnupriyan.inba@gmail.com",
        PASSWORD: "Testzoominfo@1"
    },
    DEFAULT_CONVO_ID: "clZoOcE1635055310486",
    FEEDBACK_EMOJIS,
    MSG_TYPES,
    FEEDBACK_VALUES
}