import { FaCross } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

export default function Modal({ member, closeModal }) {
	return (
		<div className="flex items-center justify-center fixed left-0 right-0 top-0 bottom-0 w-screen h-screen z-50 bg-black bg-opacity-50">
			<div className="pointer__modal__box bg-white relative rounded-md">
				<div className="flex justify-center mt-4">
					<img src={member.photo.url} alt={member.photo.name} className="hidden lg:block w-52 h-60 object-cover shadow-md rounded-md" />
				</div>
				<div className="w-4/5 mx-auto mt-4 overflow-auto">
					<div className="text-2xl text-center mb-2">{member.name}</div>
					<article className="prose max-w-none">
						<ReactMarkdown>{member.description}</ReactMarkdown>
					</article>
				</div>
				<button onClick={closeModal} className="focus:outline-none absolute -right-3 -top-3 flex items-center justify-center bg-red-600 w-8 h-8 rounded-full text-white">
					<FaCross />
				</button>
			</div>
		</div>
	);
}
