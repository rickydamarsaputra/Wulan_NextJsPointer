import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import Head from "next/head";

export default function posts({ posts }) {
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
		</div>
	);
}

export async function getStaticProps() {
	const { API_URL } = process.env;
	const { data } = await axios.get(`${API_URL}/posts?_sort=createdAt:DESC`);

	return {
		props: {
			posts: data,
		},
		revalidate: 1,
	};
}
