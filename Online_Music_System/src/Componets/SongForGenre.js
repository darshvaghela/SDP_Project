import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useNavigate, Switch, Route, Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function SongforGenre() {

    const nav = useNavigate();
    const location = useLocation();

    const [songs, setSongs] = useState([]);
    const fetchSongsByGenre = async () => {
        let response = await fetch(`http://localhost:4099/song/fetchallsongs/${location.state.genre}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );
        response = await response.json();
        setSongs(response.songs)
    }

    const navigateWithId = (id) => {
        nav('/player', { state: { id: id } })
    }


    useEffect(() => {
        fetchSongsByGenre();
    }, [])

    return (
        <>
            <div className="container-fluid w-100 bg-dark vh-100">

                <div className="row h-100">
                    <div className="col-2 p-0 h-100 position-fixed sidebar" style={{ "backgroundColor": "black" }}>
                        <Sidebar />

                    </div>
                    <div className="col-10 offset-2 p-0 h-100 ">
                        <Navbar/>
                        <div className="container">
                            <h3 className="my-4 text-light">{location.state.genre}</h3>
                            <div className="row row-cols-6 g-4 mb-3">
                                {
                                    songs.map((s) => {
                                        return (
                                            <div className="col">
                                                <div className="card h-100 mycard text-light" onClick={() => navigateWithId(s._id)}>
                                                    <img src={s.imageLink} className="card-img-top" />
                                                    <div className="card-footer h-25">
                                                        <p className="card-title">{s.songName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
