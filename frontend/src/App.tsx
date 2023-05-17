import React from 'react';
import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./featurees/users/Login";
import Register from "./featurees/users/Register";
import Header from "./components/Header/Header";
import NoPage from "./components/NoPage/NoPage";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./featurees/users/usersSlice";

function App() {
    const user = useAppSelector(selectUser);
    return (
        <div>
            <CssBaseline/>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path={'/*'} element={<NoPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
