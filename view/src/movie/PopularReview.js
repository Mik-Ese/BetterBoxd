import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import './styles/popularReview.css';
const PopularReview = ({ reviewData, setMovieSelected }) => {
    var temp = '';
    reviewData.description.length > 400
        ? (temp = reviewData.description.substring(0, 400) + '...')
        : (temp = reviewData.description);
    const [commentOpen, setCommentOpen] = useState(false);
    const [description, setDescription] = useState(temp);
    const selectMovie = () => {
        setMovieSelected(reviewData.movieID);
    };
    const comment = reviewData.description;
    const createStars = () => {
        let stars = [];
        for (let i = 0; i < reviewData.numStars; i++) {
            stars.push(<StarIcon sx={{ color: 'rgb(255, 200, 85)' }} />);
        }
        return stars;
    };

    return (
        <div
            className="popular-review-container"
            style={{ marginBottom: '1rem' }}
        >
            <div className="popular-review-icon" onClick={selectMovie}>
                <img
                    className="popular-review-image"
                    src={reviewData.imgLink}
                />
            </div>
            <div className="popular-review-description-container">
                <div className="popular-review-title-container">
                    <div className="popular-review-title">
                        {reviewData.title}
                    </div>
                    <div className="popular-review-year">{reviewData.year}</div>
                </div>
                <div className="popular-review-info">
                    <div className="popular-review-author-name">
                        {reviewData.authorName}
                    </div>
                    <div className="popular-review-stars">{createStars()}</div>
                    <div className="popular-review-comments">
                        <div className="popular-review-comment-icon">
                            <ModeCommentIcon {...{ comment }} />
                        </div>
                        <div className="popular-review-comment-number">
                            {reviewData.numComments}
                        </div>
                    </div>
                </div>
                <div
                    style={{ cursor: 'pointer' }}
                    className="popular-review-description"
                    onClick={() => {
                        setCommentOpen(true);
                    }}
                >
                    {description}
                </div>
                {commentOpen ? (
                    <AlertDialogSlide {...{ comment, setCommentOpen }} />
                ) : (
                    <></>
                )}
                <div className="popular-review-likes-container">
                    <div className="popular-review-likes-icon">
                        {<FavoriteIcon />}
                    </div>
                    <div className="popular-review-likes-text">
                        {reviewData.numLikes}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide({ comment, setCommentOpen }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        setCommentOpen(false);
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
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {comment}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default PopularReview;
