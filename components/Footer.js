import moment from "moment";
import "moment/locale/id";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
	return (
		<div className="bg-gray-100 py-5">
			<div className="w-4/5 mx-auto flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="text-sm font-medium capitalize">&copy; {moment().format("y")} d3 sistem informasi 2020 create with</div>
					<FaHeart className="text-red-500" />
				</div>
				<div>
					<img src="/assets/img/d3_logo.svg" alt="d3 si logo" className="w-10" />
				</div>
			</div>
		</div>
	);
}
