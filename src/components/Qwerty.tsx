import { observer } from "mobx-react-lite"
// any function that use store have to be wrapped insice observer
export default observer(function Qwerty({store, handleBtn}:{store:any, handleBtn: Function}) {
    const qwerty = ['q,w,e,r,t,y,u,i,o,p', 'a,s,d,f,g,h,j,k,l', 'z,x,c,v,b,n,m', '< Backspace,↵ Enter']
    return(
        <div>
            {qwerty.map(row => (
                <div className="flex justify-center">
                    {row.split(',').map(char => {
                        const bgColor = store.exactGuesses.includes(char)
                            ? 'bg-green-400'
                            : store.inexactGuesses.includes(char)
                            ? 'bg-yellow-400'
                            : store.allGuesses.includes(char)
                            ? 'bg-gray-400'
                            : 'bg-gray-200'
                        if (char.length >1){
                            return (
                                <button onClick={()=>handleBtn({char})} value={char} className={`hover:scale-105 m-px flex h-12 px-5 items-center justify-center rounded-md ${bgColor}`}>
                                    {char}
                                </button>
                            )
                        }
                        return (
                        <button onClick={()=>handleBtn({char})} value={char} className={`hover:scale-105 m-px flex h-12 w-12 items-center justify-center rounded-md uppercase ${bgColor}`}>
                            {char}
                        </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
})