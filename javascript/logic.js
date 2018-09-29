$(document).ready(function(){
    //initialize firebase
    var config = {
        apiKey: "AIzaSyDNG7SIHL8D19Lag7mMg0icfj6p7e_boK0",
        authDomain: "myfirstapp-56046.firebaseapp.com",
        databaseURL: "https://myfirstapp-56046.firebaseio.com",
        projectId: "myfirstapp-56046",
        storageBucket: "myfirstapp-56046.appspot.com",
        messagingSenderId: "235380450459"
    };
    firebase.initializeApp(config);
    var dataRef = firebase.database();

    var train = {
        name: "",
        destination: "",
        initialTime: "",
        frequency: ""
    }
    

    function addTrains(data){
        console.log(data.initialTime);
        var initialTimeConverted = moment(data.initialTime, "HH:mm")//.subtract(1, "years");
        var timeDiff = moment().diff(moment(initialTimeConverted), "minutes");
        var tRemainder  = timeDiff % data.frequency;
        var nextTrainTime = moment().add(data.frequency - tRemainder, "minutes");

        var row = $("<tr>").append(`<th scope='row'>${" "}</th>
        <td>${data.name}</td>
        <td>${data.destination}</td>
        <td>${data.initialTime}</td>
        <td>${data.frequency} (min)</td>
        <td>${moment().format("HH:mm")}</td>
        <td>${moment(nextTrainTime).format("HH:mm")}</td>`);
        $("#train-info").append(row);
    }


    dataRef.ref("trains").on("child_added", function(snapshot){
        var data = snapshot.val();
        console.log(data);
        //$("#train-info").empty();
        addTrains(data);
    });

    $("#submit-button").on("click", function(event){
        event.preventDefault();

        train.name = $("#inputName").val().trim();
        train.destination = $("#inputDestination").val().trim();
        var time = moment($("#inputFirstTrainTime").val().trim(), "HH:mm");
        train.initialTime = moment(time).format("HH:mm");
        train.frequency = $("#inputFrequency").val().trim();
        console.log(train.initialTime);
        dataRef.ref("trains").push(train);
    });
});