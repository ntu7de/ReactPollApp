import React, { useState, useEffect } from 'react';
import '../styles/Poll.css';
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Response from './Response';

const Poll = () => {
    const [answer, setAnswer] = useState("");
    const [responses, setResponses] = useState([]); 

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const docRef = await addDoc(collection(db, "answers"), {
                answer: answer,
                upvotes: 0,
            });
            setAnswer(""); 
            fetchResponses();
        }
        catch (error) {
            console.error("Error adding document: ", error);
        }
       
    };

    const fetchResponses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'answers'));
            const fetchedResponses = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setResponses(fetchedResponses);
            console.log(fetchedResponses);
        } catch (error) {
            console.error('Error fetching responses: ', error);
        }
    };

    useEffect(() => {
        fetchResponses();
    }, []);

    return (
        <>
            <h1>Poll City</h1>
            <h2>Where would you like to go on vacation this summer?</h2>
            <input 
                placeholder="Type your answer!"
                type='text'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <br />
            <button type='submit' onClick={handleSubmit}>
                Submit
            </button>
            <h3>Previous responses:</h3>
            {responses.map(response => (
                <div key={response.id}>
                    <Response response={response} />
                </div>
            ))}
        </>
    );
};

export default Poll;