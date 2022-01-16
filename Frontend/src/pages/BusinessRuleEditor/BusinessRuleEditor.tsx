import React, { useEffect, useState } from 'react';
import axios from 'axios-backend';


const BusinessRuleEditor = () => {

    return (
        <div className='iframe-wrapper'>
            <iframe 
                src="https://www.json-rule-editor.com/"
                frameBorder="0"
                className='iframe-rule-editor'>
            </iframe>
        </div>
    );
}

export default BusinessRuleEditor;