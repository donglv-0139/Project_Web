import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Receiver from "./Receiver";



const CreatedJob = () => {
    const { id } = useParams();

    const [job, setJob] = useState({});
    const [receivers, setReceivers] = useState([])
    const [authenticated, setAuthenticated] = useState(JSON.parse(localStorage.getItem("authenticated")));
    const base_url = "https://my-happy-farmer.herokuapp.com/api/v1";

    let headers = {
        'Authorization': "Bearer " + authenticated.token,
        'Content-Type': 'application/json'
    };


    useEffect(async () => {
        await axios.get(base_url + "/job/createdJob/" + id, { headers })
            .then(res => res.data)
            .then(data => {
                console.log(data.data)
                setJob(data.data.job);
                setReceivers(data.data.receivers);

            }).catch(err => { throw Error(err) });
    }, []);

    return (
        <div>
            {
                receivers != null ?
                    <div>
                        <h1>Created Job </h1>
                        <div>
                            <div><h3>Job detail</h3>

                                <p>{job.id}</p>
                                <p>{job.name}</p>
                                <p>{job.image_url}</p>
                                <p>{job.description}</p>
                                <p>{job.status}</p>

                            </div>
                        </div>
                        <div><h3>Receivers</h3>
                            {
                                receivers.map((receiver, idx) => {

                                    return <Receiver key={idx} job={job.id} authenticated={authenticated} receiver={receiver} />
                                })
                            }
                        </div>
                    </div> :
                    <h1>Loading...</h1>
            }


        </div >
    )
}
export default React.memo(CreatedJob);