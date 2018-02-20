const lodash = require('lodash');
const envConfig = require('/secrets/pa_webhooks/envConfig');
const env = envConfig.environment;
const config = envConfig.PA_service.admin[env];

class EmailHelper {
  constructor() {}

  getEmailObject(body, format) {
    const emailFrom = String(body.result.parameters.user_first_name);
    const emailType = String(body.result.parameters.mail_type);

    const responses = [
      'This is what shows up in your inbox.',
      'This is what I found in your inbox',
      'I found this in your inbox'
    ];

    let response_object = {};
    let bodyPreview = '';
    let first_response = '';

    let dataArray = format.data.result;

    if (dataArray.length == 0) {
      if (emailFrom == '') {
        if (emailType != '') {
          if (emailType == 'read') {
            first_response = "You don't have any read emails in your inbox";
          } else {
            first_response = "You don't have any unread emails in your inbox";
          }
        } else {
          first_response = "You don't have any emails in your inbox";
        }

        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: false
          },
          messages: [{
            type: 0,
            speech: first_response
          }]
        };
      } else {
        if (emailType != '') {
          if (emailType == 'read') {
            first_response = `No read emails found from ${emailFrom}`;
          } else {
            first_response = `No unread emails found from ${emailFrom}`;
          }
        } else {
          first_response = `No emails found from ${emailFrom}`;
        }
        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: false
          },
          messages: [{
            type: 0,
            speech: first_response
          }]
        };
      }
    } else {
      var emailsArray = [];

      for (let i in dataArray) {
        var email_object = {
          subject: dataArray[i].subject,
          from: {
            name: dataArray[i].from.emailAddress.name,
            address: dataArray[i].from.emailAddress.address
          },
          emailBody: dataArray[i].bodyPreview,
          receivedDateTime: dataArray[i].receivedDateTime,
          isEmailRead: dataArray[i].isRead,
          weblink: dataArray[i].webLink
        };
        emailsArray.push(email_object);
      }

      // sorting emails
      const orderedArray = emailsArray.sort();

      if (emailFrom == '') {
        first_response = responses[this.getRandomInt(0, responses.length - 1)];
        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: true
          },
          messages: [{
              type: 0,
              speech: first_response
            },
            {
              type: 'email_card',
              emails: orderedArray
            },
            {
              type: 0,
              speech: 'Do you want me to read your emails?'
            }
          ]
        };
      } else {
        first_response = `Here are your emails from ${emailFrom}`;
        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: true
          },
          messages: [{
              type: 0,
              speech: first_response
            },
            {
              type: 'email_card',
              emails: emailsArray
            },
            {
              type: 0,
              speech: 'Do you want me to read your emails?'
            }
          ]
        };
      }
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
      messages: [{
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
      messages: [{
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
      messages: [{
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
    const emailFrom = String(body.result.parameters.user_first_name);
    const emailType = String(body.result.parameters.mail_type);

    let requestData = {};
    let emailURL = '';
    requestData = {
      type: 'Inbox',
      fields: ['Subject', 'BodyPreview', 'From', 'ReceivedDateTime', 'WebLink'],
      filters: {
        field: {
          key: 'isRead',
          value: 'false',
          criteria: 'eq'
        }
      }
    };

    if (emailFrom == '') {
      emailURL = `${config.base_url}/${
        config.service_url
      }/o365/mail/offset/0/limit/10`;

      if (emailType != '') {
        if (emailType == 'read') {
          requestData.filters.field.value = 'true';
        } else {
          requestData.filters.field.value = 'false';
        }
      }
    } else {
      emailURL = `${config.base_url}/${config.service_url}/o365/search/mail`;

      requestData = {
        limit: 10,
        search: {
          field: {
            key: 'from',
            value: emailFrom
          }
        }
      };
    }

    query.url = emailURL;
    query.headers = {
      'X-Mail-Id': this.getXmailID(body.result.contexts)
    };
    query.data = requestData;

    return query;
  }

  getXmailID(contexts) {
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