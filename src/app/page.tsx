'use client';

import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect } from 'react';
import Guess from '../components/Guess'
import Qwerty from '../components/Qwerty'
import PuzzleStore from '@/stores/PuzzleStore';

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore);
  useEffect(() => {
    store.init();
    window.addEventListener('keyup', store.handleKeyup)
    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [])
  return (
    <div className='flex h-fit w-screen flex-col items-center justify-center bg-gray-600'>
      <h1 className='text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400'>
        Wordle
      </h1>
      {store.guesses.map((_,i) => (
        <Guess 
          key={i}
          word={store.word} 
          guess={store.guesses[i]} 
          isGuessed={i < store.currentGuess}/>
      ))}
      {store.won && <h1 className='text-white'>You won!</h1>}
      {store.lost && <h1 className='text-white'>You lost! The world is <span className='text-green-400 font-bold'>{store.word.toUpperCase()}</span></h1>}
      {(store.won || store.lost) && (
        <button onClick={store.init} className='my-2 font-bold bg-green-500 p-2 text-white rounded-lg'>Play Again</button>
      )}
      <Qwerty store={store} handleBtn={store.handleButton}/>
      {/* word: {store.word} 
      guesses {JSON.stringify(store.guesses)}
      current: {store.currentGuess} */}
    </div>
  );
})
