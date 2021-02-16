import React from 'react'

const SectionTitle = (props) => {
    return (
        <h2 className='section-title'>
            {props.children}
            <span className='underline' />
        </h2>
    )
}

export default SectionTitle