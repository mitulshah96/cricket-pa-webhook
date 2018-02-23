const moment = require('moment');
const envConfig = require('/secrets/pa_webhooks/envConfig');
const env = envConfig.environment;
const config = envConfig.PA_service.admin[env];

class CalendarHelper {
  constructor() {}

  getCalendarObject(body, format) {
     console.log(format.data.items);
    let dataArray = format.data.items;
    const todayDate = String(body.result.parameters.today_date);
    const datePeriod = String(body.result.parameters.period);

    const date_period = String(body.result.parameters.period);
    const date_period_array = date_period.split('/');
    const startDate = date_period_array[0];
    const endDate = date_period_array[1];
    const momentStartDate = moment(startDate);
    const momentEndDate = moment(endDate);

    const difference = momentEndDate.diff(momentStartDate, 'days');
    var first_response = '';
    var response_object = {};

    if (dataArray.length == 0) {
        first_response = 'There are no events in your calendar for today'
       

      response_object = {
        speech: '',
        displayText: '',
        data: {
          expectUserResponse: false
        },
        messages: [
          {
            type: 0,
            speech: first_response
          }
        ]
      };
    } else {
      var eventsArray = [];
      for (let item of dataArray) {
        var isOngoing = false;
        var isAfter = false;

        var responseStartDateTime = '';
        var responseEndDateTime = '';

        let start_date = '';
        let end_date = '';

        let email = '';

        if (item.start !== undefined) {
          start_date =
            item.start.dateTime === undefined
              ? item.start.date
              : item.start.dateTime;
        }
        if (item.end !== undefined) {
          end_date =
            item.end.dateTime === undefined ? item.end.date : item.end.dateTime;
        }

        if (item.organizer !== undefined) {
          email = item.organizer.email;
        }
        // for an all day event time is always 00:00:00 to 00:00:00
     

        // console.log(item.organizer.email);
        var event_object = {
          title: item.summary,
          location: item.location,
          createdDateTime: item.created,
          weblink: item.htmlLink,
          startTime: start_date,
          endTime: end_date,
          importance: '',
          organizerName: email,
          organizerEmail: email,
          isAllDay: false,
          isOngoing: isOngoing,
          isAfter: isAfter
        };

        // if (!isAfter) {
        eventsArray.push(event_object);
        // }
      }

      // sorting events based on startTime
      eventsArray.sort(function compare(a, b) {
        var dateA = new Date(a.startTime);
        var dateB = new Date(b.startTime);
        return dateA - dateB;
      });

      if (eventsArray.length === 0) {
        if (difference == 0) {
          first_response = 'There are no events in your calender.';
        } else if (difference == 6) {
          first_response = 'There are no events in your calendar for the week.';
        } else if (difference >= 28) {
          first_response =
            'There are no events in your calendar for the month.';
        } else {
          first_response = 'There are no events in your calender.';
        }
      } else if (eventsArray.length > 10) {
        if (difference == 0) {
          first_response = "You've quite a lot of events in your calendar.";
        } else if (difference == 6) {
          first_response =
            "You've quite a lot of events in your calendar for the week.";
        } else if (difference >= 28) {
          first_response =
            "You've quite a lot of events in your calendar for the month.";
        } else {
          first_response = "You've quite a lot of events in your calendar.";
        }
      } else if (eventsArray.length < 10) {
        if (difference == 0) {
          first_response = 'Here, I checked your Outlook calendar.';
        } else if (difference == 6) {
          first_response =
            'Here, I checked your Outlook calendar for the week.';
        } else if (difference >= 28) {
          first_response =
            'Here, I checked your Outlook calendar for the month.';
        } else {
          first_response = 'Here, I checked your Outlook calendar.';
        }
      }

      if (eventsArray.length === 0) {
        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: false
          },
          messages: [
            {
              type: 0,
              speech: first_response
            }
          ]
        };
      } else {
        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: false
          },
          messages: [
            {
              type: 0,
              speech: first_response
            },
            {
              type: 'event_card',
              events: eventsArray
            },
            {
              type: 0,
              speech: 'Do you want me to read the events?'
            }
          ]
        };
      }
    }
    return response_object;
  }

  getCalendarReadYesObject() {
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
          type: 'read_event',
          speech: ''
        }
      ]
    };
    return response_object;
  }
  getCalendarReadNoObject() {
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
  getCalendarReadCancelObject() {
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
  getCalendarParams(body, query) {
    var date ;

    if (!! body.result.parameters.today_date ) {
      date = body.result.parameters.today_date;
    } else {
      date = new Date();
      date = date.toISOString().slice(0, 10) .replace(/-/g, "-");
    }
    date = moment.utc(date).format();
    query.url = `${query.url}&timeMin=${date}`;

    query.headers = {
      'x-access-token': this.getXmailID(body.result.contexts)
    };

    return query;
  }

  getXmailID(contexts) {
    for (var i in contexts) {
      if (contexts[i].parameters.x_mail_id) {
        return contexts[i].parameters.x_mail_id;
      }
    }
  }

}

module.exports = CalendarHelper;
