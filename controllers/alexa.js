const Speech = require("ssml-builder");
const moment = require("moment");
const request = require("request");
var emailid;

class Alexa {
  constructor() {}

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

  async get_launch_request(body,format){
    const speech = new Speech();
    speech.say("Welcome to Cricket Info App ")
          .pause(`50ms`)
          .say(`Here you can get news on upcoming matches,player statistics and  match calendar`)
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;       
  }

  async get_match_calendar(body,format){
    const speech = new Speech();
    
    if ( !!format.response.outputSpeech.ssml.data && format.response.outputSpeech.ssml.data.length > 0){
      speech.say("The Schedule for match according to calendar is").pause("350ms");
     
      format.response.outputSpeech.ssml.data.map((match, i) => { 
        if(i <= 20){
            speech
            .say(`Match is between`)
            .pause("100ms")
            .say(`${match['name']}`)
            .pause("100ms")
            .say(`and is scheduled on`)
            .pause("200ms")
            .say(`${match.date}`)
            .pause("200ms")
            .say(`Next`)
            .pause("1ms")
         return true;
        }
      });
      speech.say("That's all from match calendar. Thank You.");
     
    }else{
      speech.say("Sorry we don't have any match scheduled").pause("200ms");
    }
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }

  async get_match_statistics(body,format){

    const speech = new Speech();
  
      speech.say("The Player statistics for").pause("350ms");
            speech
            .say(`${format.response.outputSpeech.ssml.name}`)
            .pause("100ms")
            .say(`is`)
            .pause("100ms")
            .say(`${format.response.outputSpeech.ssml.playingRole}`)
            .pause("100ms")
            if(format.response.outputSpeech.ssml.profile){
              speech.say(`${format.response.outputSpeech.ssml.profile}`)
              speech.pause("100ms")
            }  
            speech.say(`its current age is`)
            .say(`${format.response.outputSpeech.ssml.currentAge}`)
            .pause("100ms")
            .say(`and is born on`)
            .pause("200ms")
            .say(`${format.response.outputSpeech.ssml.born}`)
            .pause("200ms")
      speech.say("That's all from statistics of a player. Thank You.");
    format.response.outputSpeech.ssml = speech.ssml();
    return await format;
  }

  intercept_new_match(body,query){
    query.headers = {
     apikey:`PxkSJtJhwZWgVEovi1JXsyimavL2`
    };
    return query;
  }

  intercept_match_calendar(body,query){
    query.headers = {
      apikey:`PxkSJtJhwZWgVEovi1JXsyimavL2`
     };
     return query;
  }

  intercept_player_statistics(body,query){
     query.headers={
      apikey:`PxkSJtJhwZWgVEovi1JXsyimavL2`,
     }
     query.data={
       pid:`35320`
     }
     return query;
  }

}

module.exports = Alexa;
