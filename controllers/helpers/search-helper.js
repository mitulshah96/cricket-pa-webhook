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
    const time = String(body.timestamp);
    let type = '';
    let publishedOn = '';

    //  console.log(format.data.data.search.profiles.items)

    if (format.data.data.search.profiles.items.length === 0) {
      this.response_object = {
        speech: '',
        displayText: '',
        data: {
          expectUserResponse: false
        },
        messages: [
          {
            type: 0,
            speech: 'Nothing found.'
          }
        ]
      };
    } else {
      if (
        !!format.data.data.search.profiles.items &&
        format.data.data.search.profiles.items.length > 0
      ) {
        let dataArray = format.data.data.search.profiles.items;

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
            var search_object = {
              id: dataArray[i].designation,
              title: dataArray[i].name,
              summary: dataArray[i].introduction,
              publishedBy: dataArray[i].email,
              type: '',
              publishedOn: time,
              likes: '0',
              views: '',
              shares: '0'
            };
            searchArray.push(search_object);
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
    }

    return this.response_object;
  }

  getSearchParams(body, querys) {
    const queryparam = JSON.stringify(body.result.resolvedQuery);
    querys.data = {
      query: `{
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
    };
    return querys;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = SearchHelper;
