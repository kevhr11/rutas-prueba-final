import React, { useEffect, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  origen: string;
  destino: string;
}

const Mapa: React.FC<Props> = ({ origen, destino }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]); // Referencia a los marcadores
  const routeLayerRef = useRef<L.Polyline | null>(null); // Referencia a la capa de la ruta

  useEffect(() => {
    // Verificar que el contenedor del mapa esté disponible y que el mapa no esté inicializado
    if (mapContainerRef.current && !mapRef.current) {
      // Inicializar el mapa
      mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 2);

      // Agregar capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      // Ejemplo de solicitud de búsqueda de coordenadas para el destino (reemplaza con tu propia lógica)
      searchCoordinates(destino, false);
    }
  }, [destino]);

  useEffect(() => {
    // Actualizar el mapa cuando cambia el origen
    if (origen && mapRef.current) {
      // Ejemplo de solicitud de búsqueda de coordenadas para el origen (reemplaza con tu propia lógica)
      searchCoordinates(origen, true);
    }
  }, [origen]);

  const searchCoordinates = async (query: string, isOrigin: boolean) => {
    try {
      // Hacer la solicitud a la API de OpenStreetMap para obtener coordenadas
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&type=city`
      );

      // Verificar si hay resultados de búsqueda
      if (response.data.length > 0) {
        // Obtener las coordenadas de la primera coincidencia
        const { lat, lon } = response.data[0];

        // Centrar el mapa en las coordenadas encontradas
        mapRef.current?.setView([parseFloat(lat), parseFloat(lon)], 13);

        // Eliminar marcadores y capa de ruta anteriores si existen
        markersRef.current.forEach((marker) =>
          marker.removeFrom(mapRef.current!)
        );
        if (routeLayerRef.current) {
          routeLayerRef.current.removeFrom(mapRef.current!);
        }

        // Añadir marcador alrededor de las coordenadas encontradas
        const marker = L.marker([parseFloat(lat), parseFloat(lon)], {
          icon: L.icon({
            iconUrl: isOrigin
              ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
              : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
          }),
        }).addTo(mapRef.current!);

        // Si es el destino, agregar un marcador diferente
        if (!isOrigin) {
          const destinationMarker = L.marker(
            [parseFloat(lat), parseFloat(lon)],
            {
              icon: L.icon({
                iconUrl:
                  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
                shadowSize: [41, 41],
              }),
            }
          ).addTo(mapRef.current!);
        }

        // Añadir marcador a la lista de marcadores
        markersRef.current.push(marker);

        // Si hay un origen y un destino, buscar la ruta entre ellos
        if (origen && destino) {
          // Obtener coordenadas del origen y destino
          const originCoords = markersRef.current[0].getLatLng();
          const destinationCoords = markersRef.current[1].getLatLng();

          // Realizar solicitud a la API de enrutamiento OSRM
          const routeResponse = await axios.get(
            `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?geometries=geojson`
          );

          // Verificar si se obtuvo una ruta
          if (routeResponse.data.routes.length > 0) {
            // Obtener la geometría de la ruta
            const routeGeometry = routeResponse.data.routes[0].geometry;

            // Decodificar la geometría y agregar la capa de la ruta al mapa
            const decodedRoute = L.polyline(
              routeGeometry.coordinates.map((coord: number[]) => [
                coord[1],
                coord[0],
              ])
            ).addTo(mapRef.current!);
            routeLayerRef.current = decodedRoute;
          } else {
            console.error(
              "No se encontró una ruta entre el origen y el destino."
            );
          }
        }
      } else {
        console.error(
          `No se encontraron resultados de la búsqueda para ${
            isOrigin ? "el origen" : "el destino"
          }.`
        );
      }
    } catch (error) {
      console.error(
        `Error al buscar coordenadas para ${
          isOrigin ? "el origen" : "el destino"
        }:`,
        error
      );
    }
  };

  return <div ref={mapContainerRef} style={{ height: "500px" }}></div>;
};

export default Mapa;
