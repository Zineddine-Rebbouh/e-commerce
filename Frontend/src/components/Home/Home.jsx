import React from 'react'
import Container from '../../layout/Container'
import Banner from '../Hero/Banner'
import BestDeals from './BestDeals'
import FeaturedProducts from './FeaturedProducts'

const Home = () => {

    return (
        <div className='p-8'>
            <Container>
                <div>
                    <Banner />
                    <BestDeals />
                    <FeaturedProducts />
                </div>
            </Container>
        </div>
    )
}

export default Home
