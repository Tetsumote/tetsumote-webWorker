var statusDisplay;
var worker;
var searchButton;

window.onload = function() {
  statusDisplay = document.getElementById("status");
  searchButton = document.getElementById("searchButton");
  statusDisplay.innerHTML = "After loading big data it take some time to render the output.Be patient..."; 
};
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
  statusDisplay.innerHTML = "A web worker is on the job ("+
   fromNumber + " to " + toNumber + ") ...";  
  // Let the user know that things are on their way.
  // statusDisplay.innerHTML = "A web worker is on the job ("+
  //  fromNumber + " to " + toNumber + ") ...";
}
function receivedWorkerMessage(event) {
  var message = event.data;
  console.log(message)
  if (message.messageType == "PrimeList") {
    var primes = message.data;
    // Show the prime number list on the page.
    var primeList = "";
    for (var i=0; i<primes.length; i++) {
      primeList += primes[i];
      if (i != primes.length-1) primeList += ", ";
    }
    var displayList = document.getElementById("primeContainer");
    displayList.innerHTML = primeList;

    if (primeList.length == 0) {
      statusDisplay.innerHTML = "Search failed to find any results.";
    }
    else {
      statusDisplay.innerHTML = "The results are here!";
    }
    searchButton.disabled = false;
  }
  else if (message.messageType == "Progress") {
    if(message.data === 100){
      statusDisplay.innerHTML = message.data + "% done rendering...";
    }else{
      statusDisplay.innerHTML = message.data + "% done ...";
    }
  }
} 

function workerError(error) {
  statusDisplay.innerHTML = error.message;
}

function cancelSearch() {
  worker.terminate();
  worker = null;
  statusDisplay.innerHTML = "Search cancelled.";
  searchButton.disabled = false;
}