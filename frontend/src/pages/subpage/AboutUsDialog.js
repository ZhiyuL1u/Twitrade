import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

function AboutUsDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                About Us
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Meet Our Team"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Our team is composed of dedicated professionals passionate about delivering
                        exceptional insights into financial data and social media analysis. We combine
                        expertise in data science, software development, and financial analysis to
                        provide you with the best possible user experience.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AboutUsDialog;
