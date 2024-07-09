import Chart from 'chart.js/auto'

export default function Overview({ allBooks }) {

    // Functions to calculate the Statistics

    // Calculates the Sum of an Property in an Array of Objects
    const calculateSum = (array, property) => {
        return array.reduce((total, obj) => {
            return total + parseInt(obj[property])
        }, 0)
    }

    // Gets how many times an Property occures in the Data
    // Poperty = String to filter Data
    // SearchTerms = Array with Strings of Terms you want the length of
    const getPropertyLength = (property, SearchTerms) => {
        
        const getSum = (searchTerm) => {
            const filteredBooks = allBooks.filter(book => book[property] === searchTerm)
            return filteredBooks.length
        }

        let counts = []
        
        for(const term of SearchTerms) {
            counts = [...counts, getSum(term)]
        }
        return counts
    }
    
    // Function to get the most Frequent Element from an Arry
    // Function takes an Array reduces it in an Object - a Key/Value Pair will be initilaized for every Item in the array - if it appears a second time it will add +1 to the count
    // The hashmap is an Object with the counts of the items - throught the .sort() method the highest counted Element will be returned
    // thx to Bilge Demirkaya for the great explanation - https://plainenglish.io/blog/how-to-find-the-most-frequent-element-in-an-array-in-javascript-c85119dc78d2
    const getMostFrequentElement = arr => {
        if(arr.length === 0) return
        const hashmap = arr.reduce((obj, arrayItem) => {
            obj[arrayItem] = (obj[arrayItem] || 0) + 1
            return obj
        }, {})
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
    }

    // Constants used by the Statistics and Graphs

    const readBooks = allBooks.filter((obj) => obj.readStatus === true)
    const unreadBooks = allBooks.filter((obj) => obj.readStatus === false)

    const sortedByPages = [...allBooks].sort((a, b) => a.pages - b.pages)

    const sumOfPages = calculateSum(allBooks, 'pages')
    const sumOfReadPages = calculateSum(readBooks, 'pages')
    const sumOfNotReadPages = calculateSum(unreadBooks, 'pages')
    const avgOfRatings = calculateSum(allBooks, 'rating') / allBooks.length

    const allLanguages = allBooks.map(book => book.language).filter(langugage => langugage)
    // Removed all Duplicates
    const nonDuplicatedLanguages = allLanguages.filter((item, index) => allLanguages.indexOf(item) === index)
    const languageCounts = getPropertyLength('language', nonDuplicatedLanguages)
    const mostFrequentLanguage = getMostFrequentElement(allLanguages)

    const allGenres = allBooks.map(book => book.genre).filter(genre => genre)
    // Removed all Duplicates
    const nonDuplicatedGenres = allGenres.filter((item, index) => allGenres.indexOf(item) === index)
    const genreCounts = getPropertyLength('genre', nonDuplicatedGenres)
    const mostFrequentGenre = getMostFrequentElement(allGenres)

    const authors = allBooks.map(book => book.author).filter(author => author)
    const mostFrequentAuthor = getMostFrequentElement(authors)

    // Function to render all Graphs
    const renderGraphs = () => {
        const pieGraph = document.querySelector('#pieGraph')
        const barGraph = document.querySelector('#barGraph')
        const genreGraph = document.querySelector('#genreGraph')
        const languageGraph = document.querySelector('#languageGraph')

        // Pages Graph
        new Chart(pieGraph, {
            type: 'pie',
            data: {
                labels: ['Read', 'not read'],
                datasets: [{
                    label: '# of Pages',
                    data:[sumOfReadPages, sumOfNotReadPages],
                    borderWidth: 1
                }]
            }
        });
        
        // Books Bar Graph
        new Chart(barGraph, {
            type: 'bar',
            data: {
                labels: sortedByPages.map(book => book.title),
                datasets: [{
                    label: 'Pages',
                    data: sortedByPages.map(book => book.pages),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

        // Genre Graph
        new Chart(genreGraph, {
            type: 'bar',
            data: {
                labels: nonDuplicatedGenres.map(genre => genre),
                datasets: [{
                    label: 'Genre',
                    data: genreCounts.map(count => count),
                    borderWidth: 1,
                    backgroundColor: 'rgba(255,99,132, 0.6)'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

        // Language Doughnut Graph
        new Chart(languageGraph, {
            type: 'doughnut',
            data: {
                labels: nonDuplicatedLanguages.map(language => language),
                datasets: [{
                    label: "Language",
                    data: languageCounts.map(count => count),
                    borderWidth: 1,
                }]
            }
        })
    }
    
    // Timeout set to render the HTML Elements first before rendering Graphs
    setTimeout(renderGraphs, 100)

    return (
        <>
        { allBooks.length === 0 
        ? <div className='absolute top top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-5 rounded-lg text-xl'>Enter a book in your Library to see the Statistics.</div>
        : (
            <>
                <div className="w-full h-full min-h-[20rem] flex flex-col items-center justify-center">
                    <h3 className="text-center text-2xl">Overview List</h3>
                    <table className="w-full border-accent border-2 max-w-[90%]">
                        <thead className="bg-secondary flex">
                        <tr className="flex w-full">
                            <th className="w-1/4">Title</th>
                            <th className="w-1/4">Pages</th>
                            <th className="w-1/4">Read?</th>
                            <th className="w-1/4">Rating</th>
                        </tr>
                        </thead>
                        <tbody className="text-center bg-primary [&>*:nth-child(even)]:bg-secondary overflow-y-scroll overflow-x-hidden max-h-[15rem] block">
                        {allBooks.map((book, index) => {
                            const { title, pages, readStatus, rating } = book
                            return (
                                <tr key={index} className="grid grid-cols-4 items-center min-h-[2rem]">
                                    <td className="w-full">{title}</td>
                                    <td className="w-full">{pages}</td>
                                    <td className="w-full">{(readStatus ? '✓' : '✕')}</td>
                                    <td className="w-full">{rating}/5</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="h-[70%] min-h-[20rem] w-full flex flex-col">
                    <h3 className="text-center text-2xl">Statistics</h3>
                    <div className="bg-secondary h-full w-full grid grid-cols-4 items-center p-10">
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Books in Library:</p>
                            <span className="font-bold capitalize text-center">{allBooks.length}</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Total Pages:</p>
                            <span className="font-bold capitalize text-center">{sumOfPages}</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Average Rating:</p>
                            <span className="font-bold capitalize text-center">{(avgOfRatings === 5 || avgOfRatings === 1 ? avgOfRatings : avgOfRatings.toFixed(2))}/5</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Read Books:</p>
                            <span className="font-bold capitalize text-center">{`${readBooks.length}/${allBooks.length}`}</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Book with the most Pages:</p>
                            <span className="font-bold capitalize text-center">{sortedByPages[sortedByPages.length - 1].title}</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Your most popular genre:</p>
                            <span className="font-bold capitalize text-center">{allGenres.length === 0 ? 'N/A' : mostFrequentGenre}</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Your most popular language:</p>
                            <span className="font-bold capitalize text-center">{allLanguages.length === 0 ? 'N/A' : mostFrequentLanguage}</span>
                        </div>
                        <div className='flex flex-col h-full'>
                            <p className='mb-5'>Your most popular Author:</p>
                            <span className="font-bold capitalize text-center">{authors.length === 0 ? 'N/A' : mostFrequentAuthor}</span>
                        </div>

                    </div>
                </div>
                <div className="col-span-2 flex flex-col h-full">
                    <h3 className='text-center text-2xl'>Graphs</h3>
                    <div className='grid grid-cols-2 items-center'>
                        <div className='w-full h-1/2 text-center items-center flex flex-col'>
                            <h3 className='font-bold text-2xl'>Pages</h3>
                            <h3 className='font-bold text-xl mb-4'>have read/have not read</h3>
                            <canvas id='pieGraph'></canvas>
                        </div>
                        <div className='h-full w-full text-center items-center flex flex-col'>
                            <h3 className='font-bold text-xl mb-4'>Books by Pages</h3>
                            <canvas id='barGraph'></canvas>
                        </div>
                        <div className='h-full w-full text-center items-center flex flex-col'>
                            <h3 className='font-bold text-xl mb-4'>Genres</h3>
                            {nonDuplicatedGenres.length === 0 ? <div>No Genres entered</div> : <canvas id='genreGraph'></canvas>}
                        </div>
                        <div className='h-[90%] w-full text-center items-center flex flex-col'>
                            <h3 className='font-bold text-xl mb-4'>Languages</h3>
                            {nonDuplicatedLanguages.length === 0 ? <div>No Languages entered</div> : <canvas id='languageGraph'></canvas>}
                        </div>
                    </div>
                </div>
                <div className='h-40'></div>
            </>
        )
        }
        </>
    )
}