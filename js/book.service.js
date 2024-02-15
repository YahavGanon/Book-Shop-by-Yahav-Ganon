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




