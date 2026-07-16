import React, { useState } from 'react';
import { accountsApi } from '../../api/endpoints/accounts';
import toast from 'react-hot-toast';
import { MdLock, MdCheckCircle } from 'react-icons/md';

export default function Settings() {
    const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '', confirm_password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordData.new_password !== passwordData.confirm_password) {
            return toast.error('New passwords do not match.');
        }

        setLoading(true);
        const toastId = toast.loading('Changing password...');

        try {
            await accountsApi.changePassword(passwordData);
            toast.success('Password changed successfully!', { id: toastId });
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="font-oswald text-2xl font-bold text-[#ffe088] mb-6 flex items-center gap-2">
                <MdLock /> Change Password
            </h2>

            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block text-white/70 text-sm mb-1">Current Password</label>
                    <input
                        type="password"
                        name="old_password"
                        value={passwordData.old_password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#ffe088]"
                    />
                </div>
                <div>
                    <label className="block text-white/70 text-sm mb-1">New Password</label>
                    <input
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#ffe088]"
                    />
                </div>
                <div>
                    <label className="block text-white/70 text-sm mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        value={passwordData.confirm_password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#ffe088]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 px-6 py-2 bg-[#ffe088] text-[#570013] font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {loading ? 'Updating...' : <><MdCheckCircle /> Update Password</>}
                </button>
            </form>
        </div>
    );
}
