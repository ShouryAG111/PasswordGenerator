import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setlength] = useState(8);
  const [allowed, setallowed] = useState(false);
  const [charac, charallowed] = useState(false);
  const [password,setpassword] = useState("");
  const generator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNIPQRSTUWVXYZabcdefghijklmnopqrstuwvxyz"
    if(allowed)  str += "0123456789";
    if(charac) str += "!@#$%^&*()";
    for(let i = 1; i<=length ;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char);
    }
   setpassword(pass);
  },[length,allowed,charac,setpassword])
 useEffect(() => {generator()}, [length,allowed,charac])
 const passwordref  = useRef(null);
 const copytoclipboard = useCallback(() => {
  passwordref.current?.select();
  window.navigator.clipboard.writeText(password)
 },[password])
  return (
   <>
   
   <div className='w-full max-w-md mx-auto shadow-md rounded-ld px-4 py-3 my-8 text-orange-500 bg-gray-700'>
     <h1 className='text-white text-centre my-3'>PassWord Generator </h1>
    <div className='flex flex-wrap shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' ref={passwordref}readOnly/>
      <button className='outline-none bg-blue-700 text-white px-1 py-0.5 shrink-0' onClick={copytoclipboard}>Copy</button>
      <div  className='flex text-sm gap-x-1'>
        <div className='flex item-centre gap-x-1'><input type="range" onChange={(e)=> setlength(e.target.value)} min = {6} max = {100} className='cursor-pointer' />
        <label> Length:{ length}</label>
        </div>
        <div className='flex item-centre gap-x-0' >
        <input 
              type="checkbox" 
              checked={allowed}
              id='numberinput'
              onChange={() => setallowed((prev) => !prev)} 
            />
            <label htmlFor="numberinput">Include Numbers</label>
            <input 
              type="checkbox" 
              checked={charac}
              id='characterinput'
              onChange={() => charallowed((prev) => !prev)} 
            />
            <label htmlFor="characterinput">Include Symbols</label>
        </div>
      </div>
    </div>
   </div>

  </>
  )
}

export default App
