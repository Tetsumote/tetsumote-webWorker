onmessage = function(event) {
    // The object that the web page sent is stored in the event.data property.
    var fromNumber = event.data.from;
    var toNumber = event.data.to;
  
    // Using that number range, perform the prime number search.
    var primes = findPrimes(fromNumber, toNumber);
  
    // Now the search is finished. Send back the results.
    postMessage(
      {messageType: "PrimeList", data: primes}
     );
  };
  

  function findPrimes(fromNumber, toNumber) {

    // Create an array containing all integers
    // between the two specified numbers.
    var list = [];
    for (var i=fromNumber; i<=toNumber; i++) {
      if (i>1) list.push(i);
    }
  
    // Test for primes.
    var maxDiv = Math.round(Math.sqrt(toNumber));
    var primes = [];
    var previousProgress;
  
    //for number less than list.length
    for (var i=0; i<list.length; i++) {
      
      //define constant
      var failed = false;
      
      //
      for (var j=2; j<=maxDiv; j++) {
        if ((list[i] != j) && (list[i] % j == 0)) {
          failed = true;
        } else if ((j==maxDiv) && (failed == false)) {
          primes.push(list[i]);
        }
      }
      
      // Give a progress update.
      var progress = Math.round(i/list.length*100);
        if (progress != previousProgress) {
          postMessage(
          {messageType: "Progress", data: progress}
          );
          previousProgress = progress;   
        }
      }
  
    return primes;
  }