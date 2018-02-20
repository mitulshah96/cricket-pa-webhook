class SearchHelper {
  constructor() {
    this.response_object = {};

    this.responses = [
      'This is what I got.',
      'I found this for you.',
      'Here you go.'
    ];
    this.fallbackResponses = [
      "I didn't get that. Can you say it again?",
      'I missed what you said. Say it again?',
      'Sorry, could you say that again?',
      'Sorry, can you say that again?',
      'Can you say that again?',
      "Sorry, I didn't get that.",
      'Sorry, what was that?',
      'One more time?',
      'What was that?',
      'Say that again?',
      "I didn't get that.",
      'I missed that.'
    ];
  }
  getSearchObject(body, format) {
    const query = body.result.resolvedQuery;
    const time = String(body.timestamp);
    let type = '';
    let publishedOn = '';

    if (format.data.responseCode == 0) {
      let dataArray = format.data.data.contentDocuments;

      var searchArray = [];

      if (dataArray.length == 0) {
        let first_response = 'Nothing found.';
        this.response_object = {
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
        for (let i in dataArray) {
          if (dataArray[i].id) {
            if (dataArray[i].type == 'Video') {
              type = 'video';
            } else {
              type = 'search';
            }
            // else if (dataArray[i].type == "OtherDocument") {
            //   type = "search";
            // }
            var search_object = {
              id: dataArray[i].id,
              title: dataArray[i].title,
              summary: dataArray[i].summary,
              publishedBy: 'Staff',
              type: type,
              publishedOn: time,
              likes: dataArray[i].likes,
              views: dataArray[i].views,
              shares: dataArray[i].shares
            };
            searchArray.push(search_object);
          }
        }

        let first_response = 'I found this for you.';
        this.response_object = {
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
              type: 'search_card',
              results: searchArray
            }
          ]
        };
      }
    } else {
      let response = this.fallbackResponses[
        this.getRandomInt(0, this.fallbackResponses.length - 1)
      ];
      this.response_object = {
        speech: '',
        displayText: '',
        data: {
          expectUserResponse: false
        },
        messages: [
          {
            type: 0,
            speech: response
          }
        ]
      };
    }

    return this.response_object;
  }

  getSearchParams(body, query, result) {
    const resolvedQuery = String(body.result.resolvedQuery);
    // let username = result.data.result.userPrincipalName;
    // username = username.substring(0, username.lastIndexOf("@")).toLowerCase();
    // username = username.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");

    query.url = `${
      query.url
    }${resolvedQuery}&size=10&pageNumber=0&userId=deepakdewani`;

    return query;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = SearchHelper;
