import {
	ClipboardDocumentCheckIcon,
	ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const CopyButton = ({ onClick, classes }) => {
	const [copy, setCopy] = useState("Copy Command");
	return (
		<button
			onClick={() => {
				setCopy("Copied Command");
				setTimeout(() => {
					setCopy("Copy Command");
				}, 1500);
				onClick();
			}}
			className={`${classes} group relative invisible content-bg-white group-hover/option:visible`}
		>
			<span
				data-copy={copy}
				className="group-hover:scale-100 inline transition-transform duration-300 origin-left left-full  mr-2  -translate-y-1/4 scale-0 bg-gray-600 px-1 text-sm text-gray-100 rounded-md absolute 
    before:content-[attr(data-copy)]
    "
			/>
			{copy === "Copy Command" ? (
				<ClipboardDocumentIcon className="h-5 w-5 self-center text-white active:text-lime-500" />
			) : (
				<ClipboardDocumentCheckIcon className="h-5 w-5 self-center text-lime-500" />
			)}
		</button>
	);
};

export default CopyButton;
