var Q 				= require('q');

var gitApi 		= require('./gitApi.js');
var parser 		= require('./parser.js');
var config		= require('./config.json');

gitApi.getCommitComments(config.git.web, 1).then(function(comments) {
	gitApi.getCommits(config.git.web, '2015-03-15', 1).then(function(commits) {
		comments = parser.summarizeCommitComments(comments);
		commits = parser.summarizeCommits(commits, comments);

		var resultCommits = [];
		commits.forEach(function (commit) {
			if (!commit.commented && commit.refactor)
				resultCommits.push(commit);
		});

		var resultComments = [];
		comments.forEach(function(comment) {
			if (comment.refactor)
				resultComments.push(comment);
		});
		var refactors = resultCommits.concat(resultComments);
		console.log(JSON.stringify(refactors));

	}).done();
}).done();
