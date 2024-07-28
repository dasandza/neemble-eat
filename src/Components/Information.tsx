import React from 'react';
import {CharmCross} from "../assets/icons";

interface InformationProps {
    onClose: () => void;
}

const Information: React.FC<InformationProps> = ({onClose}) => {
    return (
        <div className="bg-white rounded-3xl w-full max-w-md shadow-lg font-poppins">
            <div className="flex justify-between py-5 items-center border-b px-6 border-gray-200">
                <h1 className="text-xl font-bold">Store Information</h1>
                <button
                    onClick={onClose}
                    className="rounded-md p-2 hover:border-gray-400 hover:bg-gray-200 transition-colors duration-200"
                >
                    <CharmCross/>
                </button>
            </div>
            <div className="mt-7 pb-14 border-b px-6 border-gray-200">
                <h2 className="font-semibold text-lg">Hours</h2>
                <div className="mt-4">
                    <div className="flex justify-between mt-1.5">
                        <div>Monday</div>
                        <div className="mr-10">8:00 AM - 6:00 PM</div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <div>Tuesday</div>
                        <div className="mr-10">8:00 AM - 6:00 PM</div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <div>Wednesday</div>
                        <div className="mr-10">8:00 AM - 6:00 PM</div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <div>Thursday</div>
                        <div className="mr-10">8:00 AM - 6:00 PM</div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <div>Friday</div>
                        <div className="mr-10">8:00 AM - 6:00 PM</div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <div>Saturday</div>
                        <div className="mr-10 font-bold">Closed</div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <div>Sunday</div>
                        <div className="mr-10 font-bold">Closed</div>
                    </div>
                </div>
            </div>
            <div className="items-center py-5">
                <div className="w-full h-full flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-black hover:bg-blue-600 mr-5 px-7 py-1 rounded-lg text-white transition-colors duration-200">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Information;