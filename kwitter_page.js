var firebaseConfig = {
    apiKey: "AIzaSyD8qVnliXMwFKl1izQQM2hO9IRUcokRjdA",
    authDomain: "chat-talk-1b82c.firebaseapp.com",
    databaseURL: "https://chat-talk-1b82c-default-rtdb.firebaseio.com",
    projectId: "chat-talk-1b82c",
    storageBucket: "chat-talk-1b82c.appspot.com",
    messagingSenderId: "922462400746",
    appId: "1:922462400746:web:d2136dac09a8c6cfd22793"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send_button(){
  msg = document.getElementById("msg").value;

  firebase.database().ref(room_name).push({
      user_name:user_name,
      message:msg,
      like:0
  });

document.getElementById("msg").value = "";
}

function get_Data(){
  firebase.database().ref("/" + room_name).on("value", function(snapshot){
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot){
          child_key = childSnapshot.key;
          child_data = childSnapshot.val();

          if (child_key != "purpose"){
            firebase_message_id = child_key;
            message_data = child_data;

            console.log(firebase_message_id);
            console.log(message_data);

            user_name = message_data ['user_name'];
            message = message_data['message'];
            like = message_data['like'];

            name_with_tag = "<h4>" + user_name + "</h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            like_button = "<button class='btn btn-warning' id= " + firebase_message_id + " value = " + like + " onclick='updateLike(this.id)'><";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

            row = name_with_tag + message_with_tag + like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;
          }
      });
  });
      
  
}
get_Data();

function updateLike(message_id){
  console.log("Boton me gusta -" + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}