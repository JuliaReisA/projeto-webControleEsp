
import React, {useState, useEffect} from "react";
import { enderecoServidor } from "../../utils";

import { useNavigate, useNavigation } from "react-router-dom"

export default function TelaLed(){
    const navigate = useNavigate()

    const [status, setStatusLed] = useState("Desconhecido")

    const buscarStatus = async () => {
        try {
            const resposta= await fetch(`${enderecoServidor}/api/status`);
            const dados = await resposta.json();
            setStatusLed(dados.status);
        }catch(error){
            console.log('Erro ao buscar status', error);
        }
    }

    const enviarComando = async(comando) => {
        try{
            const resposta = await fetch(`${enderecoServidor}/api/comando`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comando }),
            });
            const dados = await resposta.json();
            console.log(dados.message);
            buscarStatus(); 
        }catch(error){
            console.log('Erro ao enviar comando', error);

        }
    }
    
    useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000); 
        return () => clearInterval(intervalo); 
    })
    

    return(
        <div >
            <h1 className='text-4xl font-bold text-blue-500 mb-4'>Controle do LED</h1>  
            <h1>Status Atual: {status}

            </h1>
            <button onClick={() => enviarComando('LIGADO')} className="bg-sky-500 text-white px-4 py-2 rounded" > Ligar</button>
            <button onClick={() => enviarComando('DESLIGADO')} className="bg-red-700 text-white px-4 py-2 rounded" > Desligar</button>
        </div>
    )
}
