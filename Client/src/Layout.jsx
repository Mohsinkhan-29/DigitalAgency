import React from "react";
import Navbar from "./components/Static/Navbar/Navbar";
import Hero from "./components/Static/Hero/Hero";
import Footer from "./components/Static/Footer/Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Navbar />

            <Hero />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default Layout