import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Element from "../assets/elemen4.png";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  
  const getSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/skill`);
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skill data:", error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="relative">
      <img src={Element} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
      <div className="relative z-10 container mx-auto py-10">
        <h1 data-aos="fade-down" data-aos-duration="1000" className="text-3xl text-[#0D6B91] font-body font-bold text-center mb-8">
          <span role="img" aria-label="target">🎯</span>My Skills
        </h1>
        <div data-aos="fade-up" data-aos-duration="1000" className="md:flex justify-center md:gap-16">
          {Object.keys(groupedSkills).map(category => (
            <div key={category} className="md:w-80 max-md:mx-auto w-5/6 my-5 font-body bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-3 gap-4 mt-5">
                {groupedSkills[category].map((skill, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <img src={skill.link_foto} alt={`${skill.name} icon`} className="h-auto w-12" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;