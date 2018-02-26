const Speech = require("ssml-builder");
const moment = require("moment");
const request = require("request");

class Alexa {
  constructor() {}

  async get_emails(body, format) {
    const speech = new Speech();
    if (
      format.response.outputSpeech.ssml.messages &&
      format.response.outputSpeech.ssml.messages.length > 0
    ) {
      speech.say("This is what show up in your mail").pause("200ms");

      format.response.outputSpeech.ssml.messages.map((email, i) => {
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
          .say(email.snippet)
          .pause("800ms");
      });

      speech.say("Thank You.");
    } else {
      speech.say("You have no emails").pause("200ms");
    }

    format.response.outputSpeech.ssml = speech.ssml();

    return await format;
  }

  async get_events(body, format) {
    const speech = new Speech();
    if (
      format.response.outputSpeech.ssml.items &&
      format.response.outputSpeech.ssml.items.length > 0
    ) {
      speech.say("Your events are").pause("350ms");

      format.response.outputSpeech.ssml.items.map((event, i) => {
        speech
          .say(`${i + 1}.`)
          .pause("50ms")
          .say(
            `Event is on ${event.summary} and is scheduled on ${moment(
              event.start.dateTime
            ).format("YYYY-MM-DD")} which is organized by ${
              event.organizer.displayName
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

    if (!!format.response.outputSpeech.ssml.data && format.response.outputSpeech.ssml.data.length > 0) {
      speech.say("This is what trending in news").pause("350ms");

      format.response.outputSpeech.ssml.data.map((news, i) => {
          speech
            .say(`${news.title}`)
            .pause("100ms")
            .say(`summary is`)
            .say(`${news.description}`)
            .pause("800ms");
      });
      speech.say("That's all from news. Thank You.");
    } else {
      speech.say("Something went wrong. Please try it again").pause("200ms");
    }
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }


  async get_emailaddress_callback(body, format) {
    return format;
  }


  intercept_email(body, query) {
    query.headers = {
      authorization: `Bearer ${body.session.user.accessToken}`
    };
    return query;
  }

  intercept_news(body,query){
    let value=!!body.request.intent.slots.query.value ? body.request.intent.slots.query.value:null
    query.url=`${query.url}${value}&plaintext=true`;
    return query;
  }

  intercept_get_email(body, query, result) {
    emailid = !!result ? result.emailAddress : null;
    query.headers = {
      token: `${body.session.user.accessToken}`,
      "refresh-token": `1/YlCPIhL_0oOO7a0QF2CUwZTw71d98YXICOdnWnE7-Et4tMOcF2VoSAUpSIJ6WWi7`,
      alexa: `true`,
      email: emailid
    };
    return query;
  }

  intercept_get_calendar(body, query, result) {
    let date;
    emailid = !!result ? result.emailAddress : null;

    if (
      !!body.request.intent.slots.today.hasOwnProperty("value") &&
      body.request.intent.slots.today.hasOwnProperty("value")
    ) {
      date = body.request.intent.slots.today.value;
    } else {
      date = new Date();
      date = date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "-");
    }
    date = moment.utc(date).format();

    query.url = `${query.url}&timeMin=${date}`;
    query.headers = {
      token: `${body.session.user.accessToken}`,
      "refresh-token": `1/YlCPIhL_0oOO7a0QF2CUwZTw71d98YXICOdnWnE7-Et4tMOcF2VoSAUpSIJ6WWi7`,
      alexa: `true`,
      email: emailid
    };
    return query;
  }


  intercept_emails(body, query) {
    query.headers = {
      "x-mail-token": `${body.session.user.accessToken}`,
      "x-mail-server": "Microsoft"
    };
    return query;
  }

}

module.exports = Alexa;
