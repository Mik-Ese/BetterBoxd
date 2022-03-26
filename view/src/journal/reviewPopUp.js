import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import MultilineTextFields from './textField';
import SearchAppBar from './search';
import { baseURL } from '../consts/consts.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ setReviewPageOpen, user }) {
    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setReviewPageOpen(false);
    };

    //call this function when the 'submit' button is clicked
    //and a movie is selected and a descriptpion is rwritten
    const postReview = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: /*description here,*/ 'temp',
                user_id: user._id,
                movie: /*selected movie ID here*/ 'temp'
            })
        };
        fetch(`${baseURL}/post-journal-entry`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //close the tab here now
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="text-center">
                    {'Which movie would you like to review?'}
                </DialogTitle>
                <DialogContent>
                    <SearchAppBar className="mt-5" />
                    <MultilineTextFields />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
