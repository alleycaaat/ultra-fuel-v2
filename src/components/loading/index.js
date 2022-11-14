import React from 'react';
import './loading.css';

export default function Loading() {
    return (
        <div id='wrapper'>
            <span aria-live='polite' className='sr-only'>
                <p>Content is loading</p>
            </span>
            <div id='loading-text'>LOADING</div>
            <div id='loading-content'></div>
        </div>
    );
}
