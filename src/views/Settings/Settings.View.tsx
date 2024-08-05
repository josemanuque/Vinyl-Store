import { useEffect, useState } from "react";

const SettingsView = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'default');

    
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


    return (
        <div>
            <h1>Settings</h1>
            <div>
                <h2>Appearance</h2>
                <select name="appearance" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="default">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </div>
    );
};

export default SettingsView;