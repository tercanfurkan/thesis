var fs = require('fs');
var _  = require('lodash');

// fs.readFile('../data/kahuna-commits.json', 'utf8', function (err, data) {

//   console.log(JSON.stringify(data));
//   return;

// 	var obj = JSON.parse(JSON.stringify(data));	

//   commitSummary = _.map(obj, function(commit) {	
//   		return {
//   			'sha'			: commit.sha,
// 	  		'message'	: commit.commit.message,
// 	  		'url'			: commit.html_url,
// 	  		'author'	: commit.author.login
// 	  	};
  	
//   });

//   console.log(commitSummary);

// });

function summarizeCommits(data) {
  return _.map(data, function(commit) { 
    return {
      'sha'     : commit.sha,
      'message' : commit.commit.message,
      'url'     : commit.html_url,
      'author'  : commit.author.login
    }; 
  });
}

function summarizeCommitComments(data) {
  return _.map(data, function(comment) { 
    return {
      'sha'       : comment.commit_id,
      'comment'   : comment.body,
      'url'       : comment.html_url,
      'author'    : comment.user.login,
      'date'      : comment.created_at,
      'position'  : comment.position
    }; 
  });
}

module.exports.summarizeCommits         = summarizeCommits;
module.exports.summarizeCommitComments  = summarizeCommitComments;

