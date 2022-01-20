import React from 'react';

const RequirementCard = (props) => {
    const register = props.register
    return (
        <div>
            <input className="placeholder-gray-100  w-full bg-transparent border-b py-2 border-red-100 px-2" type="text" placeholder='Enter your question' {...register(`requirement${props.num}`, { required: true })} />
        </div>
    );
};

export default RequirementCard;