import React, { useEffect, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  country: string;
}

const Mapa: React.FC<Props> = ({ country }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Verificar que el contenedor del mapa esté disponible y que el mapa no esté inicializado
    if (mapContainerRef.current && !mapRef.current) {
      // Inicializar el mapa
      mapRef.current = L.map(mapContainerRef.current).setView(
        [51.505, -0.09],
        13
      );

      // Agregar capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Ejemplo de solicitud de búsqueda de coordenadas (reemplaza con tu propia lógica)
      searchCoordinates(country);
    }
  }, [country]);

  const searchCoordinates = async (query: string) => {
    try {
      // Hacer la solicitud a la API de OpenStreetMap
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&type=city`
      );

      // Verificar si hay resultados de búsqueda
      if (response.data.length > 0) {
        // Obtener las coordenadas de la primera coincidencia
        const { lat, lon } = response.data[0];

        // Centrar el mapa en las coordenadas encontradas
        if (mapRef.current) {
          mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 13);
        }
      } else {
        // Manejar el caso en el que no se encontraron resultados
        console.error("No se encontraron resultados de la búsqueda.");
      }
    } catch (error) {
      // Manejar errores en la solicitud a la API
      console.error("Error al buscar coordenadas:", error);
    }
  };

  return <div ref={mapContainerRef} style={{ height: "500px" }}></div>;
};

export default Mapa;
