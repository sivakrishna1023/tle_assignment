import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const Navbar = () => {
    const userId = localStorage.getItem('UserID');
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (option) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(option)
                ? prevSelectedOptions.filter((item) => item !== option)
                : [...prevSelectedOptions, option]
        );
    };

    const handleSubmit = () => {
        const query = selectedOptions.join(',');
        window.location.href = `/contests?filter=${query}`;
        handleClose();
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgba(14, 37, 77, 0.88)' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TLE
                </Typography>
                {userId ? (
                    <>
                        {window.location.pathname === '/contests' && (
                            <>
                                <Button color="inherit" onClick={handleClick}>
                                    Filter
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {['leetcode', 'codechef', 'codeforces'].map((option) => (
                                        <MenuItem
                                            key={option}
                                            onClick={() => handleMenuItemClick(option)}
                                            sx={{ paddingRight: '24px' }}
                                        >
                                            <Checkbox
                                                checked={selectedOptions.includes(option)}
                                            />
                                            <ListItemText primary={option} />
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={handleSubmit}>
                                        <Button color="inherit">Submit</Button>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                        <Button color="inherit">CP31Sheet</Button>
                        <Button color="inherit">Courses</Button>
                        <Typography variant="body1" component="div">
                            {userId}
                        </Typography>
                    </>
                ) : (
                    <Button color="inherit">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
