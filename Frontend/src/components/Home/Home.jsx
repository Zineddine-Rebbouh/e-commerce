import React, { useEffect } from 'react'
import Container from '../../layout/Container'
import Banner from '../Hero/Banner'
import BestDeals from './BestDeals'
import FeaturedProducts from './FeaturedProducts'
import EventCard from '../Events/EventCard'
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../../redux/actions/product'

const Home = () => {

    return (
        <div className='p-8'>
            <Container>
                <div>
                    <Banner />
                    <BestDeals />
                    <EventCard />
                    <FeaturedProducts />
                </div>
            </Container>
        </div>
    )
}

export default Home
