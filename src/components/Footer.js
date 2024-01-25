import { Github, Twitter } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="p-4 bg-neutral">
			<div className="bg-neutral text-neutral-content container mx-auto flex justify-between">
				<div>
					<div className="indicator">
						<span className="indicator-item badge badge-accent font-bold">v1.5.0</span>
						<img src="logo.svg" alt="Logo" className="w-14 h-14" />
					</div>

					<p>Providing reliable tech since 2023</p>
				</div>
				<div>
					<h4 className="uppercase font-bold mb-2 opacity-50">Social</h4>
					<div className="grid grid-flow-col gap-4">
						<a href="https://github.com/Mykola-Dzoban" target="_blank" rel="noreferrer" className="btn btn-ghost">
							<Github />
						</a>
						<a href="https://twitter.com/gushidomo" target="_blank" rel="noreferrer" className="btn btn-ghost">
							<Twitter />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
