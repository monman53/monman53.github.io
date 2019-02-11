var handles = [
    {
        'topcoder': 'monman53',
    },
    {
        'topcoder': 'rian', 
    }
];
// var url = "http://api.topcoder.com/v2/users/" + handle + "/statistics/data/srm";
// var url = "http://codeforces.com/api/user.rating?handle=" + handle;
// var url = "https://atcoder.jp/user/" + handle;
// $.ajax(url).done(function(data){
//     console.log(data);
// });
$.ajax({
    type: 'GET',
    url: "https://query.yahooapis.com/v1/public/yql",
    timeout: 10000, 
    dataType: 'json',
    data: {
        // 'q': "select * from html where url='https://atcoder.jp/user/monman53/'",
        'q': "select * from htmlstring where url='https://matome.naver.jp/'",
        'format': 'json', 
            diagnostics: true,
            env: 'store://datatables.org/alltableswithkeys',
    }
}).done(function(data){
    console.log(data);
});
