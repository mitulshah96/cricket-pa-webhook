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
      search_widget: {
        urls: [
          {
            url: `${config.base_url}/${config.service_url}/o365/user/profile`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            direct: true,
            headers: {},
            intercept: {
              alexa: 'intercept_sample'
            }
          },
          {
            url: `${config.base_url}/searchms/search/search?query=`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            headers: {},
            intercept: {
              alexa: 'intercept_sample1'
            },
            callback: {
              alexa: 'get_searchresults'
            }
          }
        ]
      },
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
        url: `${config.base_url}/${
          config.service_url
        }/o365/mail/offset/0/limit/10`,
        method: 'POST',
        parameters: {
          type: 'body',
          value: {}
        },
        headers: {},
        intercept: {
          dialogflow: 'handleEmailParams',
          alexa: 'intercept_emails'
        },
        callback: {
          dialogflow: 'createEmailObject',
          alexa: 'get_emails'
        }
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

      //=======================================//
      //========Email Search===========//
      //=====================================//

      email_widget_search: {
        url: `${config.base_url}/${config.service_url}/o365/search/mail`,
        method: 'POST',
        parameters: {
          type: 'body',
          value: {}
        },
        headers: {},
        intercept: {
          alexa: 'intercept_search_emails'
        },
        callback: {
          alexa: 'get_search_emails'
        }
      },

      //======================================//
      //============== CALENDAR ==============//
      //======================================//
      calendar_widget: {
        url: 'http://localhost:3000/events/calendar',
        method: 'POST',
        parameters: {
          type: 'body',
          value: {}
        },
        headers: {},
        intercept: {
          dialogflow: 'handleCalendarParams',
          alexa: 'intercept_events'
        },
        callback: {
          dialogflow: 'createCalendarObject',
          alexa: 'get_events'
        }
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
        urls: [
          {
            url: `${config.base_url}/${config.service_url}/o365/user/profile`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            direct: true,
            headers: {},
            intercept: {
              alexa: 'intercept_sample'
              // dialogflow: "handleUserName"
            }
          },
          {
            url: `${
              config.base_url
            }/searchms/search/home/whatsimportanttoday?pageNumber=0&size=5&userId=`,
            method: 'GET',
            parameters: {
              type: 'params',
              value: {}
            },
            headers: {},
            intercept: {
              alexa: 'intercept_sample2',
              dialogflow: 'handleNewsParams'
            },
            callback: {
              dialogflow: 'createNewsObject',
              alexa: 'get_news'
            }
          }
        ]
      },

      //   url: `${
      //     envConfig.PA_service.admin[env].base_url
      //   }searchms/search/home/whatsimportanttoday?userId=`,
      //   method: "GET",
      //   parameters: {
      //     type: "params",
      //     value: {}
      //   },
      //   headers: {},
      //   intercept: {
      //     // alexa: "intercept_sample2",
      //     dialogflow: "handleNewsParams"
      //   },
      //   callback: {
      //     dialogflow: "createNewsObject",
      //     alexa: "get_news"
      //   }
      // },
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
      default_fallback_intent: {
        callback: {
          dialogflow: 'createDefaultObject'
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
