/*!
 * httped.js - A web browser friendly wrapper of xhr.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 *
 * copyright (c) 2013 R. S. Doiel
 * all rights reserved.
 * Released under the BSD 2-clause license.
 * See http://opensource.org/licenses/BSD-2-clause for details.  
 */
/*jslint browser: true, indent: 2 */
(function (global) {
  "use strict";
  var HTTPED = new Object();
   
  /*
   * Perform an http GET operation and return the results in
   * either an "onComplete" or "onStateChange" callback.
   * @method Get
   * @param {string} a URL to fetch
   * @param {function} an "onComplete" callback. Callback will
   * receive a http status code as the first parameter followed by the
   * response received from the xhr request.
   * @param {function} an "onStateChange" callback. Callback will
   * receive a "state" code and the response object from the xhr request.
   * States can be
   * 0. unsent
   * 1. opened
   * 2. headers received
   * 3. loading
   * State 4 is given to the "onComplete" callback instead of "onStateChange".
   */
  function Get(url, onComplete, onStateChange) {
    var xhr;

    // xhr handling is inspired by code samples at Mozilla's dev site
    // https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
    }
    if (!xhr) {
      throw("remote xhr not supported.");
    }    
    
    // Manage the state changes and trigger appropriate callback.
    function manageStateChange () {
      if (xhr.readyState === 4) {
        // Two params, http status, response
        onComplete(xhr.status, xhr.response);
      } else {
        onStateChange(xhr.readyState, xhr.response);
      }
    }

    xhr.onreadystatechange = manageStateChange;
    xhr.open('GET', url);
    xhr.send(null);
  };
  HTTPED.Get = Get;

  /*
   * Post will prep and send a post to the URL provided.
   * @method Post
   * @param {string} the URL to post to.
   */
  function Post(url, data) {
    //FIXME: implement data encoding and transmition.
    thow("Post not implemented.");
  }
  HTTPED.Post = Post;

  global.HTTPED = HTTPED;
}(this));
