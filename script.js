const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];
function loading() {

    loader.hidden = false
    quoteContainer.hidden = true
}
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true

}

function newQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    setTimeout(complete, 1000)
}
function newQuoteLocal() {
    loading()
    const quote = localQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote)
    complete()
}
// Get quotes from API
async function getQuotes() {
    loading()

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
        setTimeout(complete, 3000)
    } catch (error) {

    }
}
// Tweet 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


//On load
getQuotes();
//newQuoteLocal()