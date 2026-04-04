import './searchresult.css'
export const SearchResult = ({ results, selecteduser }) => {
    const HandleSearch = (value) => {
        selecteduser(value)
        selectedid(value)
    }
    return (
        results.map(item => (
            <option className='result-item' 
            onClick={(e)=> HandleSearch(e.target.value)}
            value={item.name} key={item.id_user}>{item.name}</option>
        ))  
    )
}