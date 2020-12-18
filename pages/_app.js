import "../styles/tailwind.css";

// swiper scss
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import "nprogress/nprogress.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		AOS.init({
			offset: 50,
		});
	}, []);

	return (
		<div>
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}

export default MyApp;
