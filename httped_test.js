/**
 * httped_test.js - Test code to make sure httped_test works in the browser.
 */
YUI().use("test", function (Y) {
  var testCase,
    bbc_tech_feed = "http://feeds.bbci.co.uk/news/technology/rss.xml",
    example_com_feed = "http://doesnotexists.example.com/feed/rss.xml";
  
  testCase = new Y.Test.TestCase({
    name: "Get http GET to see if HTTPED.GET() works",
    "Should fetch fata if URL is a valid source": function () {
        Get(bbc_tech_feed, function(httpStatus, response) {
            Y.Assert.areEqual(httpStatus, 200);
        }, function (readyState, response) {
            Y.Assert.areNotEqual(readyState, 4);
        });
    },
    "Should not fetch data is URL isn't valid": function () {
        Get(bbc_tech_feed, function(httpStatus, response) {
            Y.Assert.areNotEqual(httpStatus, 200);
        }, function (readyState, response) {
            Y.Assert.areNotEqual(readyState, 4);
        });
    }
  });
  Y.Test.Runner.add(testCase);
  
  Y.Test.Runner.run();
});
