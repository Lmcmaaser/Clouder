'use strict';
// example request: url 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2'
// put your own value below!
const apiKey = 'vf0nBrCd45B2RNaRqaA4T7HIj'; 
const baseUrl = 'https://api.twitter.com/1.1/search/tweets.json';

function eventSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    console.log('submitEvent ran');
    const query = $('#js-query').val();
    const amount = $('#js-amount').val();
    const type = $('input:checked').val();
    getParks(query, type, amount);
  });
}

function formatParams(params) {
  const queryParams = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryParams.join('&');
}

function getParks(query, type, amount) {
    const params = {
      q: query,
      result_type: type,
      count: amount
    };
    const queryString = formatQueryParams(params)
    const url = baseUrl + '?' + queryString +'&api_key=' + apiKey
    console.log(queryString);
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson, amount))
      .catch(err => {
        $('#js-results').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#js-results').empty();
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++){
    /*for each object in the items array, add a list item to the results list*/
    $('#js-results').append(
        `<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`
    )};
    $('#js-search-input').val('');
    $('#js-max').val('');
};

$(eventSubmit);