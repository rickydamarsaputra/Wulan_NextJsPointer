import axios from "axios";
import moment from "moment";
import "moment/locale/id";

import Head from "next/head";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player/file";

export default function postDetail({ post }) {
	const isVideo = post.media.provider_metadata.resource_type != "video" ? false : true;
	console.log(post.media);
	return (
		<div className="w-4/5 mx-auto">
			<Head>
				<title>D3 Sistem Informasi 2020 | {post.title}</title>
			</Head>
			<div className="mb-4">
				<div className="font-sans capitalize text-center mb-5">
					<div className="text-4xl font-medium mb-2">{post.title}</div>
					<div className="text-sm text-gray-500">published on {moment(post.createdAt).format("D MMMM y")}</div>
				</div>
				{isVideo ? <ReactPlayer url={post.media.url} controls={true} className="pointer__video__player shadow-md" /> : <img src={post.media.url} alt={post.media.name} className="rounded-md shadow-md" />}
			</div>
			<article className="prose max-w-none mb-24">
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</article>
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
