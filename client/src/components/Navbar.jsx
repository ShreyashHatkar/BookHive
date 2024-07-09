export default function Navbar({ className, isLibraryActive, setIsLibraryActive }) {

    const toggleActiveState = e => {
        const navLinks = document.querySelectorAll('nav div')
        navLinks.forEach(link => {
            link.classList.remove('active')
        })

        const target = e.currentTarget
        target.classList.add('active')
        setIsLibraryActive(!isLibraryActive)
    }

    return (
        <>
            <nav className={className}>
                <div className="active mx-2 text-2xl p-2 rounded-lg cursor-pointer hover:bg-primary" onClick={(e) => { toggleActiveState(e) }} id="library">Library</div>
                <div className="mx-2 text-2xl p-2 rounded-lg cursor-pointer hover:bg-primary" onClick={(e) => { toggleActiveState(e) }} id="overview">Overview</div>
            </nav>
        </>
    )
}