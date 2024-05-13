import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";
const HomePage = () => {

    const navigate = useNavigate();

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }




    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-3xl font-bold tracking-tight text-blue-500">Tuck into a takeaway today</h1>
                <span className="text-xl">Food is just a click away</span>
                <SearchBar
                    onReset={() => {}}
                    onSubmit={handleSearchSubmit}
                    placeHolder={`Search by City or Town`}/>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} alt="landingPage"/>
                <div className="flex flex-col item-center justify-center gap-4 text-center">
                    <span className="text-xl font-bold tracking-tighter">
                        Also you can use our app to order
                    </span>
                    <span>
                        Download our app for fast ordering and personalized recommendations
                    </span>

                    <img src={appDownloadImage} alt="appDownloadImage"/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;