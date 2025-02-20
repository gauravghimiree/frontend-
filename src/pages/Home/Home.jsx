import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList/ProjectList';

const Home = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      setCurrentDate(now.toLocaleDateString('en-GB', options)); // Format as "5th April 2025"
    };

    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    formatDate(); // Set the initial date
    getGreeting(); // Set the initial greeting

  }, []);

  return (
    <div className="p-5">
      {/* Flexbox container to display greeting and date */}
      <div className="flex flex-col items-start mb-5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#52329F] to-[#9C44D0] text-transparent bg-clip-text">
          {greeting}!
        </h1>
        <p className="text-lg">{currentDate}</p> {/* Date below greeting */}
      </div>

      {/* Project List */}
      <ProjectList />
    </div>
  );
};

export default Home;
