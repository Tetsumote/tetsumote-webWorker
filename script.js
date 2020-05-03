var worker;

function doSearch() {
  // Disable the button, so the user can't start more than one search
  // at the same time.
  searchButton.disabled = true;

  // Create the worker.
  worker = new Worker("PrimeNumber.js");

  // Hook up to the onMessage event, so you can receive messages
  // from the worker.
  worker.onmessage = receivedWorkerMessage;

  // Get the number range, and send it to the web worker.
  var fromNumber = document.getElementById("from").value;
  var toNumber = document.getElementById("to").value;

  worker.postMessage(
   { from: fromNumber,
     to: toNumber }
  );

  // Let the user know that things are on their way.
  // statusDisplay.innerHTML = "A web worker is on the job ("+
  //  fromNumber + " to " + toNumber + ") ...";
}
function receivedWorkerMessage(event) {
  // Get the prime number list.
  var primes = event.data;
      // Show the prime number list on the page.
      var primeList = "";
      for (var i=0; i<primes.length; i++) {
        primeList += primes[i];
        if (i != primes.length-1) primeList += ", ";
      }
      var displayList = document.getElementById("primeContainer");
      displayList.innerHTML = primeList;
  // Copy the list to the page.
console.log(primes)
  
  // Allow more searches.
  searchButton.disabled = false;
} 