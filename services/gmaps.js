import axios from "axios"


export const getDirections = (params) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Content-type": "application/json"
    }
    axios.get("https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyC1Gl3r2i9LwBCthD6kZ1egwyw3VdGAubw", { headers })
        .then(res => console.log(res))
}