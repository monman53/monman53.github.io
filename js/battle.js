$(function() {
    $.get('http://codeforces.com/ratings/organization/100', 
            function(data) {
        $('#battle').empty().append(data);
    });
});
