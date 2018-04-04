var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var http = require('http');


var app = express();
var server = http.Server(app);

app.get('/', function (req, res) {
    let array = [];
    request(
        {
            method: 'GET'
            , uri: 'https://www.bseindia.com/markets/equity/EQReports/bulk_deals.aspx'
            , gzip: true
        }
        , function (error, response, body) {
            var $ = cheerio.load(body);
            $('tr.TTRow').each(function () {
                var a = $(this);
                var data = {};
                var j = 1;
                a.children().each(function () {
                    var a = $(this);                 
                    if (j === 1)
                        data.DealDate = a.text();
                    else if (j === 2)
                        data.SecurityCode = a.text();
                    else if (j === 3)
                        data.SecurityName = a.text();
                    else if (j === 4)
                        data.ClientName = a.text();
                    else if (j === 5)
                        data.DealType = a.text();
                    else if (j === 6)
                        data.Quantity = a.text();
                    else if (j === 7)
                        data.Price = a.text();
                    j++;
                });
                array.push(data);
                
            })
            res.send(array);
        }
    )
  
})

server.listen(5001, function () {
    console.log('listening on *: 5001');
});







