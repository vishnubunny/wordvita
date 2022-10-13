import { useState } from "react";
import "./Test2.scss"

const Test2=()=>{
    const [toggle, setToggle]= useState(false)
    const xyz=()=>{
        setToggle(!toggle)
    }
    return(

        <div>



  <ul className={`cards-split-delay ${toggle && 'transition'}`}  onClick={xyz}>
    <li className="title">
        <h2>Delayed split from middle</h2>
    </li>
    <li className="card card-1">
        <div className="content">
            <h1>Card 1 Title</h1>
            <p>Card description</p>
        </div>
    </li>
    <li className="card card-2">
        <div className="content">
            <h1>Card 2 Title</h1>
            <p>Card description</p>
        </div>
    </li>
    <li className="card card-3">
        <div className="content">
            <h1>Card 3 Title</h1>
            <p>Card description</p>
        </div>
    </li>
</ul>
        </div>
    )
};

export default Test2;