'use strict'
const BOOK_DB = 'bookDB'
var gBooks
getBooks()
function getBooks() {
    gBooks = loadFromStorage('bookDB')
    console.log('gBooks:', gBooks)
    if (!gBooks) {
        gBooks = [
            creatBook('RichDadPoorDad'),
            creatBook('TheSnowBall'),
            creatBook('TheSecret'),
        ]
        _savebooks()
    }
}

function creatBook(title) {
    return {
        id: makeId(),
        title,
        price: 120,
        imgUrl: 'img/richdadpoordad.png'
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
    const searchInput = document.querySelector('input[type="text"]').value.toLowerCase()
    console.log(searchInput)
    const rows = document.querySelectorAll(".book-shop tbody tr")
    // console.log(rows)
    // console.log(Array.from(rows))
    rows.forEach((row) => {
        const title = row.querySelector('.bookTitle').textContent.toLowerCase()
        if(title.includes(searchInput)){
            row.style.display = ''
        }else{
            row.style.display = "none"
        }
    })
}
    



