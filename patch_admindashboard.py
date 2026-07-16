with open("Frontend/src/pages/AdminDashboard.jsx", "r") as f:
    content = f.read()

# Replace the "Other Tabs Placeholder" block
target_block = """                    {/* ── Other Tabs Placeholder ── */}
                    {activeTab === 'settings' && (
                        <div className="animate-fade-in-up">
                            <Settings />
                        </div>
                    )}

                    {!['dashboard', 'parishioners', 'settings'].includes(activeTab) && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                            <div className="w-24 h-24 rounded-full bg-[#570013]/20 flex items-center justify-center mb-6">
                                <DynamicIcon name={sidebarItems.find(s => s.id === activeTab)?.icon || 'construction'} className="text-[#ffe088] text-5xl" />
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-gray-900 mb-2">
                                {sidebarItems.find(s => s.id === activeTab)?.label}
                            </h3>
                            <p className="text-gray-900/40 font-sans tracking-wide">This module is being built</p>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className="mt-6 btn-primary bg-[#ffe088] text-[#40000b] px-6 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-wide"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    )}"""

replacement = """                    {/* ── Other Tabs Placeholder ── */}
                    {activeTab === 'settings' && (
                        <div className="animate-fade-in-up">
                            <Settings />
                        </div>
                    )}

                    {!['dashboard', 'parishioners', 'settings', 'profile'].includes(activeTab) && (
                        <GenericDataView 
                            type={activeTab} 
                            title={sidebarItems.find(s => s.id === activeTab)?.label} 
                            subtitle={`Manage ${sidebarItems.find(s => s.id === activeTab)?.label.toLowerCase()} entries`} 
                            icon={sidebarItems.find(s => s.id === activeTab)?.icon || 'list'}
                        />
                    )}

                    {activeTab === 'profile' && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in-up">
                            <div className="w-24 h-24 rounded-full bg-[#570013] flex items-center justify-center mb-6 shadow-xl border-4 border-[#ffe088]">
                                <DynamicIcon name="person" className="text-white text-5xl" />
                            </div>
                            <h3 className="font-sans font-bold text-2xl text-gray-900 mb-2">My Profile</h3>
                            <p className="text-gray-900/50 font-sans">Name: {user?.first_name} {user?.last_name || user?.username}</p>
                            <p className="text-gray-900/50 font-sans">Email: {user?.email}</p>
                            <p className="text-gray-900/50 font-sans">Role: Administrator</p>
                        </div>
                    )}"""

if target_block in content:
    content = content.replace(target_block, replacement)
    
    # Needs GenericDataView imported
    content = content.replace("import Settings from '../components/dashboard/Settings';", "import Settings from '../components/dashboard/Settings';\nimport GenericDataView from '../components/dashboard/GenericDataView';")

    with open("Frontend/src/pages/AdminDashboard.jsx", "w") as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Could not find block")
