import React from 'react';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

interface IHeader {
    blocksLength: number;
}

const Header = ({ blocksLength }: IHeader) => {

    const [displayClass, setDisplayClass] = React.useState<boolean>(false);

    React.useEffect(() => {
        setDisplayClass(true);
        const timer = setTimeout(() => {
            setDisplayClass(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, [blocksLength]);

    return (
        <div className='header-details'>
            <p className='title'>Blockchain Simulator</p>
            <div className= 'block-counter-container'>
                <ViewInArIcon className={`block-icon ${displayClass ? 'icon-animation' : ''}`}/>
                <p className='block-count'>{blocksLength}</p>
            </div>
        </div>
    )

};

export default Header;