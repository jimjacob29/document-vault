import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {LayoutDashboard, FileText, Upload, Settings, Menu} from 'lucide-react';
import {clsx} from 'clsx';

const Layout = ({children}) => {
	const router = useRouter();
	const [user, setUser] = useState(null);

	const navItems = [
		{name: 'Documents', href: '/', icon: FileText},
		{name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard},
	];

	useEffect(() => {
		fetch('/api/user')
			.then(res => res.json())
			.then(data => setUser(data))
			.catch(err => console.error('Failed to load user', err));
	}, []);
	return (
		<div className="flex h-screen bg-background text-foreground overflow-hidden">
			<aside className="w-64 border-r border-zinc-800  hidden md:flex flex-col bg-black/50 ">
				<div className="p-6">
					<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						DocVault
					</h1>
				</div>

				<nav className="flex-1 px-4 space-y-1">
					{navItems?.map(item => {
						const isActive = router?.pathname === item?.href;
						return (
							<Link
								key={item?.name}
								href={item?.href}
								className={clsx(
									'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
									isActive
										? 'bg-blue-100/50 text-blue-700  '
										: 'text-gray-300 hover:bg-zinc-800  ',
								)}>
								<item.icon className="w-5 h-5 mr-3" />
								{item?.name}
							</Link>
						);
					})}
				</nav>

				<div className="p-4 border-t border-zinc-800 ">
					<div className="flex items-center p-2 rounded-lg bg-zinc-900 ">
						<div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
							{user?.initials || ''}
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-200">
								{user?.name || ''}
							</p>
							<p className="text-xs text-gray-400">{user?.role || ''}</p>
						</div>
					</div>
				</div>
			</aside>

			<main className="flex-1 flex flex-col min-w-0 overflow-hidden">
				<header className="md:hidden border-b border-zinc-800  p-4 flex items-center justify-between">
					<h1 className="text-lg font-bold">DocVault</h1>
					<button className="p-2 -mr-2">
						<Menu className="w-6 h-6" />
					</button>
				</header>

				<div className="flex-1 overflow-auto p-4 md:p-8 relative">
					<div className="max-w-6xl mx-auto w-full">{children}</div>
				</div>
			</main>
		</div>
	);
};

export default Layout;
