  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpNougMujc1aGDs0QUPWclKRUxw_IQVco",
    authDomain: "train-scheduler-d99c0.firebaseapp.com",
    databaseURL: "https://train-scheduler-d99c0.firebaseio.com",
    projectId: "train-scheduler-d99c0",
    storageBucket: "train-scheduler-d99c0.appspot.com",
    messagingSenderId: "316330873885"
  };

  firebase.initializeApp(config);

  //create a variable to reference the database
  var database = firebase.database();
  //console.log(database)

   //initial values
  //var trainName = "";
  //var destination = "";
  //var firstTrainTime = "";
  //var frequency = "";

  //when submit button(#addTrain) is clicked, store and retrieve user input
  $("#addTrain").on("click", function(){
      //prevent default
      event.preventDefault();
      
      //store and retrieve user input
      var trainName = $("#train-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainTime = $("#firstTrainTime-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);

      var newTrain = {
        name: trainName,
        destination: destination,
        first: firstTrainTime,
        frequency: frequency
      }

      database.ref().push(newTrain);

      //clear user input form
      $("#train-input").val("");
      $("#destination-input").val("");
      $("#firstTrainTime-input").val("");
      $("#frequency-input").val("");

      //first attempt WROOOONG
      //database.ref().push({
      //    trainName: trainName,
      //    destination: destination,
      //    firstTrainTime: firstTrainTime,
      //    frequency: frequency,
      //});
});

  //FIREBASE
  //save data with a child added and snapshot
  database.ref().on("child_added", function(childSnapshot){
    //console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;
    //console.log(childSnapshot.val().trainName);    
    //console.log(childSnapshot.val().destination);
    //console.log(childSnapshot.val().firstTrainTime);
    //console.log(childSnapshot.val().frequency);

    //connect to current time
    var currentTime = moment();
    //console.log(moment(currentTime));

    //create a variable to invoke momentJS and capture firstTrainTime and convert to time
    //subtract 1 year. Cuz they said so.
    var firstTrainTimeMoment = moment(firstTrainTime, "hh:mm A").subtract(1, "years");
    //console.log(firstTrainTimeMoment);

    //time difference, minutes between arrival times
    var arrivalMinute = moment().diff(moment(firstTrainTimeMoment), "minutes");
    //console.log("time difference: " + arrivalMinute);
    
    //
    var prevMinute = arrivalMinute % frequency;
    //console.log(prevMinute)

    //minutes away
    var awayTrain = frequency - prevMinute;
    //console.log(awayTrain);

    var nextArrival = moment().add(awayTrain, 'minutes');
    console.log("Next Arrival: " + moment(nextArrival).format("hh:mm A"));

    //i guess this wasn't needed after all
    //var arrivalTime = nextArrival.format("HH:mm");
    //console.log(arrivalTime); 
        
    //hey jquery, get the user input from the form and give them a value

  //add user inputs to the database
  $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextArrival).format("hh:mm A") + "</td><td>" + awayTrain + "</td>");

  //$("#addTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + awayTrain + "</td>");

  //first attempt at adding user input to database and table
    //$("#addTrain").append($("<tr>'")
    //  .append($("<td>").text(trainName))
    //  .append($("<td>").text(destination))
    //  .append($("<td>").text(frequency))
    //  .append($("<td>").text(arrivalTime))
    //  .append($("<td>").text(awayTrain))
    //  );
    
  });//, function(errorObject) {
  //console.log("Errors handled: " + errorObject.code);


