import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript.js';
const Editor = ({ language, value, onChange, readOnly }) => {
    const handleChange = (editor, data, value) => {
        onChange(value)
    }
    return (
        <CodeMirror
            value={value}
            detach
            onBeforeChange={handleChange}
            options={{
                lineWrapping: true,
                lint: true,
                theme: 'material',
                mode: language,
                lineNumbers: true,
                readOnly: readOnly,
            }}

        />
    );
};

export default Editor;