'use strict'
const BOOK_DB = 'bookDB'
var gBooks
getBooks()
function getBooks() {
    gBooks = loadFromStorage('bookDB')
    console.log('gBooks:', gBooks)
    if (!gBooks) {
        gBooks = [
            creatBook('Rich Dad Poor Dad', 70, 'img/richdadpoordad.png'),
            creatBook('The Snow Ball', 120, 'img/snowball.png'),
            creatBook('The Secret', 225, 'img/thesecret.webp'),
        ]
        _saveBooks()
    }
    updateStats()
}

function creatBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title,
        price: price,
        imgUrl: imgUrl,
        rating: getRandomIntInclusive(1, 5)
    }
}

function makeId(length = 5) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooks()
}

function updatePrice(bookId, priceBook) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks[bookIdx].price = priceBook
    _saveBooks()
}

function addBook(title, price, rating) {
    const newBook = {
        id: makeId(),
        title,
        price: price,
        imgUrl: 'img/starsChangingColors.gif',
        rating: rating,

    }
    gBooks.push(newBook)
    _saveBooks()
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function _saveBooks() {
    saveToStorage(BOOK_DB, gBooks)
}

function filterByName() {
    const searchInput = document.querySelector('input[type="text"]').value.toLowerCase()
    const filteredItems = gBooks.filter((book) => {
        return book.title.toLowerCase().includes(searchInput)
    })
    render(filteredItems)
}


function updateStats() {
    const counterStats = [0, 0, 0];
    const elExpensive = document.querySelector('.expensive')
    const elAverage = document.querySelector('.average')
    const elCheap = document.querySelector('.cheap')

    gBooks.forEach((book) => {
        if (book.price < 80) {
            counterStats[2]++; // Cheap
        } else if (book.price >= 80 && book.price <= 200) {
            counterStats[1]++; // Average
        } else {
            counterStats[0]++; // Expensive
        }
    });

    elExpensive.innerText = counterStats[0];
    elAverage.innerText = counterStats[1];
    elCheap.innerText = counterStats[2];
}






