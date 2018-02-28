const envConfig = require('/secrets/pa_webhooks/envConfig');
const env = envConfig.environment;
const config = envConfig.PA_service.admin[env];

module.exports = {
  '59d9a2e8695293a55460c4d4': {
    allowed_intents: [
      // EMAIL
      'email_widget',
      'email_intent_yes',
      'email_intent_no',
      'email_read_cancel',

      // CALENDAR
      'calendar_widget',
      'calendar_read_yes',
      'calendar_read_no',
      'calendar_read_cancel',

      // NEWS
      'news_widget',
      'news_read_yes',
      'news_read_no',
      'news_read_cancel',

      // NAVIGATE HOME
      'navigate_home',

      // SEARCH / UNKNOWN-INPUT
      'default_fallback_intent',

      //============//
      //=== Accion Website ===//
      //===========//

      'about',
      'show_more',
      'solutions',
      'services',
      'blogs',
      'company',
      'contact',
      'why_accion_labs',
      'for_clients',
      'for_employees',
      'accion_story',
      'about_accion_talent',
      'accion_clients',
      'start_up',
      'enterprise_org',
      'matured_product',
      'growth_stage',
      'alliances_parterships',
      'accion_labs_locations',
      'corporate_socail_resp',
      'company_policies',

      //================//
      //==== AIC-Demo ===//
      //===============//
      'sessions',
      'session_detail',
      'speakers'
    ],
    intents: {
      //================================================================================//
      //================================ ALEXA START ===================================//
      //================================================================================//

      //================================================================================//
      //***************************** ALEXA END ****************************************//
      //================================================================================//

      //================================================================================//
      //============================== DIALOGFLOW START ================================//
      //================================================================================//

      //===================================//
      //============== EMAIL ==============//
      //===================================//
      email_widget: {
        urls: [
          {
            url: `https://www.googleapis.com/gmail/v1/users/me/profile`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            direct: true,
            headers: {},
            intercept: {
              alexa: 'intercept_email'
            },
            callback: {
              alexa: 'get_emailaddress_callback'
            }
          },
          {
            url: `https://prioriti.net/aicgateway/googleemail/default?maxResults=5&labels=INBOX`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            direct: true,
            headers: {},
            intercept: {
              alexa: 'intercept_get_email',
              dialogflow: 'handleEmailParams'
            },
            callback: {
              alexa: 'get_emails',
              dialogflow: 'createEmailObject'
            }
            
          }
        ]
      },
      email_intent_yes: {
        callback: {
          dialogflow: 'createEmailReadYesObject'
        }
      },
      email_intent_no: {
        callback: {
          dialogflow: 'createEmailReadNoObject'
        }
      },
      email_read_cancel: {
        callback: {
          dialogflow: 'createEmailReadCancelObject'
        }
      },

      //======================================//
      //============== CALENDAR ==============//
      //======================================//
      calendar_widget: {
        urls: [
          {
            url: `https://www.googleapis.com/gmail/v1/users/me/profile`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            direct: true,
            headers: {},
            intercept: {
              alexa: 'intercept_email'
            },
            callback: {
              alexa: 'get_emailaddress_callback'
            }
          },
          {
            url: `https://prioriti.net/aicgateway/googlecalendar/list?maxResults=10`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            direct: true,
            headers: {},
            intercept: {
              alexa: 'intercept_get_calendar',
              dialogflow: 'handleCalendarParams'
            },
            callback: {
              alexa: 'get_events',
              dialogflow: 'createCalendarObject'
            }
          }
        ]
      },
      calendar_read_yes: {
        callback: {
          dialogflow: 'createCalendarReadYesObject'
        }
      },
      calendar_read_no: {
        callback: {
          dialogflow: 'createCalendarReadNoObject'
        }
      },
      calendar_read_cancel: {
        callback: {
          dialogflow: 'createCalendarReadCancelObject'
        }
      },

      //===================================//
      //============== NEWS ==============//
      //===================================//

      news_widget: {
        url: `http://aicstage.accionlabs.com/api/accion`,
        method: 'POST',
        parameters: {
          type: 'params',
          value: {}
        },
        headers: {},
        intercept: {
          alexa: 'intercept_news',
          dialogflow: 'handleNewsParams'
        },
        callback: {
          alexa: 'get_news',
          dialogflow: 'createNewsObject'
        }
      },
      news_read_yes: {
        callback: {
          dialogflow: 'createNewsReadYesObject'
        }
      },
      news_read_no: {
        callback: {
          dialogflow: 'createNewsReadNoObject'
        }
      },
      news_read_cancel: {
        callback: {
          dialogflow: 'createNewsReadCancelObject'
        }
      },

      //===================================================//
      //============== SEARCH / UNKNOWN-INPUT ==============//
      //====================================================//

      search_widget: {
        url: 'http://aicstage.accionlabs.com/api/accion',
        method: "POST",
        parameters: {
          type: "params",
          value: {}
        },
        headers: {},
        
        intercept: {
          alexa: "intercept_search"
        },
        callback: {
          alexa: "get_search"
        }
      },


      default_fallback_intent: {
        url: 'http://aicstage.accionlabs.com/api/accion',
        method: 'POST',
        parameters: {
          type: 'params',
          value: {}
        },
        headers: {},

        intercept: {
          dialogflow: 'handleSearchParams'
        },
        callback: {
          dialogflow: 'createSearchObject'
        }
      },
      //===========================================//
      //============== NAVIGATE-HOME ==============//
      //==========================================//
      navigate_home: {
        callback: {
          dialogflow: 'createNavigateHomeObject'
        }
      },

      //================================================================================//
      //******************************* DIALOGFLOW END *********************************//
      //================================================================================//

      //================================================================================//
      //================================ AIC START ===================================//
      //================================================================================//

      about: {
        callback: {
          dialogflow: 'createAboutObject'
        }
      },
      show_more: {
        callback: {
          dialogflow: 'createShowMoreObject'
        }
      },
      solutions: {
        callback: {
          dialogflow: 'createSolutionsObject'
        }
      },
      services: {
        callback: {
          dialogflow: 'createServicesObject'
        }
      },
      blogs: {
        callback: {
          dialogflow: 'createBlogsObject'
        }
      },
      company: {
        callback: {
          dialogflow: 'createCompanyObject'
        }
      },
      contact: {
        callback: {
          dialogflow: 'createContactObject'
        }
      },
      why_accion_labs: {
        callback: {
          dialogflow: 'createWhyAccionObject'
        }
      },
      for_clients: {
        callback: {
          dialogflow: 'createForClientObject'
        }
      },
      for_employees: {
        callback: {
          dialogflow: 'createForEmpObject'
        }
      },
      accion_story: {
        callback: {
          dialogflow: 'createAccionStoryObject'
        }
      },
      about_accion_talent: {
        callback: {
          dialogflow: 'createAccionTalentObject'
        }
      },
      accion_clients: {
        callback: {
          dialogflow: 'createAccionClientObject'
        }
      },
      start_up: {
        callback: {
          dialogflow: 'createStartUpObject'
        }
      },
      enterprise_org: {
        callback: {
          dialogflow: 'createEnterpriseObject'
        }
      },
      matured_product: {
        callback: {
          dialogflow: 'createMaturedObject'
        }
      },
      growth_stage: {
        callback: {
          dialogflow: 'createGrowthObject'
        }
      },
      alliances_parterships: {
        callback: {
          dialogflow: 'createAlliancesObject'
        }
      },
      accion_labs_locations: {
        callback: {
          dialogflow: 'createLocationsObject'
        }
      },
      corporate_socail_resp: {
        callback: {
          dialogflow: 'createCorporateObject'
        }
      },
      company_policies: {
        callback: {
          dialogflow: 'createCompanyPoliciesObject'
        }
      }
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
