const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

let apiQuotes = [];

function showLoadingSpiner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpiner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    showLoadingSpiner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add("long-text");
    } else {
        quoteText.classList.remove("long-text");
    }
    quoteText.textContent = quote.text;
    hideLoadingSpiner();
}

async function getQuotes() {
    showLoadingSpiner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener("click", newQuote);

twitterBtn.addEventListener("click", tweetQuote);

getQuotes();