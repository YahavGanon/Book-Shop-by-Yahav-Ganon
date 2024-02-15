'use strict'

function onInit() {
    render()
}

function render() {
    const strHTML = gBooks.map(book => `
<tr>
<td>${book.title}</td>
<td>${book.price}</td>
<td><button onClick="onReadBook('${book.id}')">Read</button> <button onClick="onUpdateBook('${book.id}')">Update</button> <button onClick="onRemoveBook('${book.id}')">Delete</button></td>
</tr>
`)
    const elBooks = document.querySelector('.book-shop')
    elBooks.innerHTML = strHTML.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId) {
    updatePrice(bookId)
    render()
}

function onAddBook() {
    const bookName = prompt('Enter the title of the Book: ')
    const bookPrice = +prompt('Enter the price of the book: ')
    addBook(bookName, bookPrice)
    render()
}

function onReadBook(bookId) {
    const book = readBook(bookId)
    const elBookDetails = document.querySelector('.book-details')
    const elSpan = elBookDetails.querySelector('h2 span')
    const elPre = elBookDetails.querySelector('pre')
    elSpan.innerText = book.title
    elPre.innerText = JSON.stringify(book, null, 2)
    elBookDetails.showModal()
}



