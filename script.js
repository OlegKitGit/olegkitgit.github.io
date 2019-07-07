jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

var img_object = new Object();
var img_index = 0

    
$("#picture").on("click", "#reply", function() {
    if (Object.keys(img_object)[img_index] === $("#answer").val()){
        alert("Ok!")
        img_index++;
        if (img_index != Object.keys(img_object).length) {       
            $('#picture').html('<img id="test_image" src=' + img_object[Object.keys(img_object)[img_index]] + '><p><label for="answer">Word</label><input type="text" id="answer"><button type="button" id="reply">Reply</button> </p>');
        }    
    }
});



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

$("#test").click(function() {
    if ($(".picture").length){
        $("#test_div").show();
        $("#picture").show();
        $("#picture").css({zIndex: 5});
        $("#picture").center();
        $(".picture").each(function(index) {
            if (index === 0){
                $('#picture').html('<img id="test_image" src=' + $(this).attr("adress") + '><p><label for="answer">Word</label><input type="text" id="answer"><button type="button" id="reply">Reply</button> </p>');
            }
            img_object[$(this).text()] = $(this).attr("adress")
        });
    };    
});

