'use strict'

function onInit() {
    render()
}

function render() {
//     const elTitle = document.querySelector('.book-shop thead tr')
//     const titleHTML = elTitle.map(title => `
// <tr>
//                 <th>Title</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//             </tr>
// `)
    const strHTML = gBooks.map(book => `
<tr>
<td class='bookTitle'>${book.title}</td>
<td>${book.price}</td>
<td><button onClick="onReadBook('${book.id}')">Read</button> <button onClick="onUpdateBook('${book.id}')">Update</button> <button onClick="onRemoveBook(event, '${book.id}')">Delete</button></td>
</tr>
`)
    const elBooks = document.querySelector('.book-shop')
    elBooks.innerHTML = strHTML.join('')
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()
    removeBook(bookId)
    render()
    updateStats()
    const elBookModal = document.querySelector('.deletion-modal')
    elBookModal.show()
    setTimeout(() => {
        elBookModal.close()
    }, 2000);
}

function onUpdateBook(bookId) {
    updatePrice(bookId)
    render()
    updateStats()
    const elPopModal = document.querySelector('.update-modal')
    elPopModal.show()
    setTimeout(() => {
        elPopModal.close()
    }, 2000);

}

function onAddBook() {
    const bookName = prompt('Enter the title of the Book: ')
    const bookPrice = +prompt('Enter the price of the book: ')
    if (!bookName || !bookPrice) return
    else {
        addBook(bookName, bookPrice)
        render()
        updateStats()
        const elPopModal = document.querySelector('.adding-modal')
        elPopModal.show()
        setTimeout(() => {
            elPopModal.close()
        }, 2000);
    }
}

function onReadBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    const book = readBook(bookId)
    const elBookDetails = document.querySelector('.book-details')
    const elSpan = elBookDetails.querySelector('h2 span')
    const elPre = elBookDetails.querySelector('pre')
    elSpan.innerText = book.title
    elPre.innerText = JSON.stringify(book, null, 2)
    elBookDetails.style.backgroundImage = `url(${gBooks[bookIdx].imgUrl})`;
    elBookDetails.showModal()
}

function clearInput() {
    const elInput = document.querySelector('.addbuttonparent input')
    elInput.value = ''
}

