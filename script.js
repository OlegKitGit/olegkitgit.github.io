$("#insert").click(function() {
    let insert_text_original = $("#text_original").val();
    let insert_text_translation = $("#text_translation").val();
    if (insert_text_translation){
        $("#translation").html(insert_text_translation);
        $('#text_translation').hide();
        $("#text").hide();
        $("#translation").show();
    }
    else {  
        $("#text").html(insert_text_original);
    } 
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
});

$("#text").on("mouseleave", 
  ".picture", function() {
   $('#picture').css({ width: 'auto'}).hide();
});


$("#translate").click(function() {
    if ($('#translation').css("display") === 'none' && $('#text_translation').css("display") === 'none' && $('#text').css("display") === 'block' && $('#translation').text().length === 5){
        $('#text_translation').show();
    }
    else if ($('#translation').css("display") === 'block' && $('#text').css("display") === 'none'){
        $('#translation').hide();
        $('#text').show()
    }
    else if ($('#translation').css("display") === 'none' && $('#text_translation').css("display") === 'none' && $('#text').css("display") === 'block' && $('#translation').text().length > 0){
        $('#text').hide();
        $('#translation').show()
    } 

});