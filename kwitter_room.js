// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8qVnliXMwFKl1izQQM2hO9IRUcokRjdA",
  authDomain: "chat-talk-1b82c.firebaseapp.com",
  databaseURL: "https://chat-talk-1b82c-default-rtdb.firebaseio.com",
  projectId: "chat-talk-1b82c",
  storageBucket: "chat-talk-1b82c.appspot.com",
  messagingSenderId: "922462400746",
  appId: "1:922462400746:web:d2136dac09a8c6cfd22793"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");

    document.getElementById("user_name").innerHTML="Welcome " + user_name;

    function addRoom(){
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose:"Adding Room Name"
      });

      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
    }

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
            childKey  = childSnapshot.key;

            row = '<div class="room_name" id="'+ childKey + '" onclick="redirectionToRoomName(this.id)">'+ childKey + '</div><hr>';
            document.getElementById("output").innerHTML += row;
      });
});
}
getData();

function turn(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace = "index.html";
}

function redirectionToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}
