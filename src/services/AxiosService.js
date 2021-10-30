import axios from "axios";

const API_DOMAIN = "https://insentrecruit.api.insent.ai";

class AxiosService {
  constructor() {
    this.LOGIN_URL = API_DOMAIN + "/app/login";
    this.GET_APP_DETAILS_URL = API_DOMAIN + "/app/details";
    this.GET_CONVO_URL = API_DOMAIN + "/getuser";
    this.GET_INIT_MESSAGE_URL = API_DOMAIN + "/user/channels/{channel_id}";

    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (res) => res,
      (x) => {
        throw x;
      }
    );
  }

  getHeaders(token, userId) {
    let authToken = (token && `Bearer ${token}`) || this.getAuthToken();
    let reqHeaders = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
    };

    if (authToken) {
      reqHeaders.headers["Authorization"] = authToken;
    }

    if (userId) {
      reqHeaders.headers["userid"] = userId;
    }

    return reqHeaders;
  }

  loginUser(data) {
    return axios.post(
      this.LOGIN_URL,
      data,
      this.getHeaders()
    );
  }

  getAppDetails() {
    const url = `${this.GET_APP_DETAILS_URL}`
    return axios.get(
      url,
      this.getHeaders()
    );
  }

  getConversationInfo(convoId, token) {
    const url = `${this.GET_CONVO_URL}?url=insentrecruit.insent.ai/conversations/${convoId}/simulator`
    return axios.get(
      url,
      this.getHeaders(token)
    );
  }

  getInitMessageInfo(channelId, token, userId) {
    const url = this.GET_INIT_MESSAGE_URL.replace("{channel_id}", channelId)
    return axios.get(
      url,
      this.getHeaders(token, userId)
    );
  }

  getAuthToken() {
    return `Bearer ${localStorage.getItem('insent-token')}`;
  }

  getRecommendedTutors() {
    return axios.get(this.GET_RECOMMENDED_TUTORS_URL, this.getHeaders());
  }

  updateTopicStatus(data, topicId) {
    return axios.put(
      this.UPDATE_TOPIC_STATUS.replace("{topicId}", topicId),
      data,
      this.getHeaders()
    );
  }
}

export { AxiosService };
