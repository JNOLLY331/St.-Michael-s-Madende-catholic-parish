import re

with open('Frontend/src/pages/ParishionerDashboard.jsx', 'r') as f:
    content = f.read()

# Add imports for APIs
content = content.replace("import { useAuth } from '../context/AuthContext';", "import { useAuth } from '../context/AuthContext';\nimport { eventApi } from '../api/endpoints/events';\nimport { donationsApi } from '../api/endpoints/donations';\nimport { sacramentsApi } from '../api/endpoints/sacraments';")

# Add stat overrides logic
insertion = """
    const [userStats, setUserStats] = useState({
        donated: 0,
        events: 0,
        sacraments: 0
    });

    useEffect(() => {
        if (!isAuthenticated) return;
        
        let mounted = true;
        
        Promise.all([
            donationsApi.getPledges().catch(() => []),
            eventApi.myRegistrations().catch(() => []),
            sacramentsApi.listMyApplications().catch(() => [])
        ]).then(([pledgesRes, eventsRes, sacramentsRes]) => {
            if (!mounted) return;
            
            const pledges = Array.isArray(pledgesRes) ? pledgesRes : (pledgesRes.results || []);
            const totalDonated = pledges.reduce((acc, p) => acc + (parseFloat(p.amount) || 0), 0);
            
            const myEvents = Array.isArray(eventsRes) ? eventsRes : (eventsRes.results || []);
            const mySacraments = Array.isArray(sacramentsRes) ? sacramentsRes : (sacramentsRes.results || []);
            
            setUserStats({
                donated: totalDonated,
                events: myEvents.length,
                sacraments: mySacraments.length
            });
        });
        
        return () => { mounted = false; };
    }, [isAuthenticated]);
"""

content = content.replace("    const [searchQuery, setSearchQuery] = useState('');", "    const [searchQuery, setSearchQuery] = useState('');\n" + insertion)

# replace hardcoded stats values
content = content.replace("value: 25000,", "value: userStats.donated,")
content = content.replace("value: 12,", "value: userStats.events,")
content = content.replace("value: 3,", "value: userStats.sacraments,")

with open('Frontend/src/pages/ParishionerDashboard.jsx', 'w') as f:
    f.write(content)
print("done parishioner")
