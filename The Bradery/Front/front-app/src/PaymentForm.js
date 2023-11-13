import React from 'react';
import {TextField, Button} from '@mui/material';
import { useState } from 'react';


const PaymentForm = () =>{ 
   

    const [message, setMessage] = useState ('');
    const [name, setName] = useState(""); 
    const [number, setNumber] = useState("");
    const [cryto, setCrypto] = useState("");

    const handlePayment = () => {}
    return (
        <form>
            <TextField label="Nom sur la carte" onChange={(event) => setName(event.target.value)}/>
            <TextField label="Numero de carte" onChange={(event) => setNumber(event.target.value)}/>
            <TextField label="Crytogram" onChange={(event) => setCrypto(event.target.value)}/>
      <Button variant="contained" color="success">
        Success
      </Button>
      {(name.length != 0 && number.length !=0 && cryto.length == 3) && <Button variant="outlined" color="error" onClick={() => alert(name)}>
        Error
      </Button>}
            {/*<Button style={{backgroundColor:"red"}} variant="container" onclick={handlePayment}>Payer</Button>*/}
        </form> 
    );
};

export default PaymentForm