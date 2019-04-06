const request = require('request');
const querystring = require('querystring');
const r2 = require('r2');

const API_KEY = '7083256c-ad29-47c1-9811-62ea436c622f',
  API_URL = 'https://api.thecatapi.com';

const setResponse = async (options) => {
  try {

    
    let _url = API_URL + `/v1/images/search?${options.queryString}`;

    console.log(`here is the url ${_url}`);

    const response = await r2.get(_url, {
      'x-api-key': API_KEY
    }).json


    return response;

  } catch (e) {
    console.log(e)
  }

}

module.exports = {

  load: function () {


  },
  searchImage: async function (options) {

    options = options || {};

    const query_params = {
      'limit': options.limit || 5, // only need one
      'mime_types': options.mime_types || 'png,gif,jpg',
      'size': options.size || 'small'
    }

    return setResponse({
      queryString: querystring.stringify(query_params)
    })

  }

}
