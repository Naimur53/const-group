import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
const RequirementCard = ({ num, setValue, register, setRequirements, unregister, watch, requirements }) => {
    // const register = props.register
    const handleClick = () => {

        setRequirements(pre => {
            console.log(watch(`requirement${num}`));
            pre.filter(preNum => preNum !== num).forEach((element, i) => {
                console.log('set value ', `requirement${i + 1}`);
                setValue(`requirement${i + 1}`, watch(`requirement${element}`))
                unregister(`requirement${element}`, { keepDirty: false });
            });
            const newRe = pre.filter(preNum => preNum !== num).map((ele, i) => ++i);
            unregister(`requirement${num}`, { keepDirty: false });

            return newRe;
        })
    }
    return (
        <div className='relative'>
            <input className="  mt-3  w-full bg-transparent border-b py-2 border-red-100 px-2" type="text" placeholder='Enter your question' {...register(`requirement${num}`, { required: true })} />
            {

                requirements.length !== 1 && <IconButton sx={{ position: 'absolute' }} onClick={handleClick} className='top-3 right-0'><CancelIcon style={{ fill: "red", }}></CancelIcon></IconButton>
            }
        </div>
    );
};

export default RequirementCard;