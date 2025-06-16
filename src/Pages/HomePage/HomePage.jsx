import Banner from '../../Components/Banner/Banner';
import Fastorder from '../../Components/FastOrder/Fastorder';
import FindUs from '../../Components/FindUs/FindUs';
import TopSellingFood from '../../Components/TopSellingFood/TopSellingFood';

const HomePage = () => {

    return (
        <section>
            <Banner></Banner>
            <TopSellingFood></TopSellingFood>
            <Fastorder></Fastorder>
            <FindUs></FindUs>
        </section>
    );
};

export default HomePage;