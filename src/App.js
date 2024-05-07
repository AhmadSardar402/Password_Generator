import {useState,useCallback,useRef} from 'react';

function App() {
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numberAllowed){
        str+="0123456789";
      }
      if(charAllowed){
        str+="!@#$%^&*()_+";
      }
      for(let i=0;i<lenght;i++){
        let char = Math.floor(Math.random()*str.length +1);
        console.log(char);
        pass+=str.charAt(char);
      }
      setPassword(pass);
  },[lenght, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = ()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(passwordRef.current.value);
  }
  return (
    <>
      <div className='max-w-md mx-auto shadow-md rounded-3xl p-4 m-8 text-orange-500 bg-gray-700'>
          <h1 className='text-xl text-center font-bold mb-4'>Password Generator</h1>  
          <div className='flex shadow overflow-hidden mb-4'>
            <input className='outline-none py-1 w-full rounded-l-xl px-4 readOnly' ref={passwordRef} type='text' value={password} placeholder='Password'/>
            <button className='bg-orange-500 text-white px-4 rounded-r-xl font-bold' onClick={copyToClipboard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1 w-52'>
              <input type='range' min={8} max={20} value={lenght} className='cursor-pointer' onChange={(e)=> setLenght(e.target.value)}/>
              <label>Length: {lenght}</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input type='checkbox' defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}/>
              <label>Numbers</label>
            </div>
            <div className='flex items-center gap-x-2'>
              <input type='checkbox' defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
              <label>Characters</label>
            </div>
          </div>
          <div className='flex w-full mt-5 place-content-center'>
            <button className='bg-orange-500 text-white px-4 py-2 rounded-xl font-bold cursor-pointer' onClick={passwordGenerator}>Generate Password</button>
          </div>
      </div>
    </>
  );
}

export default App;

