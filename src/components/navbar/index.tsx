import React, { useState } from 'react';
import { LogOut, Moon, Monitor, Sun, UserIcon, User2Icon } from 'lucide-react';
import Dropdown from '@/components/dropdown';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeOption, User } from '@/utils/interface';
import { themeOptions } from '@/utils/theme';
import DropdownItem from '../dropdown-item';
import Button from '../button';
import Heading from '../heading';
import Modal from '../modal';
import TextInput from '../text-input';

const initialFormData: Omit<User, 'id'> = { name: '', username: '', phone: '', email: '' };

const Navbar: React.FC = () => {
	const { user, updateUser, logout } = useAuth();
	const { theme, changeTheme } = useTheme();
	const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
	const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [formData, setFormData] = useState<Omit<User, 'id'>>(initialFormData);

	const handleThemeChange = (newTheme: ThemeOption['value']): void => {
		changeTheme(newTheme);
		setIsThemeDropdownOpen(false);
	};

	const handleLogout = (): void => {
		if (confirm('Apakah Anda yakin ingin keluar?')) {
			logout();
			setIsUserDropdownOpen(false);
		}
	};

	const openModal = (): void => {
		setFormData(user!);
		setIsModalOpen(true);
	};

	const closeModal = (): void => {
		setIsModalOpen(false);
		setFormData(initialFormData);
	};

	const handleSaveData = (data: Omit<User, 'id'>): void => {
		updateUser(data);
		closeModal();
	};

	return (
		<>
			<nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<Heading level={2}>{import.meta.env.VITE_APP_NAME}</Heading>
						</div>

						<div className="flex items-center space-x-4">
							<Dropdown
								trigger={
									<Button variant="text" onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)} className="p-2">
										{theme === 'dark' ? <Moon size={20} /> : theme === 'light' ? <Sun size={20} /> : <Monitor size={20} />}
									</Button>
								}
								isOpen={isThemeDropdownOpen}
								onClose={() => setIsThemeDropdownOpen(false)}
							>
								<div className="py-1">
									{themeOptions.map((option) => (
										<DropdownItem key={option.value} icon={option.icon} label={option.label} active={theme === option.value} onClick={() => handleThemeChange(option.value)} />
									))}
								</div>
							</Dropdown>

							<Dropdown
								trigger={
									<Button variant="text" icon={UserIcon} onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
										<span className="hidden sm:block">{user?.name}</span>
									</Button>
								}
								isOpen={isUserDropdownOpen}
								onClose={() => setIsUserDropdownOpen(false)}
							>
								<div className="py-1">
									<DropdownItem disabled label={user?.name!} className="sm:hidden" />
									<DropdownItem icon={User2Icon} label="Edit Profile" onClick={() => openModal()} />
									<DropdownItem variant="danger" icon={LogOut} label="Logout" onClick={handleLogout} />
								</div>
							</Dropdown>
						</div>
					</div>
				</div>
			</nav>

			{!isModalOpen ? null : (
				<Modal title="Edit Profile" data={formData} onChange={(updated) => setFormData(updated)} onSave={handleSaveData} onClose={closeModal}>
					{(formData, handleChange) => (
						<>
							<TextInput label="Name" name="name" value={formData.name} onChange={(value) => handleChange('name', value)} required />
						</>
					)}
				</Modal>
			)}
		</>
	);
};

export default Navbar;
