const Speech = require("ssml-builder");
const moment = require("moment");
const request = require("request");

class Alexa {
  constructor() {}

  async get_emails(body, format) {
    const speech = new Speech();
    if (
      format.response.outputSpeech.ssml.result &&
      format.response.outputSpeech.ssml.result.length > 0
    ) {
      speech.say("This is what show up in your mail").pause("200ms");

      format.response.outputSpeech.ssml.result.map((email, i) => {
        speech
          .say(i + 1)
          .pause("200ms")
          .say("subject is")
          .say(email.subject)
          .pause("50ms")
          .say("email sent from " + email.from.emailAddress.name)
          .pause("50ms")
          .say("preview of mail is")
          .pause("50ms")
          .say(email.bodyPreview)
          .pause("800ms");
      });

      speech.say("Thank You.");
    } else {
      speech.say("You have no unread emails").pause("200ms");
    }

    format.response.outputSpeech.ssml = speech.ssml();

    return await format;
  }

  async get_search_emails(body,format){
    const speech = new Speech();
    if (
      format.response.outputSpeech.ssml.result &&
      format.response.outputSpeech.ssml.result.length > 0
    ) {
      speech.say("This is what show up in your search result").pause("200ms");

      format.response.outputSpeech.ssml.result.map((email, i) => {
        speech
          .say(i + 1)
          .pause("200ms")
          .say("subject is")
          .say(email.subject)
          .pause("50ms")
          .say("email sent from " + email.from.emailAddress.name)
          .pause("50ms")
          .say("preview of mail is")
          .pause("50ms")
          .say(email.bodyPreview)
          .pause("800ms");
      });

      speech.say("Thank You.");
    } else {
      speech.say("You dont have any email from your search result").pause("200ms");
    }

    format.response.outputSpeech.ssml = speech.ssml();

    return await format;

  }

  async get_events(body, format) {
    const speech = new Speech();
    if (format.response.outputSpeech.ssml.result[0].events.length > 0) {
      speech.say("Your events are").pause("350ms");

      format.response.outputSpeech.ssml.result[0].events.map((event, i) => {
        speech
          .say(`${i + 1}.`)
          .pause("50ms")
          .say(
            `Event is on ${event.subject} and is scheduled on ${moment(
              event.start.dateTime
            ).format("YYYY-MM-DD")} which is organized by ${
              event.organizer.emailAddress.name
            } and ends on ${moment(event.end.dateTime).format("YYYY-MM-DD")}`
          )
          .pause("800ms");
      });

      speech.say("Thank You.");
    } else {
      speech.say("No event is scheduled").pause("200ms");
    }

    format.response.outputSpeech.ssml = speech.ssml();

    return await format;
  }

  async get_news(body, format) {
    const speech = new Speech();

    if (format.response.outputSpeech.ssml.data.contentDocuments.length > 0) {
      speech.say("This is what trending in news from my source").pause("350ms");

      format.response.outputSpeech.ssml.data.contentDocuments.map((news, i) => {
        if (!!news.title && news.summary) {
          speech
            .say(`${news.title}`)
            .pause("100ms")
            .say(`summary is`)
            .say(`${news.summary}`)
            .pause("800ms");
        }else{
          speech
                .say(`${news.title}`)
                .pause("100ms")
        }
      });
      speech.say("That's all from my source news. Thank You.");
    } else {
      speech.say("Something went wrong. Please try it again").pause("200ms");
    }
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }

  async get_searchresults(body, format) {
    const speech = new Speech();
    if (format.response.outputSpeech.ssml.data.contentDocuments.length > 0) {
      speech.say("Your search results are").pause("350ms");

      format.response.outputSpeech.ssml.data.contentDocuments.map(
        (query, i) => {
          speech
            .say("Search result ")
            .pause("100ms")
            .say(`${i + 1}`)
            .pause("50ms")
            .say(`${query.title}`)
            .pause("100ms")
            .say("Summary is")
            .pause("100ms")
            .say(`${query.summary}`)
            .pause("100ms")
            .say("Article by")
            .pause("100ms")
            .say(`${query.publishedBy}`)
            .pause("100ms")
        }
      );

      speech.say("That's all from your search result. Thank You.");
    } else {
      speech.say("Something went wrong. Please try it again").pause("200ms");
    }

    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }

  async get_profile(body, format) {
    format.response.outputSpeech.ssml = "hello world";
    return format;
  }

  intercept_sample(body, query) {
    query.headers = {
      "x-mail-token": `${body.session.user.accessToken}`,
      "x-mail-server": "Microsoft"
    };
    return query;
  }

  intercept_sample1(body, query, result) {
    let username = result.result.userPrincipalName;
    username = username.substring(0, username.lastIndexOf("@")).toLowerCase();
    username = username.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");

    query.url = `${query.url}${
      body.request.intent.slots.query.value
    }&size=10&pageNumber=0&userId=${username}`;
    query.headers = {
      "x-mail-token": `${body.session.user.accessToken}`,
      "x-mail-server": "Microsoft"
    };
    return query;
  }

  intercept_sample2(body, query, result) {
    let username = result.result.userPrincipalName;
    username = username.substring(0, username.lastIndexOf("@")).toLowerCase();
    username = username.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");

    query.url = `${query.url}${username}`;
    return query;
  }

  intercept_emails(body, query) {
    query.headers = {
      "x-mail-token": `${body.session.user.accessToken}`,
      "x-mail-server": "Microsoft"
    };
    return query;
  }

intercept_search_emails(body,query){
  query.headers = {
    "x-mail-token": `${body.session.user.accessToken}`,
    "x-mail-server": "Microsoft"
  };
  let emailFrom=body.request.intent.slots.username.value;

  let requestData = {};
      requestData = {
        limit: 10,
          search: {
           query:emailFrom
        }
    };
  query.data = requestData;

  return query;
}


  intercept_events(body, query) {
    let date;
    query.headers = {
      "x-mail-token": `${body.session.user.accessToken}`,
      "x-mail-server": "Microsoft"
    };
    if(body.request.intent.slots.today.hasOwnProperty('value')){
      date=body.request.intent.slots.today.value
      }
    else{
      date=new Date();
      date = date.toISOString().slice(0,10).replace(/-/g,"-");
    }
    let startdate = new Date( moment.utc(date).format())
    
    let enddate =  new Date(moment.utc(date).add(1,'days').add(1, 'minute').format())
    
    let requestData = {};
    requestData = {
      limit: 10,
      filters: {
        andClause: [{
            key: 'startDateTime',
            value: startdate,
            criteria: 'ge'
          },
          {
            key: 'endDateTime',
            value: enddate,
            criteria: 'le'
          }
        ]
      }
    };
    query.data = requestData;

    return query;
  }

  intercept_search(body, query) {
    return new Promise((resolve, reject) => {
      request.get(
        `${envConfig.PA_service.admin[env].base_url}mailms/o365/user/profile`,
        {
          headers: {
            "x-mail-token": body.session.user.accessToken,
            "x-mail-server": "Microsoft"
          }
        },
        (error, response, result) => {
          if (!error && response.statusCode == 200) {
            let username = JSON.parse(result).result.userPrincipalName;
            username = username.substring(0, username.lastIndexOf("@"));
            query.url = `${query.url}${
              body.request.intent.slots.query.value
            }&size=10&pageNumber=0&userId=${username}`;
            resolve(query);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}

module.exports = Alexa;
