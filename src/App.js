import { useState, useEffect } from "react"
import "./App.css"

function App(){

    const [options, setOptions]=useState([])
    const [from, setFrom]=useState('en')
    const [to, setTo] = useState('en')
    const [text, setText] = useState("")
    const [result, setResult] = useState("")

    useEffect(()=>{
        fetch("https://libretranslate.com/languages")
        .then((res)=>{
            return res.json()
        })
        .then((resp)=>{
            setOptions(resp)
        })
    },[])

    const translateText=()=>{
        let data={
            q : text,
            source : from,
            target: to
        }
        fetch("https://libretranslate.de/translate",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        })
        .then((resp)=>{
            return resp.json()
        })
        .then((res)=>{
            setResult(res.translatedText)
            // window.location.reload()
            console.log(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="containerm">
            <div id="header">
                <h2>Translataurus</h2>
                <button onClick={translateText} className="btn btn-primary">Translate</button>
            </div>
            <div className="container" style={{display:"flex"}}>
                <div>
                    <span>
                        From: 
                        <select onChange={(e)=>setFrom(e.target.value)} className="form-select">
                            {options.map(item=>(
                                <option value={item.code}>{item.name}</option>
                            ))}
                        </select>
                    </span>
                    <br/><br/>
                    <span>
                        <textarea class="form-control" rows="15" style={{width:"75vb"}} placeholder="Enter your text here..." onChange={(e)=>setText(e.target.value)}></textarea>
                    </span>
                </div>
                <div>
                    <span>
                        To: 
                        <select onChange={(e)=>setTo(e.target.value)} className="form-select">
                            {options && options.map(item=>(
                                <option value={item.code}>{item.name}</option>
                            ))}
                        </select>
                    </span>
                    <br/><br/>
                    <span>
                        <p class="form-control" rows="20" style={{width:"75vb", height:"47vb"}} readonly placeholder="Output will be displayed here...">{result}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default App