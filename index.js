var _ = require('underscore'),
github = require('octonode');

var args = process.argv.slice(2);
var repo = args.shift();
var username = args.shift();
var password = args.shift();

var client = github.client({
  username: username,
  password: password 
});

var ghrepo = client.repo(repo);

getIssues(1, ghrepo);

function getIssues(page, ghrepo) {
  ghrepo.issues({
  page: page,
  per_page: 100,
  state: 'all'
}, function(err, issues, header){
    if (err) {
      console.log(err);
      return;
    }
    if (issues) {
      _.each(issues, function(issue) {
        console.log(issue.user.login);
      });
      page++;
      console.log(page);
      getIssues(page, ghrepo);
    }
  });
}
//var issues = JSON.parse(fs.readFileSync(filename, 'utf8'));


/*j
curl('https://api.github.com/repos/' + repo + '/issues\?state\=all', function(err) {
  var issues = this.body;
});
*/
