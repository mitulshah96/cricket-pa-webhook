const Speech = require("ssml-builder");
const moment = require("moment");
const request = require("request");
var emailid;

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

    if (
      !!format.response.outputSpeech.ssml.data.demos.items &&
      format.response.outputSpeech.ssml.data.demos.items.length > 0
    ) {
      speech.say("This is what trending in AIC").pause("350ms");

      format.response.outputSpeech.ssml.data.demos.items.map((news, i) => {
        speech
          .say(`${i + 1}.`)
          .pause("50ms")
          .say(`${news.title}`)
          .pause("100ms")
          .say(`summary is`)
          .say(`${news.tagline}`)
          .pause("200ms")
          .say(`description is`)
          .say(`${news.description}`)
          .pause("800ms");
      });
      speech.say("That's all from AIC. Thank You.");
    } else {
      speech.say("Sorry we don't have any latest news from AIC").pause("200ms");
    }
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }

  async get_new_match(body,format){
    const speech = new Speech();
    if ( !!format.response.outputSpeech.ssml.matches && format.response.outputSpeech.ssml.matches.length > 0){
      speech.say("The Schedule for latest match are").pause("350ms");

      format.response.outputSpeech.ssml.matches.map((match, i) => {
        if(i <= 20 && match.matchStarted==false){
            speech
            .say(`Match is between`)
            .pause("100ms")
            .say(`${match['team-1']}`)
            .pause("100ms")
            .say(`and`)
            .say(`${match['team-2']}`)
            .pause("100ms")
            .say(`and is scheduled on`)
            .pause("200ms")
            .say(`${moment(match.dateTimeGMT).format("YYYY-MM-DD")}`)
            .pause("200ms")
            .say(`Next`)
         return true;
        }
      });
      speech.say("That's all from latest matches. Thank You.");
     
    }else{
      speech.say("Sorry we don't have any latest match scheduled").pause("200ms");
    }
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }



  async get_search(body, format) {
    const speech = new Speech();

    if (
      !!format.response.outputSpeech.ssml.data.search.profiles.items &&
      format.response.outputSpeech.ssml.data.search.profiles.items.length > 0
    ) {
      speech.say("Your Search result are").pause("350ms");

      format.response.outputSpeech.ssml.data.search.profiles.items.map((searches, i) => {
        speech
          .say(`${i + 1}.`)
          .pause("50ms")
          .say(`${searches.name}`)
          .pause("100ms")
          .say(`designation is`)
          .say(`${searches.designation}`)
          .pause("200ms")
          .say("a quick introduction is")
          .pause("200ms")
          .say(`${searches.introduction}`)  
          .pause("200ms")
          .say(`location is`)
          .say(`${searches.location}`)
          .pause("200ms")
          .say("and email is")
          .say(`${searches.email}`) 
          .pause("800ms") 
        
        
      });
      speech.say("That's all from Your search result. Thank You.");
    } else {
      speech.say("Sorry we didn't found any data").pause("200ms");
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

  intercept_news(body, querys) {
    querys.data = {
      query: `{ 
				demos(
					pageOffset: 0, 
					pageLength: 5,
				)
				{ 
					total,
					items {
						id, 
						title, 
						tagline, 
						authors, 
						embedUrl, 
						description, 
						thumbnail, 
						_firstCreatedTimestamp
					} 
				} 
			}`
    };
    return querys;
  }



  intercept_new_match(body,query){
    query.headers = {
     apikey:`PxkSJtJhwZWgVEovi1JXsyimavL2`
    };
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

  intercept_search(body,querys){
    const queryparam = JSON.stringify(body.request.intent.slots.query.value)
    querys.data = {
      query:`{
        search(query:${queryparam}){
          pageLength
          profiles {
            pageOffset
            pageLength
            total
            items {
              id
              name
              email
              location
              introduction
              designation
              aiclevel
            }
          }
        }
      }`
    }
    return querys
  }

}

module.exports = Alexa;
