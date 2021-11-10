const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitterButton');
const newQuote = document.getElementById('newQuote');
const loader = document.getElementById('loader');

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading spinner
function complete(){
    if(!loader.hidden) {
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
// Get Quote From API
async function getQuote(){
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        /* If author name field is empty, */
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';

        }else{
            authorText.innerText = data.quoteAuthor;
        }
        console.log(data);
        /* If quotes are lengthy, */
        if(data.quoteText.length > 100){
            quoteText.classList.add('longQuote');
        }else{
            quoteText.classList.remove('longQuote');
        }
        quoteText.innerText = `"${data.quoteText}"`;
        //console.log(authorText);
        //console.log(data.quoteText);
        /* Stop loader and show quote */
        complete();
    } catch (error) {
        getQuote();
        //console.log('No quotes',error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; 
    window.open(twitterUrl,'_blank');
}

/* Event Listeners */
newQuote.addEventListener('click',getQuote);
twitterButton.addEventListener('click',tweetQuote);


// On Load
getQuote();
