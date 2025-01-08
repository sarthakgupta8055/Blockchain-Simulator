import React from 'react';
import './styles/index.css';
import Scene from './components/scene.tsx';
function App() {

  // React.useEffect(() => {
  //   const currentBlockChain = new Blockchain();
  //   console.log('Minimg Block 1...');
  //   currentBlockChain.addNewBlock(new Block(1, '24/12/2024', {data: 'Data 1'}));
  //   console.log('Mining Block 2...');
  //   currentBlockChain.addNewBlock(new Block(2, '25/12/2024', {data: 'Data 2'}));
  //   currentBlockChain.getCompleteBlockChain();
  //   currentBlockChain.isBlockChainValid();
  // }, []);

  return (
    <div>
      <Scene />
    </div>
  );
}

export default App;
