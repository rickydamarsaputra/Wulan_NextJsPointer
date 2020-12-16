import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaCaretRight } from "react-icons/fa";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Modal from "../components/Modal";

SwiperCore.use([Navigation, Autoplay]);

export default function index({ posts, members }) {
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [member, setMember] = useState(null);
	const handelRedireactTo = () => {
		router.push("https://mi.dinamika.ac.id/");
	};

	const handleClickMember = (member) => {
		setOpenModal(true);
		setMember(member);
	};
	const closeModal = () => {
		setOpenModal(false);
	};

	return (
		<div className="w-4/5 mx-auto mt-24">
			{openModal && <Modal member={member} closeModal={closeModal} />}
			<Head>
				<title>D3 Sistem Informasi 2020</title>
			</Head>
			<div className="grid items-center lg:grid-cols-2 gap-3 lg:gap-0 pb-48">
				<div>
					<div className="text-2xl lg:text-5xl text-custom font-semibold">DIII Sistem Informasi Universitas Dinamika Surabaya</div>
					<div className="text-sm my-5">Sebuah Prodi yang berkembang dalam bidang Teknologi dan Infromasi untuk mewujudkan keinginan mahasiswa yang ingin meraih kualitas dalam memahami Ilmu Teknologi dan Informasi, juga Ilmu yang lebih tinggi.</div>
					<button onClick={handelRedireactTo} className="flex items-center text-white bg-custom transition-all duration-300 hover:bg-transparent hover:text-custom border-2 border-custom font-medium focus:outline-none rounded-sm capitalize py-1 px-4">
						see more
						<FaCaretRight className="text-xl" />
					</button>
				</div>
				<div className="order-first lg:order-none">
					<img src="/assets/img/team_work.svg" alt="team work ilustration" />
				</div>
			</div>
			<div className="grid items-center lg:grid-cols-3 gap-10 pb-32">
				<div className="flex items-center justify-center bg-gray-100 py-32">
					<img src="/assets/img/d3_logo.svg" alt="undika d3 logo" className="w-32" />
				</div>
				<div className="lg:col-span-2">
					<div className="text-2xl">Selamat datang di.</div>
					<div className="text-custom text-2xl mb-3">DIII Sistem Informasi</div>
					<div className="text-sm font-medium">“Sebuah prodi yang mengutamakan keahlian dalam bidang Teknologi dan Informasi yang menuntut mahasiswa berfikir kritis dan inovatif dalam mengahadapi perkembangan Teknologi.”</div>
				</div>
			</div>
			<div className="pb-32">
				<div className="text-custom text-xl capitalize mb-4">latest post</div>
				<div className="grid lg:grid-cols-3 gap-5">
					{posts.map((post) => (
						<div key={post.id}>
							<Link href="/posts/[id]" as={`/posts/${post.id}`}>
								<a>
									<img src={post.thumbnail.url} alt={post.title} className="mb-2 h-40 w-full shadow-lg rounded-sm object-cover cursor-pointer transition-all duration-300 transform hover:-translate-y-2" />
								</a>
							</Link>
							<Link href="/posts/[id]" as={`/posts/${post.id}`}>
								<a className="text-sm font-medium capitalize transition-all duration-300 text-gray-500 hover:text-gray-800">{post.title}</a>
							</Link>
						</div>
					))}
				</div>
				<div className="mt-4 flex justify-end">
					<Link href="/posts">
						<a className="flex items-center text-white bg-custom transition-all duration-300 hover:bg-transparent hover:text-custom border-2 border-custom font-medium focus:outline-none rounded-sm capitalize py-1 px-4">
							more post
							<FaCaretRight className="text-xl" />
						</a>
					</Link>
				</div>
			</div>
			<div className="grid lg:grid-cols-2 gap-5 lg:gap-0 items-center justify-between pb-32">
				<div></div>
				<div>
					{/* <Swiper autoplay spaceBetween={10} slidesPerView={3}>
						{members.map((member) => (
							<SwiperSlide key={member.id}>
								<img onClick={() => handleClickMember(member)} src={member.photo.url} alt={member.photo.name} className="cursor-pointer h-40 w-60 object-cover rounded-md" />
							</SwiperSlide>
						))}
					</Swiper> */}
					<img src="/assets/img/people.svg" alt="people" />
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const { API_URL } = process.env;
	const responsePosts = await axios.get(`${API_URL}/posts?_limit=6`);
	const responseMembers = await axios.get(`${API_URL}/members`);

	return {
		props: {
			posts: responsePosts.data,
			members: responseMembers.data,
		},
	};
}
