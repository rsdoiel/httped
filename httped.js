/**
 * httped.js - A web browser friendly wrapper of xhr.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 */
/*jslint browser: true, indent: 2 */
(function (global) {
  "use strict";
  var HTTPED = new Object();
   
  function Get(url, onComplete, onStateChange) {
    var xhr;

    // xhr handling is derived from code samples at Mozilla's dev site
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
    
    // Attach listeners for compelte and on state change
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
  global.HTTPED = HTTPED;
}(this));
