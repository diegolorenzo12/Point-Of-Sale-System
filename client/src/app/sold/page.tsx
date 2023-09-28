'use client'
import React, { useEffect, useState } from 'react';

const SoldPage = () => {
    const [soldItems, setSoldItems] = useState<number>(0);

    useEffect(() => {
        // Aquí deberías obtener la cantidad de productos vendidos.
        // Este es solo un ejemplo, reemplázalo con tu lógica para obtener los datos reales.
        const fetchSoldItems = async () => {
            // Para el API que muestra la cantidad de productos vendidos
            // const response = await fetch('/api/sold-items');
            // const data = await response.json();
            // setSoldItems(data.count);

            // Aquí se va a poner un número fijo de 50, se puede cambiar como lo muestra el comentario anterior
            setSoldItems(50);
        };

        fetchSoldItems();
    }, []);

    return (
        <div>
            <h1>Productos Vendidos</h1>
            <p>Se han vendido un total de {soldItems} productos.</p>
        </div>
    );
};

export default SoldPage;
