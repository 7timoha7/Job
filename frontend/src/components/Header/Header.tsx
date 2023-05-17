import React from 'react';
import {AppBar, Box, Grid, styled, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../featurees/users/usersSlice";
import {NavLink} from "react-router-dom";
import img from "../../assets/images/logo2.png"

const Header = () => {

    const user = useAppSelector(selectUser);

    const Link = styled(NavLink)({
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    });

    const squareStyle = {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" component="div">
                                <Link to="/">
                                    <Box sx={squareStyle} p={0.5} borderRadius={'50%'}>
                                        <img src={img} alt="Square Image" width="100%" height="100%"/>
                                    </Box>
                                </Link>
                            </Typography>
                            <Grid item>
                                {user ? (
                                    <UserMenu user={user}/>
                                ) : (
                                    <AnonymousMenu/>
                                )}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Header;