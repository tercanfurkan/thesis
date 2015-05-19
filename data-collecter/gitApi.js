var GitHubApi = require("github");
var Q       = require('q');

var client = new GitHubApi({
    // required
    version: "3.0.0"
});

var config = {
	username	: '',
	password	: '',
	user 		: 'Tellybean'
}


var options = {
	sha: 'develop',
	per_page : 100
}

client.authenticate({
    type: "basic",
    username: config.username,
    password: config.password
});

function hasNextPage(meta) {
	return meta.link && link.indexOf('next') !== -1;
}

function getCommitComments(repo, since, page) {
	var tmpOpt = options;
	tmpOpt.user = config.user;
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
	tmpOpt.user = config.user;
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

module.exports.getCommits 			= getCommits;
module.exports.getCommitComments 	= getCommitComments;


