'use strict';

$(function() {
    if (location.pathname.split("/")[1] !== '') {
        $('nav li a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    }
});
