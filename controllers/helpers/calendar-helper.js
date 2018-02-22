const moment = require('moment');
const envConfig = require('/secrets/pa_webhooks/envConfig');
const env = envConfig.environment;
const config = envConfig.PA_service.admin[env];

class CalendarHelper {
  constructor() {}

  getCalendarObject(body, format) {
<<<<<<< HEAD
    // console.log(format.data.items);
    let dataArray = format.data.items;
=======

    console.log(format);
    let dataArray = format.data.result[0].events;
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
    const todayDate = String(body.result.parameters.today_date);
    const datePeriod = String(body.result.parameters.period);

    const dateOriginal = String(
      this.getDateOriginalString(body.result.contexts)
    );
    const datePeriodOriginal = String(
      this.getDatePeriodOriginalString(body.result.contexts)
    );
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
      if (todayDate == '' && datePeriod == '') {
        first_response = 'There are no events in your calendar for today';
      } else {
        if (todayDate != '') {
          if (dateOriginal == 'tomorrow') {
            first_response =
              'There are no events in your calendar for tomorrow.';
          } else if (dateOriginal == 'today') {
            first_response = 'There are no events in your calendar for today';
          } else {
            first_response = 'There is nothing in your calendar';
          }
        }
        if (datePeriod != '') {
          if (datePeriodOriginal == 'next week') {
            first_response =
              'There are no events in your calendar for next week';
          } else if (datePeriodOriginal.match(/week|weeks|week\'s/)) {
            first_response =
              'There are no events in your calendar for the week';
          } else {
            first_response = 'There is nothing in your calendar';
          }
        }
      }

      response_object = {
        speech: '',
        displayText: '',
        data: {
          expectUserResponse: false
        },
<<<<<<< HEAD
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
=======
        messages: [{
          type: 0,
          speech: first_response
        }]
      };
    } else {
      var eventsArray = [];
      for (let i in dataArray) {
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
        var isOngoing = false;
        var isAfter = false;

        var responseStartDateTime = '';
        var responseEndDateTime = '';

<<<<<<< HEAD
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

        var current = moment();
        var beforeTime = moment.utc(start_date).local();
        var afterTime = moment.utc(end_date).local();
=======
        var current = moment();
        var beforeTime = moment.utc(dataArray[i].start.dateTime).local();
        var afterTime = moment.utc(dataArray[i].end.dateTime).local();
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167

        if (current.isBetween(beforeTime, afterTime)) {
          isOngoing = true;
        } else {
          isOngoing = false;
        }

<<<<<<< HEAD
        if (current.isAfter(moment.utc(end_date).local())) {
=======
        if (current.isAfter(moment.utc(dataArray[i].end.dateTime).local())) {
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
          isAfter = true;
        } else {
          isAfter = false;
        }

        // for an all day event time is always 00:00:00 to 00:00:00
<<<<<<< HEAD
        if (item.isAllDay) {
          responseStartDateTime = start_date;
          responseEndDateTime = end_date;
        } else {
          // time from the server is of the UTC format and needs to be converted to local format
          responseStartDateTime = moment
            .utc(start_date)
            .local()
            .format();
          responseEndDateTime = moment
            .utc(end_date)
=======
        if (dataArray[i].isAllDay) {
          responseStartDateTime = dataArray[i].start.dateTime;
          responseEndDateTime = dataArray[i].end.dateTime;
        } else {
          // time from the server is of the UTC format and needs to be converted to local format
          responseStartDateTime = moment
            .utc(dataArray[i].start.dateTime)
            .local()
            .format();
          responseEndDateTime = moment
            .utc(dataArray[i].end.dateTime)
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
            .local()
            .format();
        }

<<<<<<< HEAD
        // console.log(item.organizer.email);
        var event_object = {
          title: item.subject,
          location: item.location,
          createdDateTime: item.created,
          weblink: item.htmlLink,
          startTime: responseStartDateTime,
          endTime: responseEndDateTime,
          importance: item.status,
          organizerName: email,
          organizerEmail: email,
          isAllDay: false,
=======
        var event_object = {
          title: dataArray[i].subject,
          location: dataArray[i].location.displayName,
          createdDateTime: dataArray[i].createdDateTime,
          weblink: dataArray[i].webLink,
          startTime: responseStartDateTime,
          endTime: responseEndDateTime,
          importance: dataArray[i].importance,
          organizerName: dataArray[i].organizer.emailAddress.name,
          organizerEmail: dataArray[i].organizer.emailAddress.address,
          isAllDay: dataArray[i].isAllDay,
          isCancelled: dataArray[i].isCancelled,
          isOrganizer: dataArray[i].isOrganizer,
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
          isOngoing: isOngoing,
          isAfter: isAfter
        };

<<<<<<< HEAD
        // if (!isAfter) {
        eventsArray.push(event_object);
        // }
=======
        if (!isAfter) {
          eventsArray.push(event_object);
        }
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
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
<<<<<<< HEAD
          messages: [
            {
              type: 0,
              speech: first_response
            }
          ]
=======
          messages: [{
            type: 0,
            speech: first_response
          }]
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
        };
      } else {
        response_object = {
          speech: '',
          displayText: '',
          data: {
            expectUserResponse: false
          },
<<<<<<< HEAD
          messages: [
            {
=======
          messages: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
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
<<<<<<< HEAD
      messages: [
        {
=======
      messages: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
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
<<<<<<< HEAD
      messages: [
        {
=======
      messages: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
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
<<<<<<< HEAD
      messages: [
        {
=======
      messages: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
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
<<<<<<< HEAD
=======

    // console.log(body);
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
    let response_object = {};
    var date_period = String(body.result.parameters.period);
    var date = String(body.result.parameters.today_date);
    // var difference = 0;
    var isOngoing = false;
    var isAfter = false;

    let first_response = '';
    let requestData = {};

    if (date_period == '' && date == '') {
      var todayStartTime = moment()
        .hours(0)
        .minutes(1)
        .seconds(0);
      // todayStartTime.setHours(0,1,0);
      var todayEndTime = moment()
        .hours(23)
        .minutes(59)
        .seconds(0);

      // var today = new Date();
      // var tomorrow = new Date(moment(today).add(1, 'days'));

      requestData = {
<<<<<<< HEAD
        limit: 10,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNocnV0aS1raGVkZWthciIsImVtYWlsIjoic2hydXRpLmtoZWRla2FyQGFjY2lvbmxhYnMuY29tIiwibmFtZSI6IlNocnV0aSBLaGVkZWthciIsImFjY2Vzc1Rva2VuIjoieWEyOS5HbHhkQmZoSGl6SWU5ZEFoYzdwOWotRWprNzZ0RU1yY2R0djY3cm8zdG4wckhsMEpnSjdwc0JpdFdaS05XTGUxLUN1alItSFljNlRJOGpzM29VWXZJQVo0eXUwZUdVbnNQS3M3UUtJRWxRLUZ5Q01pUkJodXBIQnBTMHE2NUEiLCJpYXQiOjE1MTgxNjYxNzcsImV4cCI6MTUxODI1MjU3N30.bwjIxM39Odpzs0tJPmHzVBfVRARWiAZMVkHiYlzNdTM',
        filters: {
          andClause: [
            {
=======
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNocnV0aS1raGVkZWthciIsImVtYWlsIjoic2hydXRpLmtoZWRla2FyQGFjY2lvbmxhYnMuY29tIiwibmFtZSI6IlNocnV0aSBLaGVkZWthciIsImFjY2Vzc1Rva2VuIjoieWEyOS5HbHhjQmYtSldIazQtdHVpbGZKMVhfTEFQRUhXN2tBZldieE0tTmhNYnRkQUhiNjBDeGZ5ZHRLczBHTzdjX3libHJubHdEd1hnWVc4Y2JZeXFSaHJrVjNOQXI3UExGMFVRbDR1VXBNZFh6ZGtmZktjZmh3NHVZNndPX2k4VXciLCJpYXQiOjE1MTgwODQ0MzcsImV4cCI6MTUxODE3MDgzN30.KLOuthm7QQyEVdV2yQoUCSzRfPqKUBdfyorSc6Vl15w',
        limit: 10,
        filters: {
          andClause: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
              key: 'startDateTime',
              value: todayStartTime,
              criteria: 'ge'
            },
            {
              key: 'endDateTime',
              value: todayEndTime,
              criteria: 'le'
            }
          ]
        }
      };
    } else {
      if (date_period != '') {
        // console.log(date_period);
        // to show events for particular period e.g. week or month
        var date_period_array = date_period.split('/');
        var startDate = date_period_array[0];
        var endDate = date_period_array[1];
        var momentStartDate = moment(startDate);
        var momentEndDate = moment(endDate);

        requestData = {
<<<<<<< HEAD
          limit: 10,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNocnV0aS1raGVkZWthciIsImVtYWlsIjoic2hydXRpLmtoZWRla2FyQGFjY2lvbmxhYnMuY29tIiwibmFtZSI6IlNocnV0aSBLaGVkZWthciIsImFjY2Vzc1Rva2VuIjoieWEyOS5HbHhkQmZoSGl6SWU5ZEFoYzdwOWotRWprNzZ0RU1yY2R0djY3cm8zdG4wckhsMEpnSjdwc0JpdFdaS05XTGUxLUN1alItSFljNlRJOGpzM29VWXZJQVo0eXUwZUdVbnNQS3M3UUtJRWxRLUZ5Q01pUkJodXBIQnBTMHE2NUEiLCJpYXQiOjE1MTgxNjYxNzcsImV4cCI6MTUxODI1MjU3N30.bwjIxM39Odpzs0tJPmHzVBfVRARWiAZMVkHiYlzNdTM',
          orderByClause: [
            {
              key: 'endDateTime',
              criteria: 'desc'
            }
          ],
          filters: {
            andClause: [
              {
=======
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNocnV0aS1raGVkZWthciIsImVtYWlsIjoic2hydXRpLmtoZWRla2FyQGFjY2lvbmxhYnMuY29tIiwibmFtZSI6IlNocnV0aSBLaGVkZWthciIsImFjY2Vzc1Rva2VuIjoieWEyOS5HbHhjQmYtSldIazQtdHVpbGZKMVhfTEFQRUhXN2tBZldieE0tTmhNYnRkQUhiNjBDeGZ5ZHRLczBHTzdjX3libHJubHdEd1hnWVc4Y2JZeXFSaHJrVjNOQXI3UExGMFVRbDR1VXBNZFh6ZGtmZktjZmh3NHVZNndPX2k4VXciLCJpYXQiOjE1MTgwODQ0MzcsImV4cCI6MTUxODE3MDgzN30.KLOuthm7QQyEVdV2yQoUCSzRfPqKUBdfyorSc6Vl15w',
          limit: 10,
          orderByClause: [{
            key: 'endDateTime',
            criteria: 'desc'
          }],
          filters: {
            andClause: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
                key: 'startDateTime',
                value: momentStartDate,
                criteria: 'ge'
              },
              {
                key: 'endDateTime',
                value: momentEndDate,
                criteria: 'le'
              }
            ]
          }
        };
      }
      if (date != '') {
        // console.log(date);
        // to show events for a particular day e.g. today/tomorrow or 24th nov
        var startDate = moment(date).subtract(1, 'minute');
        var endDate = moment(date)
          .add(1, 'days')
          .add(1, 'minute');

        requestData = {
<<<<<<< HEAD
          limit: 10,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNocnV0aS1raGVkZWthciIsImVtYWlsIjoic2hydXRpLmtoZWRla2FyQGFjY2lvbmxhYnMuY29tIiwibmFtZSI6IlNocnV0aSBLaGVkZWthciIsImFjY2Vzc1Rva2VuIjoieWEyOS5HbHhkQmZoSGl6SWU5ZEFoYzdwOWotRWprNzZ0RU1yY2R0djY3cm8zdG4wckhsMEpnSjdwc0JpdFdaS05XTGUxLUN1alItSFljNlRJOGpzM29VWXZJQVo0eXUwZUdVbnNQS3M3UUtJRWxRLUZ5Q01pUkJodXBIQnBTMHE2NUEiLCJpYXQiOjE1MTgxNjYxNzcsImV4cCI6MTUxODI1MjU3N30.bwjIxM39Odpzs0tJPmHzVBfVRARWiAZMVkHiYlzNdTM',
          filters: {
            andClause: [
              {
=======
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNocnV0aS1raGVkZWthciIsImVtYWlsIjoic2hydXRpLmtoZWRla2FyQGFjY2lvbmxhYnMuY29tIiwibmFtZSI6IlNocnV0aSBLaGVkZWthciIsImFjY2Vzc1Rva2VuIjoieWEyOS5HbHhjQmYtSldIazQtdHVpbGZKMVhfTEFQRUhXN2tBZldieE0tTmhNYnRkQUhiNjBDeGZ5ZHRLczBHTzdjX3libHJubHdEd1hnWVc4Y2JZeXFSaHJrVjNOQXI3UExGMFVRbDR1VXBNZFh6ZGtmZktjZmh3NHVZNndPX2k4VXciLCJpYXQiOjE1MTgwODQ0MzcsImV4cCI6MTUxODE3MDgzN30.KLOuthm7QQyEVdV2yQoUCSzRfPqKUBdfyorSc6Vl15w',
          limit: 10,
          filters: {
            andClause: [{
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
                key: 'startDateTime',
                value: startDate,
                criteria: 'ge'
              },
              {
                key: 'endDateTime',
                value: endDate,
                criteria: 'le'
              }
            ]
          }
        };
      }
    }

<<<<<<< HEAD
    query.headers = {
      'X-Mail-Id': this.getXmailID(body.result.contexts)
    };
=======
    // query.headers = {
    //   'X-Mail-Id': this.getXmailID(body.result.contexts)
    // };
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
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

  getDateOriginalString(contexts) {
    const data = JSON.stringify(contexts);
    for (var i in contexts) {
      if (contexts[i].parameters['today_date.original']) {
        return contexts[i].parameters['today_date.original'];
      }
    }
  }

  getDatePeriodOriginalString(contexts) {
    const data = JSON.stringify(contexts);
    for (var i in contexts) {
      if (contexts[i].parameters['period.original']) {
        return contexts[i].parameters['period.original'];
      }
    }
  }
}

<<<<<<< HEAD
module.exports = CalendarHelper;
=======
module.exports = CalendarHelper;
>>>>>>> e3a075984d3871ad2e0cfa27cca0851362ef6167
