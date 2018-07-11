var mood = [];
var messageObject;

function updateMoods(){
  $.ajax("http://cs120.liucs.net/assn4/moods.json",
        {
          success: function(data){
            mood = data
            $("#moodList").empty();
            mood.map(function(m){
              m = m.replace(/[</>"]/g, '')
                $("#moodList")[0].innerHTML+= "<option value='"+m+"'>"
            })
          },
        })
    setTimeout(updateMoods, 5000);
}

function updateMessageBoard(){
  $.ajax("http://cs120.liucs.net/assn4/messages.json",
        {
            success: function(data){
              messageObject = data
              var name;
              var textMessage;
              var time;
              var date;
              var moods;
              $("#messageBoard").empty();
              messageObject.map(function(m){
                name = m.sender;
                textMessage = m.text;
                time = m.timestamp.substring(11,19);
                date = m.timestamp.substring(0,10);
                if(m.mood == "" || m.mood ==" "){
                  moods = ""
                }else{
                  moods = "Mood: "+m.mood+""
                }
                console.log("working");
                $("#messageBoard")[0].innerHTML+= "<b> <span style = 'color:rgb(44, 168, 180)'> "+name+" </span></b> said:<br>"+textMessage+"<br><i> <span style = 'color:rgb(38, 144, 80)'> at "+time+" on "+date+"</span> </i><br> "+moods+"<br><br>"
              })
            },
        })
        setTimeout(updateMessageBoard, 5000);
}


$(function(){
  updateMoods()
  updateMessageBoard()
  console.log("JS working")
  $("#submit").click(function(){
    console.log("button clicked")
    updateMessageBoard()
    $.ajax("http://cs120.liucs.net/assn4/messages.json",
          {
            method: "POST",
            data: JSON.stringify(
                  {sender: $("#name").val(),
                   text: $("#message").val(),
                   mood: $("#moodText").val()
                 }),
                  error: function(){},
                  success: function(){
                    $("#name").val("")
                    $("#message").val("")
                    $("#moodText").val("")
                  },
          })
     })
})
