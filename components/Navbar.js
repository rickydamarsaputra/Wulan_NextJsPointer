import Link from "next/link";

export default function Navbar() {
	return (
		<header className="py-5">
			<div className="w-4/5 mx-auto flex items-center justify-between">
				<Link href="/">
					<a>
						<img src="/assets/img/d3_logo.svg" alt="d3 undika logo" className="w-16" />
					</a>
				</Link>
				<div className="flex space-x-5">
					<Link href="/">
						<a className="uppercase font-semibold text-custom">home</a>
					</Link>
					<Link href="/posts">
						<a className="uppercase font-semibold text-custom">posts</a>
					</Link>
				</div>
			</div>
		</header>
	);
}
