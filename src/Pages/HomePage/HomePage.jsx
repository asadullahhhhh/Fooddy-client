import Banner from '../../Components/Banner/Banner';
import Fastorder from '../../Components/FastOrder/Fastorder';
import TopSellingFood from '../../Components/TopSellingFood/TopSellingFood';

const HomePage = () => {

    return (
        <section>
            <Banner></Banner>
            <TopSellingFood></TopSellingFood>
            <Fastorder></Fastorder>
        </section>
    );
};

export default HomePage;