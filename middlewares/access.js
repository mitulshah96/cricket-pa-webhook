const accessconfig = require('../config/access');
const TokenModel = require('../models/token');
const Gateway = require('../controllers/gateway');
const configobject = require('./config')

async function handleAccess(req, res, next) {
  if (req.headers['x-requested-from'] !== 'apiai') {
    if(req.body.request.type==="LaunchRequest"){
      var response = configobject.config;
      response.response.outputSpeech.ssml = "<speak>Welcome to Cricket Info App. Here you can get news on upcoming matches,player statistics and  match calendar</speak>"
      response.response.speechletResponse.outputSpeech.ssml = "<speak> Welcome to Cricket Info App. Here you can get news on upcoming matches,player statistics and  match calendar.</speak>"
       return res.send(response);
    }
      req.intentName = req.body.request.intent.name ;
    
    
    Object.keys(accessconfig).map(key => {
      req.config = accessconfig[key].intents[req.intentName];
      req.config.initiator = 'alexa';
      req.config.format = accessconfig[key].format[req.config.initiator];
    });

    return next();
  }

  const sessionID = req.body.sessionId;
  req.intentName = req.body.result.metadata.intentName;

  try {
    const result = await TokenModel.findOne({
      UUID: sessionID
    });

    if (!!result) {
      const access = result.access;
      req.hasAccess = false;

      access.map(grant => {
        if (accessconfig[grant].allowed_intents.indexOf(req.intentName) > -1) {
          req.hasAccess = true;
          req.config = accessconfig[grant].intents[req.intentName];
          req.config.initiator = 'dialogflow';
          req.config.format = accessconfig[grant].format[req.config.initiator];
        }
      });

      if (req.hasAccess) {
        return next();
      } else {
        return res.json({
          speech: 'I am not trained for that',
          data: {
            expectUserResponse: false
          },
          messages: [],
          displayText: ''
        });
      }
    } else {
      throw new TypeError('No registered session for this intent');
    }
  } catch (e) {
    return res.json({
      speech: e.message ? e.message : 'I am not trained for that',
      data: {
        expectUserResponse: false
      },
      messages: [],
      displayText: ''
    });
  }
}

module.exports = handleAccess;
