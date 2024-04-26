import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
// import Navbar from '../../components/Navbar';
import Sidebar from '../../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebook, faTiktok, faTwitter, faLinkedin, faSnapchat, faPinterest, faReddit, faTumblr } from '@fortawesome/free-brands-svg-icons';

const Dashboard = () => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Time Usage',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: '#00df9a',
            },
            {
                label: 'Lock App',
                data: [28, 48, 40, 19, 86, 27],
                fill: false,
                borderColor: '#ff0000',
            },
            {
                label: 'Scheduling',
                data: [35, 45, 67, 28, 43, 30],
                fill: false,
                borderColor: '#0000ff',
            },
        ],
    };

    const [appList, setAppList] = useState([
        { name: 'WhatsApp', locked: true },
        { name: 'Instagram', locked: false },
        { name: 'Facebook', locked: true },
        { name: 'TikTok', locked: false },
        { name: 'Twitter', locked: true },
        { name: 'LinkedIn', locked: false },
        { name: 'Snapchat', locked: true },
        { name: 'Pinterest', locked: false },
        { name: 'Reddit', locked: true },
        { name: 'Tumblr', locked: false },
    ]);

    const toggleLockStatus = (index) => {
        const updatedAppList = [...appList];
        updatedAppList[index].locked = !updatedAppList[index].locked;
        setAppList(updatedAppList);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* <Navbar /> */}
            <div className="flex flex-col flex-1 md:flex-row">
                <Sidebar />
                <div className="flex-grow p-4 md:p-10">
                    <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Time Usage</h2>
                            <Line data={chartData} />
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Lock App</h2>
                            {/* <Line data={chartData} /> */}
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Scheduling</h2>
                            {/* <Line data={chartData} /> */}
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-4 rounded-lg shadow-md overflow-y-auto max-h-96">
                        <h2 className="text-xl font-bold mb-4">App List</h2>
                        <ul>
                            {appList.map((app, index) => (
                                <li key={index} className="flex items-center justify-between py-2 border-b">
                                    <div className="flex items-center">
                                        {app.name === 'WhatsApp' && <FontAwesomeIcon size='2x' icon={faWhatsapp} className="mr-2" />}
                                        {app.name === 'Instagram' && <FontAwesomeIcon size='2x' icon={faInstagram} className="mr-2" />}
                                        {app.name === 'Facebook' && <FontAwesomeIcon size='2x' icon={faFacebook} className="mr-2" />}
                                        {app.name === 'TikTok' && <FontAwesomeIcon size='2x' icon={faTiktok} className="mr-2" />}
                                        {app.name === 'Twitter' && <FontAwesomeIcon size='2x' icon={faTwitter} className="mr-2" />}
                                        {app.name === 'LinkedIn' && <FontAwesomeIcon size='2x' icon={faLinkedin} className="mr-2" />}
                                        {app.name === 'Snapchat' && <FontAwesomeIcon size='2x' icon={faSnapchat} className="mr-2" />}
                                        {app.name === 'Pinterest' && <FontAwesomeIcon size='2x' icon={faPinterest} className="mr-2" />}
                                        {app.name === 'Reddit' && <FontAwesomeIcon size='2x' icon={faReddit} className="mr-2" />}
                                        {app.name === 'Tumblr' && <FontAwesomeIcon size='2x' icon={faTumblr} className="mr-2" />}
                                        <span>{app.name}</span>
                                    </div>
                                    <div 
                                        className={`w-8 h-4 rounded-full bg-${app.locked ? 'red' : 'green'}-500 flex items-center justify-center cursor-pointer`}
                                        onClick={() => toggleLockStatus(index)}
                                    >
                                        <div className={`w-3 h-3 rounded-full bg-white transform transition-transform duration-300 ease-in-out ${app.locked ? '' : 'translate-x-full'}`}></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
