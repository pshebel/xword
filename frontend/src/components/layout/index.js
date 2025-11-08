import './layout.css'

import Header from '../header';
import Container from '../container';
import Footer from '../footer';
import Status from '../status';

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <Status />
            <Container/>
            <Footer />
        </div>
    )
}



