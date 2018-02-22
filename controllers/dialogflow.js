// const moment = require("moment");
const EmailHelper = require('./helpers/email-helper');
const NewsHelper = require('./helpers/news-helper');
const CalendarHelper = require('./helpers/calendar-helper');
const SearchHelper = require('./helpers/search-helper');
<<<<<<< HEAD
const AicHelper = require('./helpers/aic-helper');
=======
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167

const request = require('request');
// var email;
// var news;
// var calendar;
// var search;

class DialogFlow {
  constructor() {
    this.email = new EmailHelper();
    this.news = new NewsHelper();
    this.calendar = new CalendarHelper();
    this.search = new SearchHelper();
<<<<<<< HEAD
    this.aic = new AicHelper();
=======
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
  }

  //===================================//
  //============ EMAIL ================//
  //===================================//

  async createEmailObject(body, format) {
    format = this.email.getEmailObject(body, format);
    return format;
  }

  async createEmailReadYesObject() {
    return this.email.getEmailReadYesObject();
  }

  async createEmailReadNoObject() {
    return this.email.getEmailReadNoObject();
  }

  async createEmailReadCancelObject() {
    return this.email.getEmailReadCancelObject();
  }
  //===================================//
  //***********************************//
  //===================================//

  //===================================//
  //=========== CALENDAR ==============//
  //===================================//
  async createCalendarObject(body, format) {
    format = this.calendar.getCalendarObject(body, format);
    return format;
  }
  async createCalendarReadYesObject(body, format) {
    return this.calendar.getCalendarReadYesObject();
  }
  async createCalendarReadNoObject(body, format) {
    return this.calendar.getCalendarReadNoObject();
  }
  async createCalendarReadCancelObject(body, format) {
    return this.calendar.getCalendarReadCancelObject();
  }
  //===================================//
  //***********************************//
  //===================================//

  //===================================//
  //============= NEWS ================//
  //===================================//
  createNewsObject(body, format) {
    format = this.news.getNewsObject(body, format);
    return format;
  }
  async createNewsReadYesObject(body, format) {
    return this.news.getNewsReadYesObject();
  }
  async createNewsReadNoObject(body, format) {
    return this.news.getNewsReadNoObject();
  }
  async createNewsReadCancelObject(body, format) {
    return this.news.getNewsReadCancelObject();
  }
  //===================================//
  //***********************************//
  //===================================//

  //===================================//
  //============ SEARCH ================//
  //===================================//
  async createSearchObject(body, format) {
    format = this.search.getSearchObject(body, format);
    return format;
  }
  //===================================//
  //***********************************//
  //===================================//

  //===================================//
  //========== NAVIGATE-HOME ==========//
  //===================================//
  createNavigateHomeObject() {
    // let response = "";
    const response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'If you say so.'
        },
        {
          type: 'navigate_home',
          speech: ''
        }
      ]
    };
    return response_object;
  }
  //===================================//
  //***********************************//
  //===================================//

  //===================================//
  //======== HANDLE PARAMETERS ========//
  //===================================//

  handleUserName(body, query) {
    query.headers = {
      'x-mail-id': this.getXmailID(body.result.contexts)
    };
    return query;
  }

  async handleNewsParams(body, query, result) {
    await this.deleteContexts(body.sessionId);
    return this.news.getNewsParams(body, query, result);
    // return this.news.getNewsParams(body, query, result);
  }
  handleEmailParams(body, query) {
    return this.email.getEmailParams(body, query);
  }
  handleCalendarParams(body, query) {
    return this.calendar.getCalendarParams(body, query);
  }
  handleSearchParams(body, query, result) {
    return this.search.getSearchParams(body, query, result);
  }

  getXmailID(contexts) {
    for (var i in contexts) {
      if (contexts[i].parameters.x_mail_id) {
        return contexts[i].parameters.x_mail_id;
      }
    }
  }

  deleteContexts(sessionID) {
    request(
      {
        method: 'DELETE',
        uri: `https://api.dialogflow.com/v1/contexts?sessionId=${sessionID}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer 760dc84a1fae44419c38bc4cc1cf6146'
        }
      },
      function(err, res, body) {
        //it works!
        if (err) {
          self.emit('error', err);
        } else {
          console.log('=======all contexts deleted=======');
        }
      }
    );
  }
  //===================================//
  //***********************************//
  //===================================//
<<<<<<< HEAD

  //===================================//
  //================= AIC =============//
  //===================================//
  async createAboutObject() {
    return this.aic.getAboutData();
  }

  async createShowMoreObject() {
    return this.aic.getShowMoreData();
  }

  async createSolutionsObject() {
    return this.aic.getSolutionsData();
  }
  async createServicesObject() {
    return this.aic.getServicesData();
  }
  async createBlogsObject() {
    return this.aic.getBlogsData();
  }
  async createCompanyObject() {
    return this.aic.getCompanyData();
  }
  async createContactObject() {
    return this.aic.getContactData();
  }
  async createWhyAccionObject() {
    return this.aic.getWhyAccionData();
  }
  async createForClientObject() {
    return this.aic.getClientData();
  }
  async createForEmpObject() {
    return this.aic.getEmpData();
  }
  async createAccionStoryObject() {
    return this.aic.getStoryData();
  }
  async createAccionTalentObject() {
    return this.aic.getTalentData();
  }
  async createAccionClientObject() {
    return this.aic.getAccionClientData();
  }
  async createStartUpObject() {
    return this.aic.getStartUpData();
  }
  async createEnterpriseObject() {
    return this.aic.getStartUpData();
  }
  async createMaturedObject() {
    return this.aic.getStartUpData();
  }
  async createGrowthObject() {
    return this.aic.getStartUpData();
  }
  async createAlliancesObject() {
    return this.aic.getAlliancesData();
  }
  async createLocationsObject() {
    return this.aic.getLocationsData();
  }
  async createCorporateObject() {
    return this.aic.getCorporateData();
  }

  async createDefaultObject() {
    return this.aic.getDefaultData();
  }
=======
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
}

module.exports = DialogFlow;
