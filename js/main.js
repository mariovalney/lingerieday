var CLIENT_ID = "162c1db63bd44815b8198a6e8407d019";
var CLIENT_SECRET = "a6b2c0ed91a84cd5aa432b6a9d4b9c4b";
var ACESS_TOKEN = "801179321.162c1db.848a38da377e4c51962cbd3d683433ab";

var fotosQnt = 0;

function readMedia(hashtag) {
    jQuery.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/tags/"+ hashtag +"/media/recent?client_id="+ CLIENT_ID +"&access_token="+ ACESS_TOKEN +"",
        success: function(data)  {
            jQuery.each(data.data, function(ix, foto) {
                jQuery("#instagram").append(" <figure class='grid2 thumb_instagram'> <a data-href='" + foto.link +"' data-original='"+foto.images.standard_resolution.url+"'> <img alt='"+ foto.user.full_name +"' src='" + foto.images.low_resolution.url +"' > </a> <figcaption class='cor'> <span>@"+ foto.user.full_name +"</span> </figcaption> </figure>");
            });
            jQuery("#next-instagram").attr('href', data.pagination.next_url);
            fotosQnt += data.data.length;
            organizarMedia();
        }
    });
}

function paginationMedia(url) {
    jQuery.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: url,
        success: function(data)  {
            jQuery.each(data.data, function(ix, foto) {
                jQuery("#instagram").append(" <figure class='grid2 thumb_instagram'> <a data-href='" + foto.link +"' data-original='"+foto.images.standard_resolution.url+"'> <img alt='"+ foto.user.full_name +"' src='" + foto.images.low_resolution.url +"' > </a> <figcaption class='cor'> <span>@"+ foto.user.full_name +"</span> </figcaption> </figure>");
            });
            jQuery("#next-instagram").attr('href', data.pagination.next_url);
            fotosQnt += data.data.length;
            organizarMedia();
        }
    });
}

function organizarMedia() {
    var largura = jQuery('#instagram').width();
    var linha = 6;
    var resto = fotosQnt % linha;
    jQuery('.thumb_instagram').show();

    for (var i = 1; i <= resto; i++) {
        jQuery('.thumb_instagram:nth-last-child('+i+')').hide();
    };
}

jQuery(document).ready(function() {
    readMedia('LingerieDay');

    jQuery("#next-instagram").on('click', function(event) {
        event.preventDefault();
        paginationMedia(jQuery(this).attr('href'));
    });

    jQuery(window).resize( function() {
        organizarMedia();
    });

    jQuery('html').on('click', '.thumb_instagram a', function() {
        jQuery('#shadow-box').fadeIn('500');
        $shadowImg = jQuery(this).children('img');
        $shadowImg = $shadowImg.clone().appendTo('#shadow-box').addClass('shadow-img').hide();
        var shadowImgUrl = jQuery(this).attr('data-original');

        $shadowImg.attr('src', shadowImgUrl);

        $shadowImg.css({
            'box-sizing'    : 'border-box',
            'position'      : 'relative',
            'border-radius' : '0',
            'border'        : '10px solid #fff',
            'z-index'       : '999999999999',
            'max-width'     : '80%',
            'max-height'    : '80%',
            'top'           : '85px',
            'margin'        : '0 auto',
            'display'       : 'block'
        }).delay(500).fadeIn('500');


    });

    jQuery('#shadow-box').on('click', function() {
        jQuery('#shadow-box').fadeOut('250');
        $shadowImg.fadeOut('100').delay(100).remove();
    });
});