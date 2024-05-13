import {useParams} from "react-router-dom";
import {useSearchRestaurant} from "@/api/RestaurantApi.tsx";
import SearchResultInfo from "@/components/SearchResultInfo.tsx";
import SearchResultCard from "@/components/SearchResultCard.tsx";
import {useState} from "react";
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import PaginationSelector from "@/components/PaginationSelector.tsx";
import {CuisineFilter} from "@/components/CuisineFilter.tsx";
import SortOptionDropdown from "@/components/SortOptionDropdown.tsx";



export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisine: string[];
    sortOptions: string;
}

const SearchPage = () => {

    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisine: [],
        sortOptions: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const {
        results,
        isLoading
    } = useSearchRestaurant(searchState, city);


    const setSortOptions = (sortOptions: string) => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            sortOptions,
            page: 1,
        }))
    }

    const setSelectedCuisines = (selectedCuisine: string[]) => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            selectedCuisine,
            page: 1,
        }));
    }

    const setPage = (page: number) => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            page,
        }));
    }

    const updateSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState: SearchState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    }

    if (!results?.data || !city) {
        return <span>No restaurant found with {city}</span>
    }
    if (isLoading) {
        return <span>Loading...</span>
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    onChange={setSelectedCuisines}
                    selectedCuisines={searchState.selectedCuisine}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevState) => !prevState)}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={updateSearchQuery}
                    placeHolder={`Search by cuisine or Restaurant Nmae`}
                    onReset={resetSearch}
                />
                <div className={`flex flex-col justify-between md:pr-16 gap-3 md:flex-row`}>
                    <SearchResultInfo total={results.pagination.total} city={city}/>
                    <SortOptionDropdown
                        onChange={(value) => setSortOptions(value)}
                        sortOptions={searchState.sortOptions}
                    />
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultCard key={restaurant._id} restaurant={restaurant}/>
                ))}
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default SearchPage;
