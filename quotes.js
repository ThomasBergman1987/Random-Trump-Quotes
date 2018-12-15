'use strict';
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('index.html', (err, html) => {
    if(err) {
        throw err;
    }

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    });

    server.listen(port, hostname, () => {
        console.log('Server started on port ' + port);
    });
});

(function() {
    const cors_api_host = 'cors-anywhere.herokuapp.com';
    const cors_api_url = 'https://' + cors_api_host + '/';
    let slice = [].slice;
    const origin = window.location.protocol + '//' + window.location.host;
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
        const args = slice.call(arguments);
        const targetOrigin = /^https?:\/\/(^[\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin && targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.xml")}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP")}
    catch (error) {}

    throw new Error("Could not create HTTP request object")
}
const request = makeHttpObject();
request.open("GET", "https://theunboundedspirit.com/friedrich-nietzsche-quotes-on-love-morality-truth-god-religion-power-happiness/", true);
request.send(null);
request.onreadystatechange = function() {
    //if(request.readyState == 4)
    const website = request.responseText;
    let quotes = website.querySelectorAll('entry-content p');
    let quote = quotes[Math.floor(Math.random()*quotes.length)];
};

//const website = 'https://theunboundedspirit.com/friedrich-nietzsche-quotes-on-love-morality-truth-god-religion-power-happiness/';

/*function getQuote() {
    fetch(website)
        .then(function (response) {
            return response.html();
        })
        .then(function (data) {
            const quotes = data.querySelectorAll('entry-content p');
            console.log(quotes[Math.floor(Math.random()*quotes.length)]);
        })
        .catch(function () {
            console.log("An error has occurred");
        });
}*/
function displayQuote(quote) {
    const quoteText = document.querySelector('.quote-text');
    quoteText.textContent = quote;

    const tweetButton = document.querySelector('.tweet');
    `https://twitter.com/share?text=${quote}`
}
const newQuoteButton = document.querySelector('.new-quote');
newQuoteButton.addEventListener('click', getQuote);
getQuote();