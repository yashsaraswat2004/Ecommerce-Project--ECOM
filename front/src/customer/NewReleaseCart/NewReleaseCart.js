import React from 'react';

const NewReleasecart = ({ image }) => {  // Accept image prop
    return (
        <div>
            <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <div className='h-[13rem] w-[10rem]'>
                    <img
                        className="object-cover object-top w-full h-full"
                        src={image} alt="New Release" />  {/* Use image prop */}
                </div>
                <div className="p-4">
                    <h3 className='text-lg font-medium text-gray-900'>Brand Name</h3> {/* Placeholder for brand */}
                    <p className='mt-2 text-sm text-gray-500'>
                        Product Title {/* Placeholder for title */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewReleasecart;
