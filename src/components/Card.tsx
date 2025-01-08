import React from 'react';
import Block from '../Utils/Main';
import Blockchain from '../Utils/BlockChain';
import SettingsIcon from '@mui/icons-material/Settings';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Tooltip from '@mui/material/Tooltip';
import { Skeleton } from '@mui/material';

interface ICard {
    block: Block,
    index: number,
    blockChainInstance: Blockchain,
    setBlockGenerated: React.Dispatch<React.SetStateAction<Block[]>>,
    hashcodeMaps: Map<string, boolean>,
    blocks: Block[],
    reminingBlockIndex: null | number,
    setReminingBlockIndex: React.Dispatch<React.SetStateAction<null | number>>;
}

const Card = ({block, index, blockChainInstance, setBlockGenerated, hashcodeMaps, blocks, setReminingBlockIndex, reminingBlockIndex}: ICard) => {

    const [updateData, setUpdateData] = React.useState<string>(block?.data || '');

    const handleUpdateData = (e) => {
        setUpdateData(e.target.value);
    }

    const handleRemine = () => {
        setReminingBlockIndex(index);
        blockChainInstance?.remine(updateData, blocks[index-1].hashCode, setBlockGenerated, hashcodeMaps, index, setReminingBlockIndex);
    }

    const isInvalidBlock = React.useCallback(() => {
        if(index > 0) {
            if(block?.previousHash !== blocks[index-1]?.hashCode) {
                return true;
            } else {
                return false;
            }
        }
    }, [block?.previousHash, blocks, index]);

    return (
        <>
            <div className="flex-container">
                <div className="flex-item div1"></div>
                <div className="flex-item div2">
                    <div style={{backgroundColor: isInvalidBlock() ? 'red' : ''}}>
                        <div className="circle">
                            <span>{index+1}</span>
                        </div>
                        <div style={{ padding: '2% 10%' }}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <p style={{ fontWeight: 600, width: '20%'}}>Data:</p>
                                {index ? <input className='edit-data-input' value={updateData} onChange={(e) => handleUpdateData(e)} /> : 
                                <p className='information-container'>
                                    {updateData}
                                    <Tooltip title="The genesis block is the very first block in a blockchain. It's like the foundation stone of the entire blockchain structure.">
                                        <QuestionMarkIcon className='info' />
                                    </Tooltip>
                                </p>}
                            </div>
                            <p style={{fontWeight: 600}}>Hashcode:</p>
                            <p className='hash-code'>{reminingBlockIndex === index ? 
                                <Skeleton animation="wave" variant="rectangular" /> : block.hashCode}</p>
                            <p style={{ fontWeight: 600}}>Previous Hashcode:</p>
                            <p className='hash-code'>{block.previousHash}</p>
                            <div>
                                <p className='information-container'>Nonce:  
                                    <Tooltip title="Nonces are used in cryptographic operations to add uniqueness and randomness to transactions and blocks, which helps maintain the security and integrity of the blockchain.">
                                        <QuestionMarkIcon className='info' />
                                    </Tooltip>
                                </p>
                                <p className='hash-code'>{block.nonce}</p>
                            </div>
                            {updateData !== block?.data ? <button onClick={() => handleRemine()} className='remine-btn' disabled={reminingBlockIndex === index}>
                                <p style={{ marginRight: '5%'}}>Re Mine</p>
                                <SettingsIcon className={reminingBlockIndex === index ? `gear-rotate` : ''} />
                            </button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Card;