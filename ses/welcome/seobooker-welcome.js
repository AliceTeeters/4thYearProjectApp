var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});

const html = './welcome.html';

// Create createTemplate params
var params = {
  Template: { 
    TemplateName: 'welcome', /* required */
    HtmlPart: html,
    SubjectPart: 'Welcome to Séobooker'
  }
};

// Create the promise and SES service object
var templatePromise = new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(params).promise();

// Handle promise's fulfilled/rejected states
templatePromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });