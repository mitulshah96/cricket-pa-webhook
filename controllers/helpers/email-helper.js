const lodash = require('lodash');
const envConfig = require('/secrets/pa_webhooks/envConfig');
const env = envConfig.environment;
const config = envConfig.PA_service.admin[env];

class EmailHelper {
  constructor() {}

  getEmailObject(body, format) {
    const responses = [
      'This is what shows up in your inbox.',
      'This is what I found in your inbox',
      'I found this in your inbox'
    ];

    let response_object = {};
    let bodyPreview = '';
    let first_response = '';
    let dataArray = format.data.messages;

    if (dataArray.length == 0) {
      first_response = 'No Emails Found';
    } else {
      var emailsArray = [];

      for (let i in dataArray) {
        let fromname;
        if (!!dataArray[i].from.emailAddress.name) {
          fromname = dataArray[i].from.emailAddress.name;
        } else {
          fromname = 'No-reply ';
        }

        var email_object = {
          subject: dataArray[i].subject,
          from: {
            name: fromname,
            address: dataArray[i].from.emailAddress.address
          },
          emailBody: dataArray[i].bodyPreview,
          receivedDateTime: dataArray[i].receivedDateTime
          // isEmailRead: dataArray[i].isRead,
          // weblink: dataArray[i].webLink
        };
        emailsArray.push(email_object);
      }

      // sorting emails
      const orderedArray = emailsArray.sort();

      response_object = {
        speech: '',
        displayText: '',
        data: {
          expectUserResponse: false
        },
        messages: [
          {
            type: 0,
            speech: 'This is what shows up in your inbox'
          },
          {
            type: 'email_card',
            emails: emailsArray
          },
          {
            type: 0,
            speech: 'Do you want me to read the emails?'
          }
        ]
      };
    }

    return response_object;
  }

  getEmailReadYesObject() {
    let response = 'Here you go';
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: response
        },
        {
          type: 'read_email',
          speech: ''
        }
      ]
    };
    return response_object;
  }

  getEmailReadNoObject() {
    let response = "Okay. I won't read it.";
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: response
        },
        {
          type: 'not read',
          speech: ''
        }
      ]
    };
    return response_object;
  }

  getEmailReadCancelObject() {
    let response = '';
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'cancel_reading',
          speech: ''
        },
        {
          type: 0,
          speech: 'As you say.'
        }
      ]
    };
    return response_object;
  }

  getEmailParams(body, query) {
    query.headers = {
      'x-access-token': this.getXAccessToken(body.result.contexts)
    };
    return query;
  }

  getXAccessToken(contexts) {
    for (var i in contexts) {
      if (contexts[i].parameters.x_mail_id) {
        return contexts[i].parameters.x_mail_id;
      }
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = EmailHelper;
