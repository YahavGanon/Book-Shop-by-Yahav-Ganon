'use strict'

function onInit() {
    render(gBooks)
}

const tableHeader = `
<tr>
                <th>Title</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
</tr>`
const tableRow = (book) => `
<tr>
<td class='bookTitle'>${book.title}</td>
<td>${book.price}</td>
<td>${book.rating}</td>
<td><button onClick="onReadBook('${book.id}')">Read</button> <button onClick="onUpdateBook('${book.id}',${book.price})">Update</button> <button onClick="onRemoveBook(event, '${book.id}')">Delete</button></td>
</tr>
`

const card = (book) => `
<div class="card">
<div>${book.title}</div>
<div>${book.price}</div>
<div>${book.rating}</div>
<div><button onClick="onReadBook('${book.id}')">Read</button> <button onClick="onUpdateBook('${book.id}',${book.price})">Update</button> <button onClick="onRemoveBook(event, '${book.id}')">Delete</button></div>
</div>`
var isCard = false

function render(items) {
    const elBooks = document.querySelector('.book-shop')
    if (items.length === 0) {
        elBooks.innerHTML = `<h3 class ="noMatch">NO matching books were found...</h3>`
    } else {
        if (isCard) {
            const strHTML = items.map(card)
            elBooks.innerHTML = `<div class="cardParent">${strHTML.join(
                ''
            )}</div>`
            // elBooks.innerHTML = strHTML.join('')
        } else {
            const strHTML = items.map(tableRow)
            elBooks.innerHTML = `<table>${tableHeader}${strHTML.join(
                ''
            )}</table>`
        }
    }
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()
    removeBook(bookId)
    render(gBooks)
    updateStats()
    const elBookModal = document.querySelector('.deletion-modal')
    elBookModal.show()
    setTimeout(() => {
        elBookModal.close()
    }, 2000)
}

function onUpdateBook(bookId, prevPrice) {
    // const priceBook = +prompt('Enter the price of the book: ', gBooks[bookIdx].price)
    const priceBook = +prompt('Enter the price of the book: ', prevPrice)
    updatePrice(bookId, priceBook)
    render(gBooks)
    updateStats()
    const elPopModal = document.querySelector('.update-modal')
    elPopModal.show()
    setTimeout(() => {
        elPopModal.close()
    }, 2000)
}

function onAddBook() {
    const bookName = prompt('Enter the title of the Book: ')
    const bookPrice = +prompt('Enter the price of the book: ')
    const bookRating = +prompt('Enter the rating of the book: ')

    if (bookRating > 5 || bookRating < 1) return 
    if (!bookName || !bookPrice) return
    else {
        addBook(bookName, bookPrice, bookRating)
        render(gBooks)
        updateStats()
        const elPopModal = document.querySelector('.adding-modal')
        elPopModal.show()
        setTimeout(() => {
            elPopModal.close()
        }, 2000)
    }
}

function onReadBook(bookId) {
    const book = readBook(bookId)
    const elBookDetails = document.querySelector('.book-details')
    const elSpan = elBookDetails.querySelector('h2 span')
    const elPre = elBookDetails.querySelector('pre')
    elSpan.innerText = book.title
    elPre.innerText = JSON.stringify(book, null, 2)
    elBookDetails.style.backgroundImage = `url(${book.imgUrl})`
    elBookDetails.showModal()
}

function clearInput() {
    const elInput = document.querySelector('.addbuttonparent input')
    elInput.value = ''
    render(gBooks)
}

function onPageMode(elSelect) {
    const selectValue = elSelect.value
    if (selectValue === 'Cards') {
        isCard = true
        render(gBooks)
    } else {
        isCard = false
        render(gBooks)
    }
}
