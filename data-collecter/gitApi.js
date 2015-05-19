var GitHubApi = require("github");
var Q       = require('q');

var config	= require('./config.json');

var client = new GitHubApi({
    // required
    version: "3.0.0"
});


var options = {
	sha 			: config.git.sha,
	user 			: config.git.user,
	per_page 	: 100
}

client.authenticate({
    type: "basic",
    username: config.git.username,
    password: config.git.password
});

function hasNextPage(meta) {
	return meta.link && link.indexOf('next') !== -1;
}

function getCommitComments(repo, since, page) {
	var tmpOpt = options;
	tmpOpt.repo = repo;
	tmpOpt.page = page;

	var deferred = Q.defer();
	client.repos.getAllCommitComments(tmpOpt, function (err, res, res2) {
		if (err) throw err;

		console.log(res);

		if (hasNextPage(res.meta)) 
			getCommitComments(repo, since, page+1).then(function (innerRes){
				deferred.resolve(res.concat(innerRes));
			});
		else
			deferred.resolve(res);
	});
	return deferred.promise;
}

function getCommits(repo, since, page) {
	var tmpOpt = options;
	tmpOpt.since = since;
	tmpOpt.repo = repo;
	tmpOpt.page = page;

	var deferred = Q.defer();
	client.repos.getCommits(tmpOpt, function (err, res, res2) {
		if (err) throw err;

		if (hasNextPage(res.meta)) 
			getCommits(repo, since, page+1).then(function (innerRes){
				deferred.resolve(res.concat(innerRes));
			});
		else
			deferred.resolve(res);
	});
	return deferred.promise;
};

module.exports.getCommits 				= getCommits;
module.exports.getCommitComments 	= getCommitComments;


