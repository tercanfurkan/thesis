var _  = require('lodash');

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

