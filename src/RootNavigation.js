import { Routes, Route } from "react-router-dom";
import {Home} from './pages'

function RootNavigation(props){
    return(
        <Routes>
            <Route path="/" element={<Home {...props}/>} />
        </Routes>
    )
}

export default RootNavigation;