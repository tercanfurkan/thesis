var _  = require('lodash');

function summarizeCommits(commits, comments) {
  return _.map(commits, function(commit) {
    var commit = {
      'sha'     : commit.sha,
      'message' : commit.commit.message,
      'url'     : commit.html_url,
      'author'  : commit.author !== null ? commit.author.login : commit.commit.author.name
    };

    if (commit.message.toLowerCase().indexOf('refactor') !== -1)
      commit.refactor = true;
    
    comments.forEach(function (comment) {
      if (commit.sha === comment.sha) {
        commit.commented = true;
      }
    });

    return commit;
  });
}

function summarizeCommitComments(data) {
  return _.map(data, function(comment) { 
    var comment =  {
      'sha'       : comment.commit_id,
      'message'   : comment.body,
      'url'       : comment.html_url,
      'author'    : comment.user.login,
      'date'      : comment.created_at,
      'position'  : comment.position
    }; 

    if (comment.message.toLowerCase().indexOf('refactor') !== -1)
      comment.refactor = true;

    return comment;
  });
}



module.exports.summarizeCommits         = summarizeCommits;
module.exports.summarizeCommitComments  = summarizeCommitComments;

