  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpNougMujc1aGDs0QUPWclKRUxw_IQVco",
    authDomain: "train-scheduler-d99c0.firebaseapp.com",
    databaseURL: "https://train-scheduler-d99c0.firebaseio.com",
    projectId: "train-scheduler-d99c0",
    storageBucket: "",
    messagingSenderId: "316330873885"
  };

  firebase.initializeApp(config);

  //create a variable to reference the database
  var database = firebase.database();

  //initial values
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";

  //when submit button(#addTrain) is clicked, store and retrieve user input
  $("#addTrain").on("click", function(event){
    //prevent default
    event.preventDefault();

    //store and retrieve user input
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#firstTrainTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#firstTrainTime-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });

  });

  //FIREBASE
  //save data with a child added and snapshot
  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    firstTrainTime = childSnapshot.val().firstTrainTime;
    frequency = childSnapshot.val().frequency;

    //create a variable to invoke momentJS and capture firstTrainTime and convert to time
    var firstTrainTimeMoment = moment(firstTrainTime, "HH:mm");
    console.log(firstTrainTimeMoment);

    //connect to current time
    var currentTime = moment();
    console.log(currentTime);

    var arrivalMinute = currentTime.diff(firstTrainTimeMoment, 'minutes');
    var prevMinute  = arrivalMinute % frequency;
    var 
  })


  //hey jquery, get the user input from the form and give them a value

  //add user inputs to the database
  //$("#addTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + awayTrain + "</td>");