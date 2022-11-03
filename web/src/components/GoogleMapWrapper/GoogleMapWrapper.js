import React, { useEffect, useRef } from 'react'

const GMap = ({
  center,
  stores = [],
  height = '80vh',
  onMapLoad = () => {},
}) => {
  let googleMap = null
  let googleMapRef = useRef(null)

  useEffect(() => {
    if (window.google) {
      googleMap = initGoogleMap()
      stores.forEach((store) => {
        if (store.lat && store.lng) {
          createMarker(store)
        }
      })
      onMapLoad(googleMapRef.current)
    }
  }, [window.google, center, stores])

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center,
      zoom: 13,
    })
  }

  function attachInfo(marker, infoContainer) {
    const infowindow = new window.google.maps.InfoWindow({
      content: infoContainer,
    })

    marker.addListener('click', () => {
      infowindow.open(marker.get('map'), marker)
    })
  }

  // create marker on google map
  const createMarker = (store) => {
    const marker = new window.google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      map: googleMap,
    })

    const container = `<div style="display:flex;flex-direction:column">
      <h3>${store.name}</h3>
      <p>${store.street1}</p>
      <div style="display:flex;flex-direction:row">
        <a style="color:blue;margin-top:5px;margin-left:auto" href="/store/${store.id}">View Store Page Here</a>
      </div>
    </div>`

    attachInfo(marker, container)
  }

  return (
    <div
      ref={googleMapRef}
      className="w-full"
      style={{
        height,
      }}
    />
  )
}

export default GMap
