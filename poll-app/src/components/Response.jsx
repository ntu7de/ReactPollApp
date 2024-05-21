import React, { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const Response = ({ response }) => {
    const [upvotes, setUpvotes] = useState(response.upvotes);

    const handleClick = async () => {
        try{
            const docRef = doc(db, 'answers', response.id);
            const newUpvotes = response.upvotes + 1;
            await updateDoc(docRef, {
                upvotes: newUpvotes
            });
            setUpvotes(newUpvotes);
        }
        catch (error) {
            console.error("Error updating document: ", error);
        }
        
    };

    return (
        <>
            <Box sx={{ 
                display: 'flex', 
                mb: 2, 
                gap: 4,
                maxWidth: '600px', 
                margin: 'auto', 
                alignItems: 'center',
            }}>
                <Box sx={{ justifyContent: 'left', alignItems: 'left'}}>
                    <Typography variant="body1">{response.answer}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', gap: 0.5 }}>
                    <Typography variant="body1">{upvotes}</Typography>
                    <IconButton onClick={handleClick}>
                        <ThumbUpIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default Response