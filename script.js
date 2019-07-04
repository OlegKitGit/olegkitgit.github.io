$("#insert").click(function() {
    let insert_text = $("textarea").val();
    $("#text").html(insert_text);
});


$("#text").on("mouseup", function(e) {
    if(window.getSelection)
       txt = window.getSelection().toString();
    else if(document.getSelection)
       txt = document.getSelection();
    else if(document.selection)
       txt = document.selection.createRange().text;
    $('#URL').css({ display: 'none', width: 'auto'}).text('');
    if (txt.length != 0){
        $('#URL').text(txt);
        txt_length = $('#URL').width();
        $('#URL').css({ position: 'absolute', left: e.pageX - txt_length, top: e.pageY - 75});
        $('#URL').html('<p><label for="URL_adress">URL</label><input type="text" id="URL_adress"><button type="button" id="attach_picture">Attach</button> </p>');
        $('#URL').show().css({ width: 280});
        $("#attach_picture").on("click", function(){
            text_string = $("#text").html()
            re = new RegExp(txt, 'g');
            new_text_string = text_string.replace(re, "<span  class='picture' adress=" + $("#URL_adress").val() + "><strong>" + txt + "</strong></span>")
            document.getElementById('text').innerHTML = new_text_string;
            $('#URL').css({ display: 'none', width: 'auto'}).text('');
        });
    }
});

$("#text").on("mouseenter", 
  ".picture", function(e) {
    $('#picture').html('<img src=' + $(this).attr("adress") + '>');
    image_width = $('#picture').width();
    image_height = $('#picture').height();
    $('#picture').css({position: 'absolute', left: e.pageX - image_width/2, top: e.pageY - image_height - 10}).show();
   /* $('#picture').css({position: 'absolute', left: e.pageX - image_width/2, top: e.pageY - image_height - 100}).show().animate({opacity: "show", top: "0"}, "fast");; */ 
/*    $('#picture').show( "slow", function() {
       
    }); */
});

$("#text").on("mouseleave", 
  ".picture", function() {
   $('#picture').css({ width: 'auto'}).hide();
    /* $('#picture').css({width: 'auto'}).animate({opacity: "hide"}, "fast").hide() */
});
