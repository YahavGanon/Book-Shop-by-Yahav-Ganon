'use strict'
var gBooks

function getBooks() {
    gBooks = [
        creatBook('RichDadPoorDad'),
        creatBook('TheSnowBall'),
        creatBook('TheSecret'),
    ]
    console.log(gBooks)
}
getBooks()

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
}

function updatePrice(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    const priceBook = +prompt('Enter the price of the book: ', gBooks[bookIdx].price)
    gBooks[bookIdx].price = priceBook
}

function addBook(title, price){
    const newBook = {
        id: makeId(),
        title,
        price: price,
        imgUrl: 'img/richdadpoordad.png'
    }
    gBooks.push(newBook)
}

function readBook(bookId){
    const book = gBooks.find(book => book.id === bookId)
    return book
}



