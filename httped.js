/**
 * httped.js - A web browser friendly wrapper of xhr.
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 */
/*jslint browser: true, indent: 4 */
(function (global) {
   "use strict";
   var HTTPED = new Object();
   
   function Get(url, onComplete, onStateChange) {
      var httpRequest;

      // This is derived on the example at Mozilla's dev site
      // https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
      if (window.XMLHttpRequest) { // Mozilla, Safari, ...
          httpRequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE 8 and older
         try {
           httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
           try {
             httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
           } catch (e) {}
         }
      }
      if (!httpRequest) {
         throw("remote xhr not supported.");
      }      
      
      // Attach listeners for compelte and on state change
      function manageStateChange () {
         if (httpRequest.readyState === 4) {
            // Two params, http status, response
            onComplete(httpRequest.status, httpRequest.response);
         } else {
            onStateChange(httpRequest.readyState, httpRequest.response);
         }
      }

      httpRequest.onreadystatechange = manageStateChange;
      httpRequest.open('GET', url);
      httpRequest.send(null);
   };
   HTTPED.Get = Get;

   global.HTTPED;
}(this));
