import Search from "./Search";


const Header = ({searchTerm, setSearchTerm}) => {
    return (
        <header>
            <img src="./hero.png" alt="hero banner" />
            <h1>
                Find <span className="text-gradient">Movies</span> You'll Enjoy
                Without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
    );
};

export default Header;
