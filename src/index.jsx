import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

// const APS_ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUV9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OnJlYWQiXSwiY2xpZW50X2lkIjoiMlNNYW1EVlJwSVJHMkxpS0FocEZuRERnbzFyM2FnTmRUU2p6cVlnQ1pTZXg0U3dwIiwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wZXIuYXBpLmF1dG9kZXNrLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tIiwianRpIjoibkJWVlVodzRYaUtSWVBQeGNHdWlTNGE1Y3Jsb0JXTDdSQjdZUmxRWVE2M2V6S1NhdkY0ajVheEZQTmRUVGo0diIsImV4cCI6MTcyMTgzNzI3MH0.AmcHxZsiSxa8O0Qk1Bgjq6VWiXMkDDUFPXgh2oKd489OYKwwI5EwBXKyPfk_7Z2rgCqLlBFoyX8gUKIYDCZdfStU4PbRIEPJQkONNl0aUvnSR5OzhzMOs-Y5iZ_RsYLXdUgT1pqXbxUXQjXqg4yQi45bSIz_l7b3v6dkNloaqtCCwri7J5cY2JBjsgYvDQXb5g2prW9u-fEy8wivXVnCuFH8nw47hsoV1ROHJJ0VSb7TuaE_Hvhou3zKOJe7MrrD2NTu_as3h9DVGNsFJRV-USEXY0OS34pqJdbvu02NQ4FCrvMeAEWMZX-EgdrArpwLzQKAsEA7VAMPYKAlgW_lGA';
// const APS_MODEL_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXV0b2Rlc2tfMjAyNDA3MjQxNTA2MDZfbGdpZ2M0NDYvZHdnRmlsZS0xNzIxODMzNTY1NTEyLTI5ODQ5MTAwLmR3Zw';

const APS_ACCESS_TOKEN ='';
const APS_MODEL_URN ='';
const root = ReactDOM.createRoot(document.getElementById('root'));
if (false) {
    root.render(<div>Please specify <code>APS_ACCESS_TOKEN</code> and <code>APS_MODEL_URN</code> in the source code.</div>);
} else {
    root.render(<App token={APS_ACCESS_TOKEN} urn={APS_MODEL_URN} />);
}