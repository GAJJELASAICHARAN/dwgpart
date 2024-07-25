import React from 'react';
import axios from 'axios';
import Viewer from './Viewer';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = null;
        this.state = {
            camera: null,
            selectedIds: [],
            file: null,
            urn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YXV0b2Rlc2tfMjAyNDA3MjUxMjIzMjNfaHhsZDR0YWUvZHdnRmlsZS0xNzIxOTEwMjAyNDkxLTY2NTQyNjk5NC5kd2c',
            token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUV9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OnJlYWQiXSwiY2xpZW50X2lkIjoiMlNNYW1EVlJwSVJHMkxpS0FocEZuRERnbzFyM2FnTmRUU2p6cVlnQ1pTZXg0U3dwIiwiaXNzIjoiaHR0cHM6Ly9kZXZlbG9wZXIuYXBpLmF1dG9kZXNrLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tIiwianRpIjoiN3pBdW9vVDFRWG5yM1U1dElJc29HOUpqbFlDNklXZWpKckdnS053cmJxOGs4MU1Qa3BUbjNHaDk2c2tNUXRhdCIsImV4cCI6MTcyMTkxMzgwNX0.s8hZ7JVNWo6uYkcFeItq_kKvZKNVklOIXnxwSd98huFk6HqPrTMNngzq5p7_Nbf1ecD0-CjJ38cfdEpawvLu1eSI0-C5Dhx9T-91_d_DszPHQJWU2CIYuQ0efWo8mrPyrjMYKi9kaA1SIjGOcegrjcw3AwnCZpktfCiFfX3nM12sfMUmZZRoEkdw_s1z-ttIWu6k4iykIu4OmhWwi7z5fvu-2qjymN4ewNBM0glGYPVJhMXoO5FAhJ_Vh7vmb0PoacWwJEp5lPgOBG2dK_7fOgTOqOrAGkwVOo2Ak9lmWW14VWvtu8OaJKKEs-St61LSlNZ6UKkbBAqhN8t0oxmQKg',
            inputUrn: '',
            inputToken: '',
            isLoading: false,
            viewerKey: 0
        };
    }

    onInputChange = (ev) => {
        const val = ev.target.value.trim();
        const ids = val.split(',').filter(e => e.length > 0).map(e => parseInt(e)).filter(e => Number.isInteger(e));
        this.setState({ selectedIds: ids });
    }

    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    }

    handleSubmit = async () => {
        if (!this.state.file) {
            alert('No file selected.');
            return;
        }

        this.setState({ isLoading: true });

        const formData = new FormData();
        formData.append('dwgFile', this.state.file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { urn, token } = response.data;
            console.log("Received data:", response.data);
            this.setState(prevState => ({ 
                urn, 
                token, 
                inputUrn: urn, 
                inputToken: token,
                isLoading: false,
                viewerKey: prevState.viewerKey + 1
            }));
        } catch (error) {
            console.error('Error uploading file:', error);
            this.setState({ isLoading: false });
            alert('Error uploading file. Please try again.');
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleUpdate = () => {
        const { inputUrn, inputToken } = this.state;
        if (inputUrn && inputToken) {
            this.setState(prevState => ({
                urn: inputUrn,
                token: inputToken,
                viewerKey: prevState.viewerKey + 1
            }));
        } else {
            alert('Please enter both URN and Token.');
        }
    }

    render() {
        const { urn, token, camera, selectedIds, file, inputUrn, inputToken, isLoading, viewerKey } = this.state;

        return (
            <div className="app">
                <div>
                    <input type="file" onChange={this.handleFileChange} />
                    <button onClick={this.handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Submit'}
                    </button>
                </div>
                <div>
                    <input
                        type="text"
                        name="inputUrn"
                        value={inputUrn}
                        onChange={this.handleInputChange}
                        placeholder="Enter URN"
                    />
                    <input
                        type="text"
                        name="inputToken"
                        value={inputToken}
                        onChange={this.handleInputChange}
                        placeholder="Enter Token"
                    />
                    <button onClick={this.handleUpdate}>Update</button>
                </div>
                {urn && token && (
                    <div>
                        <div style={{ position: 'relative', width: '800px', height: '600px' }}>
                            <Viewer
                                key={viewerKey}
                                runtime={{ accessToken: token }}
                                urn={urn}
                                selectedIds={selectedIds}
                                onCameraChange={({ viewer, camera }) => this.setState({ camera: camera.getWorldPosition() })}
                                onSelectionChange={({ viewer, ids }) => this.setState({ selectedIds: ids })}
                                ref={ref => this.wrapper = ref}
                            />
                        </div>
                        <div>
                            Camera Position:
                            {camera && `${camera.x.toFixed(2)} ${camera.y.toFixed(2)} ${camera.z.toFixed(2)}`}
                        </div>
                        <div>
                            Selected IDs:
                            <input type="text" value={selectedIds.join(',')} onChange={this.onInputChange}></input>
                        </div>
                        <button onClick={() => this.wrapper && this.wrapper.viewer && this.wrapper.viewer.autocam.goHome()}>Reset View</button>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
