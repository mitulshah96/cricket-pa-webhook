const envConfig = require('/secrets/pa_webhooks/envConfig');

class NewsHelper {
  constructor() {}
  getNewsObject(body, format) {
    let response_object = {};
    let dataArray = format.data.data.contentDocuments;
    // let baseImageUrl = envConfig.;

    const baseImageUrl =
      `${envConfig.PA_service.admin[envConfig.environment].news_base_url}` ||
      'local';

    let newsArray = [];
    let type = '';
    let videoURL = '';
    let imgUrl = '';

    for (let i in dataArray) {
      if (dataArray[i].thumbNailUrl != null) {
        // console.log(dataArray[i].thumbNailUrl)
        if (dataArray[i].thumbNailUrl.match(/http/)) {
          imgUrl = dataArray[i].thumbNailUrl;
        } else {
          imgUrl = baseImageUrl + dataArray[i].thumbNailUrl;
        }
      } else {
        imgUrl = '';
      }

      const news_object = {
        title: dataArray[i].title,
        subtitle: '',
        formattedText: dataArray[i].summary,
        date: dataArray[i].lastUpdatedOn,
        entryId: dataArray[i].id,
        type: dataArray[i].type,
        image: {
          url: imgUrl
        },
        likeCount: dataArray[i].likes,
        viewCount: dataArray[i].views,
        buttons: [],
        videoURL: ''
      };

      newsArray.push(news_object);
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

  // getUserName(body, query) {
  //   query.headers = {
  //     "x-mail-id": this.getXmailID(body.result.contexts)
  //   };
  //   return query;
  // }

  getNewsParams(body, query, result) {
    // let username = result.data.result.userPrincipalName;
    // username = username.substring(0, username.lastIndexOf("@")).toLowerCase();
    // username = username.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    // query.url = `${query.url}${username}`;
    query.url = `${query.url}deepakdewani`;

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

module.exports = NewsHelper;
