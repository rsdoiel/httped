/**
 * httped_test.js - Test code to make sure httped_test works in the browser.
 */
/*jslint browser: true, indent: 2 */
YUI().use("test", function (Y) {
  var Get = HTTPED.Get,
    testCase,
    good_feed = "http://web-app.usc.edu/ws/url-cache/api/ecal3/highlights/32";
    bad_feed = "http://doesnotexists.example.com/feed/rss.xml";
  
  testCase = new Y.Test.TestCase({
    name: "Get http GET to see if HTTPED.GET() works",
    "should have a well formed the HTTPED object": function () {
        Y.Assert.isObject(HTTPED);
        Y.Assert.isTrue(typeof HTTPED.Get === "function");
    },
    "Should fetch fata if URL is a valid source": function () {
      Get(good_feed, function(httpStatus, response) {
        Y.Assert.areEqual(200, httpStatus);
      }, function (readyState, response) {
        Y.Assert.areNotEqual(4, readyState);
      });
    },
    "Should not fetch data is URL isn't valid": function () {
      Get(bad_feed, function(httpStatus, response) {
        Y.Assert.areNotEqual(200, httpStatus);
      }, function (readyState, response) {
        Y.Assert.areNotEqual(4, readyState);
      });
    }
  });
  Y.Test.Runner.add(testCase);
  Y.Test.Runner.run();
});
