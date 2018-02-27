const envConfig = require('/secrets/pa_webhooks/envConfig');

class NewsHelper {
  constructor() {}
  getNewsObject(body, format) {
    let response_object = {};
    let dataArray = format.data.data.demos.items;
    console.log(dataArray);

    let newsArray = [];
    let type = '';
    let videoURL = '';
    let imgUrl = '';

    for (let i of dataArray) {
      const news_object = {
        title: i.title,
        subtitle: '',
        formattedText: i.tagline,
        date: i.firstCreatedTimestamp,
        entryId: i.id,
        type: '',
        image: {
          url: 'https://prioriti.net/aicgateway/aic/images/' + i.thumbnail
        },
        likeCount: 0,
        viewCount: 0
      };

      newsArray.push(news_object);

      console.log(news_object);
    }

    let first_response = "This is what's trending";
    response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: true
      },
      messages: [
        {
          type: 0,
          speech: first_response
        },
        {
          type: 'news_card',
          news: newsArray
        },
        {
          type: 0,
          speech: 'Do you want me to read the news?'
        }
      ]
    };
    return response_object;
  }

  getNewsReadYesObject() {
    let response = 'Got it.';
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
          type: 'read_news',
          speech: ''
        }
      ]
    };
    return response_object;
  }
  getNewsReadNoObject() {
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
  getNewsReadCancelObject() {
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

  getNewsParams(body, querys) {
    querys.data = {
      query: `{ 
				demos(
					pageOffset: 0, 
					pageLength: 5
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

  getXmailID(contexts) {
    for (var i in contexts) {
      if (contexts[i].parameters.x_mail_id) {
        return contexts[i].parameters.x_mail_id;
      }
    }
  }
}

module.exports = NewsHelper;
