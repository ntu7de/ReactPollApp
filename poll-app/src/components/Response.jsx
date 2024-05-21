import React from 'react'

const Response = ({ response }) => {

    return (
        <>
            <p>{response.answer} {response.upvotes}</p>
        </>
    )
}

export default Response