import axios from "axios";
import Head from "next/head";

export default function postDetail({ post }) {
	console.log(post);
	return (
		<div>
			<Head>
				<title>{post.title}</title>
			</Head>
			<div>Post Detail</div>
			<div>
				<img src={post.thumbnail.url} alt="" />
			</div>
		</div>
	);
}

export async function getServerSideProps({ params }) {
	const { API_URL } = process.env;
	const { data } = await axios.get(`${API_URL}/posts/${params.id}`);
	return {
		props: {
			post: data,
		},
	};
}
