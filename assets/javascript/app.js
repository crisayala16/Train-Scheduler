$(document).ready(function(){
	var trainName;
	var destination;
	var firstTrainTime;
  var frequency;
  //Configuration information for firebase
  var config = {
    apiKey: "AIzaSyBBlNyBCw4rjTon4x3wDG7Yg9KFgt6GG7U",
    authDomain: "train-schedule-b8f00.firebaseapp.com",
    databaseURL: "https://train-schedule-b8f00.firebaseio.com",
    storageBucket: "train-schedule-b8f00.appspot.com",
    messagingSenderId: "532522837638"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
 //Function triggerd when a child is added to the database
 database.ref().on("child_added", function(snapshot){
   var tr = $("<tr>");
   tr.append("<td>" + snapshot.val().trainName + "</td>");
   tr.append("<td>" + snapshot.val().destination + "</td>");
   tr.append("<td>" + snapshot.val().frequency + "</td>");
    //Calculates the next arrival and minutes away using
    //the pre-existing data values 
    frequency = snapshot.val().frequency;
    var trainTime = moment(snapshot.val().firstTrainTime, 'HH:mm');
    var now = moment();
    var timeDiff = moment().diff(trainTime, "minutes");
    var remainder = timeDiff % frequency;
    var minutesAway = frequency - remainder;
    var nextArrival = moment(now).add(minutesAway, "m");
    
    tr.append("<td>" + nextArrival.format("HH:mm") + "</td>");
    tr.append("<td>" + minutesAway + "</td>");
    $("#table-body").append(tr);
  })
 //On click event to submit information to the database
 $(document).on("click", "#submit-btn", function(){
    //grabs the values from the input boxes
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    //empties the input boxes onced the values are gathered
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
    //sets the database properties 
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
    })
  })
  //On click event for clearing the database
  $(document).on("click", "#clear-btn", function(){
  	database.ref().set({});
  	$("#table-body").html(" ");
  })
})