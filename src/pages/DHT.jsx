import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function DHT() {
    const [temperatura, setTemperatura] = useState("");
    const [umidade, setUmidade] = useState("");

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/DHT`);
            const dados = await resposta.json();
            setTemperatura(dados.temperatura);
            setUmidade(dados.umidade);
        } catch (error) {
            console.log('Erro ao buscar dados', error);
        }
    }
      useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000)
        return () => clearInterval(intervalo)
    })

    return(
        <div className="max-w-xs mx-auto p-4">
            <h1 className="text-xl font-bold text-center mb-4">Dados DHT</h1>
            <p className="text-center mt-4 font-medium">
                Temperatura: {temperatura} °C
            </p>
            <p className="text-center mt-4 font-medium">
                Umidade: {umidade} %
            </p>
        </div>
    )
}