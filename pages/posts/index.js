import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

export default function posts({ posts, page, count }) {
	const router = useRouter();
	const lastPage = Math.ceil(count / 6);

	const handlePrev = () => {
		router.push(`/posts?page=${Number(page) - 1}`);
		console.log("prev");
	};

	const handleNext = () => {
		router.push(`/posts?page=${Number(page) + 1}`);
		console.log("next");
	};

	return (
		<div className="w-4/5 mx-auto py-20">
			<Head>
				<title>D3 Sistem Informasi 2020 | Posts</title>
			</Head>
			<div className="grid lg:grid-cols-3 gap-5">
				{posts.map((post) => (
					<div key={post.id}>
						<Link href="/posts/[id]" as={`/posts/${post.id}`}>
							<a>
								<img src={post.thumbnail.url} alt={post.thumbnail.name} className="w-full h-40 mb-2 object-cover rounded-sm shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105" />
							</a>
						</Link>
						<div>{post.title}</div>
						<div className="text-xs text-gray-700 font-medium">published on {moment(post.createdAt).format("D MMMM y")}</div>
					</div>
				))}
			</div>
			<div className="flex justify-between mt-8">
				<button onClick={handlePrev} disabled={page <= 1} className="flex items-center text-white bg-custom transition-all duration-300 hover:bg-transparent hover:text-custom border-2 border-custom font-medium focus:outline-none rounded-sm capitalize py-1 px-4">
					previous
				</button>
				<button onClick={handleNext} disabled={page >= lastPage} className="flex items-center text-white bg-custom transition-all duration-300 hover:bg-transparent hover:text-custom border-2 border-custom font-medium focus:outline-none rounded-sm capitalize py-1 px-4">
					next
				</button>
			</div>
		</div>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const { API_URL } = process.env;
	const start = page === 1 ? 0 : (page - 1) * 6;
	const { data } = await axios.get(`${API_URL}/posts?_limit=6&_start=${start}&_sort=createdAt:DESC`);
	const postCount = await axios.get(`${API_URL}/posts/count`);
	console.log({ page, start, postCount: postCount.data });

	return {
		props: {
			posts: data,
			page,
			count: postCount.data,
		},
	};
}
