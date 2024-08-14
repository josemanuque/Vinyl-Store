import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { BsCloudSun } from "react-icons/bs";
import './Settings.View.css';

const SettingsView: React.FC = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("SettingsView must be used within a ThemeProvider");
    }

    const { theme, setTheme } = themeContext;

    return (
        <div className="main-container">
            <h1>Settings</h1>
            <div className="setting-container">
                <div className='setting-property'>
                    <BsCloudSun className='icon-wrapper icon-dark'/>
                    <h2>Appearance</h2>
                </div>
                <select aria-label='Choose your theme' className='setting-property-option' name="appearance" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="default">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </div>
    );
};

export default SettingsView;
