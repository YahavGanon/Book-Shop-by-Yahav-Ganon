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
        _savebooks()
    }
    updateStats()
}

function creatBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title,
        price: price,
        imgUrl: imgUrl,
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
    _savebooks()
}

function updatePrice(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    const priceBook = +prompt('Enter the price of the book: ', gBooks[bookIdx].price)
    gBooks[bookIdx].price = priceBook
    _savebooks()
}

function addBook(title, price) {
    const newBook = {
        id: makeId(),
        title,
        price: price,
        imgUrl: 'img/richdadpoordad.png'
    }
    gBooks.push(newBook)
    _savebooks()
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function _savebooks() {
    saveToStorage(BOOK_DB, gBooks)
}

function filterByName() {
    const elH3 = document.querySelector('.book-shop h3')
    const searchInput = document.querySelector('input[type="text"]').value.toLowerCase()
    console.log(searchInput)
    const rows = document.querySelectorAll(".book-shop tbody tr")
    rows.forEach((row) => {
        const title = row.querySelector('.bookTitle').textContent.toLowerCase()
        if (title.includes(searchInput)) {
            row.style.display = ''
        } else {
            row.style.display = "none"
        }
    })
    if(rows.style.display === "none"){
        elH3.classList.remove('hidden')
    }
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






