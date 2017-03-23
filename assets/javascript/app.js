$(document).ready(function(){
	var trainName;
	var destination;
	var firstTrainTime;
	var frequency;
  var nextArrival;
	var minutesAway;
	var config = {
    apiKey: "AIzaSyBBlNyBCw4rjTon4x3wDG7Yg9KFgt6GG7U",
    authDomain: "train-schedule-b8f00.firebaseapp.com",
    databaseURL: "https://train-schedule-b8f00.firebaseio.com",
    storageBucket: "train-schedule-b8f00.appspot.com",
    messagingSenderId: "532522837638"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  database.ref().on("child_added", function(snapshot){
  	var tr = $("<tr>");
  	tr.append("<td>" + snapshot.val().trainName + "</td>");
  	tr.append("<td>" + snapshot.val().destination + "</td>");
  	tr.append("<td>" + snapshot.val().frequency + "</td>");

	var trainTime = moment(snapshot.val().firstTrainTime, 'HH:mm');
  var now = moment();
	var timeDiff = moment().diff(trainTime, "minutes");
  var remainder = timeDiff % frequency;
  minutesAway = frequency - remainder;
  nextArrival = moment(now).add(minutesAway, "m");
  console.log(nextArrival.format("HH:mm"));
	
  tr.append("<td>" + nextArrival.format("HH:mm") + "</td>");
  tr.append("<td>" + minutesAway + "</td>");
	

  $("#table-body").append(tr);

  })
  $(document).on("click", "#submit-btn", function(){
  	trainName = $("#name-input").val().trim();
  	destination = $("#destination-input").val().trim();
  	firstTrainTime = $("#first-train-input").val().trim();
  	frequency = $("#frequency-input").val().trim();

  	database.ref().push({
  		trainName: trainName,
  		destination: destination,
  		firstTrainTime: firstTrainTime,
  		frequency: frequency,

  	})

  })
  $(document).on("click", "#clear-btn", function(){
  	database.ref().set({});
  	$("#table-body").html(" ");
  })
})