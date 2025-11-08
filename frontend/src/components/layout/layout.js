import './layout.css'

import Header from '../header/header';
import Container from '../container/container';
import Footer from '../footer/footer';

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <Container/>
            <Footer />
        </div>
    )
}



