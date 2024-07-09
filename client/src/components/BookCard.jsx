import Button from "./Button";
import { APIURL } from "../constants";

export default function BookCard({ className, book, updateData, isModalActive, setIsModalActive, setIsEditModeActive, setEditBook }) {
    
    const { _id, title, pages, author, genre, language, rating, format, readStatus } = book
    
    // Function to delete Book on Button click
    const deleteBook = async () => {
        try {
            const response = await fetch(APIURL + _id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = response.json()
            updateData()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <>

            <div className={className} id={_id} >
                <div className="text-center h-1/3 bg-primary w-full mb-2 rounded-t-lg pt-4">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="text-lg">{author !== '' ? author : 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 h-1/3 my-2 items-center justify-center">
                    <p className="p-2">Pages: <br /> <span className="font-semibold">{pages}</span></p>
                    <p className="p-2">Genre: <br /> <span className="font-semibold">{genre !== '' ? genre : 'N/A'}</span></p>
                    <p className="p-2">Language: <br /> <span className="font-semibold">{language !== '' ? language : 'N/A'}</span></p>
                    <p className="p-2">Format: <br /> <span className="font-semibold">{format}</span></p>
                </div>
                <div className="h-1/3 flex flex-col justify-center items-center">
                    <p>Did your read it: <span className="font-semibold"> {(readStatus ? '✓' : '✕')}</span></p>
                    <p>Your Rating: <span className="font-semibold">{rating}/5</span></p>
                </div>
                <Button className="absolute bottom-0 right-12 hover:scale-105" onClick={() => { deleteBook() }}><span className="material-symbols-outlined">delete</span></Button>
                <Button className="absolute bottom-0 right-3 hover:scale-105" 
                onClick={() => { 
                    setIsEditModeActive(true) 
                    setEditBook(book)
                    setIsModalActive(!isModalActive)
                    }}>
                    <span className="material-symbols-outlined">edit</span>
                </Button>
            </div>
        </>
    )
}