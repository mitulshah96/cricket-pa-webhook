const axios = require('axios');
const Alexa = require('../controllers/alexa');
const DialogFlow = require('../controllers/dialogflow');

class Gateway {
  constructor() {}

  async handle_intent(body, config, response) {
    let query = {
      url: config.url,
      method: config.method,
      headers: config.headers
    };

    if (!!config.parameters && config.parameters.type === 'params') {
      query.params = config.parameters.value;
    }

    if (!!config.parameters && config.parameters.type === 'body') {
      query.data = config.parameters.value;
    }

    try {
      if (!!config.intercept) {
        let result = null;

        if (config.initiator === 'alexa') {
          if (response) {
            result = response.response.outputSpeech.ssml;
          }
          const alexa = new Alexa();

          if (config.intercept && config.intercept[config.initiator]) {
            query = await alexa[config.intercept[config.initiator]](
              body,
              query,
              result
            );
          }
        } else if (config.initiator === 'dialogflow') {
          if (response) {
            result = response;
          }
          const dialogflow = new DialogFlow();

          if (config.intercept && config.intercept[config.initiator]) {
            query = await dialogflow[config.intercept[config.initiator]](
              body,
              query,
              result
            );
            // console.log('interceptor');
            // console.log('query' + JSON.stringify(query));
          }
        } else {
          throw new TypeError(`Unknown request initiator: ${config.initiator}`);
        }
      }

      if (
        config.url !== undefined ||
        config.url === '' ||
        (config.method !== undefined || config.method === '')
      ) {
        // console.log(query);
        const response = await axios(query);
        config = this.handle_response(config, response.data);
        return config.format;
      } else {
        return config.format;
      }
    } catch (error) {
      throw error;
    }
  }

  async handle_callbacks(config, body) {
    try {
      if (config.initiator === 'dialogflow') {
        const dialogFlow = new DialogFlow();
        return await dialogFlow[config.callback[config.initiator]](
          body,
          config.format
        );
      } else if (config.initiator === 'alexa') {
        const alexa = new Alexa();
        return await alexa[config.callback[config.initiator]](
          body,
          config.format
        );
      } else {
        throw new TypeError(`Unknown request initiator: ${config.initiator}`);
      }
    } catch (error) {
      throw error;
    }
  }

  handle_response(config, message) {
    if (config.initiator === 'dialogflow') {
      config.format.speech = '';
      config.format.messages = [];
      config.format.displayText = '';
      config.format.data = message;
      return config;
    } else if (config.initiator === 'alexa') {
      config.format.response.outputSpeech.ssml = message;
      return config;
    } else {
      return config;
    }
  }

  handle_error(config, message) {
    // console.log("error");
    if (config.initiator === 'dialogflow') {
      // console.log(message);
      config.format.speech = message;
      config.format.displayText = '';
      config.format.data.expectUserResponse = false;
      config.format.messages = [];
      return config;
    } else if (config.initiator === 'alexa') {
      config.format.response.outputSpeech.ssml = message;
      return config;
    } else {
      return config;
    }
  }
}

module.exports = Gateway;
