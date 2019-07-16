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


$("#attach").on("click", function() {
    if ($('#URL').css("display") !== 'none'){ 
        $('#URL').css({ display: 'none', width: 'auto'});
    } 
    else{
        $('#URL').css({ display: 'block', width: '200px'});
        $("#word").val('');
        $("#URL_adress").val('');
        $("#word_translation").val('');
    }
});

$("#attach_picture").on("click", function(){
    if ($("#word").val() &&  $("#URL_adress").val() && $("#word_translation").val()){
        txt = $("#word").val();
        translation_txt = $("#word_translation").val()
        text_string = $("#text").html()
        re = new RegExp('\\s' + txt, 'g');
        new_text_string = text_string.replace(re, " <span  class='picture' translation='" + translation_txt + "' adress=" + $("#URL_adress").val() + "><strong>" + txt + "</strong></span>")
        document.getElementById('text').innerHTML = new_text_string;
        $("#word").val('');
        $("#URL_adress").val('');
        $("#word_translation").val('');
    };
});

$("#text").on("mouseenter", 
  ".picture", function(e) {
    $('#picture').html('<img src=' + $(this).attr("adress") + '>');
    $('#translation_div').text($(this).attr("translation"));
    image_width = $('#picture_container').width();
    image_height = $('#picture_container').height();
    $('#picture_container').css({position: 'absolute', left: e.pageX - image_width/2, top: e.pageY - image_height - 15});
    $('#picture_container').show();
});

$("#text").on("mouseleave", 
  ".picture", function() {
   $('#picture_container').css({ width: 'auto'}).hide();
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
    else if ($('#text_translation').css("display") === 'inline-block'){
        $('#text_translation').hide();
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

$("#t2im").click(function() {
    if ($(".picture").length){
        document.getElementById("text_visualisation_div").innerHTML = '<div id="images_line_0"></div>';
        reg = /=(["])(?:(?=(\\?))\2.)*?\1|(\. )/g
        text_string = $("#text").html()
        let found = text_string.match(reg);
        let arrayLength = found.length;
        let counter = 0;
        let div_counter = 0;
        let image_counter = 0; 
        for (let i = 0; i < arrayLength; i++) {
            if (found[i] === '="picture"'){ 
                continue;    
            }
            else if (found[i] === '. '){
                div_counter += 1;
                $("#text_visualisation_div").append('<div id="images_line_' + div_counter.toString() + '"></div>');
            }
            else if (counter === 0){
                console.log(found[i].slice(2,-1));
                $("#images_line_" + div_counter.toString() + "").append('<figure class="sign"><span id="image_' + image_counter.toString() + '"></span><figcaption>' + found[i].slice(2,-1) + '</figcaption></figure>');
                counter = 1
            }
            else if (counter === 1){
                console.log(found[i].slice(2,-1));
                $("#image_" + image_counter.toString() + "").html('<img class="images" src=' + found[i].slice(2,-1) + '></img>')
                counter = 0
                image_counter +=1
            }
        }
    };    
});