import React from 'react';
import '../styles/index.css';
import Block from '../Utils/Main.ts';
import Blockchain from '../Utils/BlockChain.ts';
import Card from './Card.tsx';
import SettingsIcon from '@mui/icons-material/Settings';
import DummyCard from './DummyCard.tsx';
import Header from './Header.tsx';

const Scene = () => {
    const [blockChainInstance, setBlockChainInstance] = React.useState<Blockchain>();
    const [blocksGenerated, setBlockGenerated] = React.useState<Block[]>([]);
    const newBlockRef = React.useRef<HTMLInputElement>(null);
    const hashcodeMaps: Map<string, boolean> = React.useMemo(() => new Map([]), []);
    const [isMining, setIsMining] = React.useState<boolean>(false);
    const [reminingBlockIndex, setReminingBlockIndex] = React.useState<null | number>(null);

    React.useEffect(() => {
        blocksGenerated?.forEach((block) => {
            hashcodeMaps.set(block.hashCode, true)
        })
    }, [blocksGenerated, hashcodeMaps]);

    React.useEffect(() => {
        const newBlockChain = new Blockchain();
        setBlockChainInstance({...newBlockChain as any});
        setBlockGenerated(newBlockChain.blocks)
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleAddBlock = React.useCallback(async () => {
        if(newBlockRef.current && newBlockRef.current.value) {
            setIsMining(true);
            setTimeout(() => {
                blockChainInstance?.addNewBlock(newBlockRef?.current?.value, setBlockGenerated, blocksGenerated, hashcodeMaps, setIsMining);
                if(newBlockRef.current) {
                    newBlockRef.current.value = '';
                }
            }, 2000)
        }
    },[blockChainInstance, blocksGenerated, hashcodeMaps]);

    const addNewBlock = React.useCallback(() => (
        <div className='input-container'>
            <input placeholder='Enter Data' ref={newBlockRef} className='input-text' />
            <button className='mine-btn' onClick={() => handleAddBlock()}>
                <SettingsIcon className={isMining ? `gear-rotate` : ''} />
            </button>
        </div>
    ), [handleAddBlock, isMining]);

    const displayMinedBlocks = React.useCallback(() => {
        return blocksGenerated?.map((block, index) => 
            <Card block={block} index={index} key={index} blockChainInstance={{...blockChainInstance} as Blockchain} setBlockGenerated={setBlockGenerated} hashcodeMaps={hashcodeMaps} blocks={blocksGenerated}
                setReminingBlockIndex={setReminingBlockIndex} reminingBlockIndex={reminingBlockIndex} />
        )
    }, [blockChainInstance, blocksGenerated, hashcodeMaps, reminingBlockIndex]);

    const displayDummyBlock = () => {
        return (
            <DummyCard index={blocksGenerated?.length-1} />
        )
    };

    return (
        <div>
            <Header blocksLength={blocksGenerated.length} />
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className='blocks-container'>{displayMinedBlocks()}{isMining && displayDummyBlock()}</div>
                <div>{addNewBlock()}</div>
            </div>
        </div>
    )
};

export default Scene;