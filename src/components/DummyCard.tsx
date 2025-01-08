import { Skeleton } from '@mui/material';
import React from 'react';

interface IDummyBlock {
    index: number;
}

const DummyCard = ({index}: IDummyBlock) => {
    return (
    <div className="flex-container">
        <div className="flex-item div1"></div>
        <div className="flex-item div2">
            <div>
                <div className="circle">
                    <span>{index+2}</span>
                </div>
                <div style={{ padding: '2% 10%' }}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <p style={{ fontWeight: 600, width: '20%'}}>Data:
                            <Skeleton animation="wave" variant="rectangular" />
                        </p>
                    </div>
                    <p style={{fontWeight: 600}}>Hashcode:</p>
                    <Skeleton animation="wave" variant="rectangular" />
                    <p style={{ fontWeight: 600}}>Previous Hashcode:</p>
                    <Skeleton animation="wave" variant="rectangular" />
                    <div>
                        <p className='information-container'>Nonce:</p>
                        <Skeleton animation="wave" variant="rectangular" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
};

export default DummyCard;