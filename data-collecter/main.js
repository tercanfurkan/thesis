var gitApi 		= require('./gitApi.js');
var parser 		= require('./parser.js');
var config		= require('./config.json');

// gitApi.getCommits(config.git.device, '2015-03-15', 1).then(function(res){
// 	console.log(parser.summarizeCommits(res));
// })

gitApi.getCommitComments(config.git.device, 1).then(function(res) {
	console.log(parser.summarizeCommitComments(res));
});
