const envConfig = require('/secrets/pa_webhooks/envConfig');
const env = envConfig.environment;
const config = envConfig.PA_service.admin[env];

module.exports = {
  '59d9a2e8695293a55460c4d4': {
    allowed_intents: [
      // MATCHES
      'new_matches',
      'match_calendar',
      'player_statistics',
    ],
    intents: {
      //================================================================================//
      //================================ ALEXA START ===================================//
      //================================================================================//
      //===================================//
      //============== MATCH ==============//
      //===================================//
      new_matches: {
        url: `http://cricapi.com/api/matches`,
        method: 'POST',
        parameters: {
          type: 'params',
          value: {}
        },
        headers: {},
        intercept: {
          alexa: 'intercept_new_match',
        },
        callback: {
          alexa: 'get_new_match',
        
        }
      },

      match_calendar: {
        url: `http://cricapi.com/api/matchCalendar`,
        method: 'POST',
        parameters: {
          type: 'params',
          value: {}
        },
        headers: {},
        intercept: {
          alexa: 'intercept_match_calendar',
        },
        callback: {
          alexa: 'get_match_calendar',
        
        }
      },

      player_statistics: {
        url: `http://cricapi.com/api/playerStats`,
        method: 'POST',
        parameters: {
          type: 'params',
          value: {}
        },
        headers: {},
        intercept: {
          alexa: 'intercept_player_statistics',
        },
        callback: {
          alexa: 'get_match_statistics',
        
        }
      },
    },
    format: {
      dialogflow: {
        speech: '',
        messages: [],
        displayText: '',
        data: {}
      },
      alexa: {
        version: '1.0',
        response: {
          outputSpeech: {
            ssml: '',
            type: 'SSML'
          }
        },
        sessionAttributes: {}
      }
    }
  }
};
