import {
    FaSearch
} from "react-icons/fa"

export default function SearchBar({
    search, setSearch
}){
    return(
        <div className="search-Bar">
            <FaSearch className="search-icon" />

            <input
            type="text"
            placeholder="buscar Producto..."
            value={search}
            onChangr={(e) => segtSearch(e.target.value)}
            />

        </div>
    );
}