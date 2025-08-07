import React from "react";
import energyImage from "./gambar3.jpg"; 

const About = () => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl mt-8">
            <div className="md:flex">
                <div className="md:shrink-0">
                    <img
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        src={energyImage}
                        alt="Smart energy saving"
                    />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">
                        Smart Energy Solutions
                    </div>
                    <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                        Protect the Earth Through Smart Home Energy Apps
                    </h2>
                    <p className="text-justify mt-2 text-slate-500">
                        With rising energy consumption, smart home energy apps empowered by AI are vital in
                        promoting sustainable living. These apps analyze the electrical costs of your home
                        appliances, helping you make informed decisions to reduce energy waste and lower your
                        bills.
                    </p>
                    <p className="text-justify mt-2 text-slate-500">
                        By identifying high-energy-consuming devices, users can optimize usage and take steps to
                        protect the planet. Smart energy management contributes to a greener future, one home at
                        a time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
