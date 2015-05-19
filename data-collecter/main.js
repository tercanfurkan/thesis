var gitApi 		= require('./gitApi.js');
var parser 		= require('./parser.js');

// gitApi.getCommits('kahuna', '2015-03-15', 1).then(function(res){
// 	console.log(parser.summarizeCommits(res));
// })

gitApi.getCommitComments('kahuna', 1).then(function(res) {
	console.log(parser.summarizeCommitComments(res));
});
