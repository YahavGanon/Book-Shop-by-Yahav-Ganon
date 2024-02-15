'use strict'

function onInit() {
    render()
}

function render() {
    const strHTML = gBooks.map(book => `
<tr>
<td>${book.title}</td>
<td>${book.price}</td>
<td><button>Read</button> <button>Update</button> <button>Delete</button></td>
</tr>
`)
const elBooks = document.querySelector ('.book-shop')
elBooks.innerHTML = strHTML.join('')
}
