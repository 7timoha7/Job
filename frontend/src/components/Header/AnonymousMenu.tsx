import React from 'react';
import {Button} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import {AccountCircle, LockOutlined} from '@mui/icons-material';

const AnonymousMenu = () => {
    return (
        <>
            <Button component={NavLink} to="/register" variant="contained" startIcon={<AccountCircle/>} color="primary">
                Registration
            </Button>
            <Button component={NavLink} to="/login" variant="contained" startIcon={<LockOutlined/>} color="secondary">
                Enter
            </Button>
        </>
    );
};

export default AnonymousMenu;