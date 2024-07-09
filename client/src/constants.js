export class Book {
    constructor(title, pages, rating, author, genre, language, haveRead, format) {
        this.title = title,
        this.pages = pages,
        this.rating = rating,
        this.author = author,
        this.genre = genre,
        this.language = language,
        this.readStatus = haveRead,
        this.format = format
    }
}

export const APIURL = 'https://book-hive-server-three.vercel.app/';
