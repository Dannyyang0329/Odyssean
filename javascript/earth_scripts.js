// import Globe from 'globe.gl';
// import {Globe} from '//unpkg.com/globe.gl';

const globe = Globe();
var myDOMElement = document.getElementById('globeViz');
fetch('data/ne_110m_admin_0_countries.geojson').then((res) => res.json()).then((countries) => {
    globe(myDOMElement)
        .backgroundColor('rgba(0, 0, 0, 0.0)')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        // polygon settings
        .polygonsData(countries.features)
        .polygonCapColor(() => 'rgba(200, 0, 0, 0.0)')
        .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
        .polygonStrokeColor(() => 'skyblue')
        .polygonLabel(({ properties: d }) => `<br><br><b>${d.ADMIN}</b>`)
        .polygonAltitude(() => '0.01')
        // Add hover event
        .onPolygonHover((hoverD) => globe
            .polygonAltitude(
                hoverD ? ({ properties: d }) => (d === hoverD.properties ? 0.03 : 0.01) : 0.01
            )
            .polygonCapColor(
                hoverD ? ({ properties: d }) => (d === hoverD.properties ? 'rgba(255, 165, 0, 0.8)' : 'rgba(200, 0, 0, 0.0)') : 'rgba(200, 0, 0, 0.0)'
            )
        )

        // Add click event
        .onPolygonClick(function event({ properties: d }) {
            // alert(`${d.ADMIN} (${d.ISO_A2}) clicked!`);
            localStorage.setItem("country", d.ADMIN);
            window.open("explore.html", "_self");
        })
    
    const camera = globe.camera();
    const renderer = globe.renderer();
    renderer.setAnimationLoop(() => {
        if(globe.pointOfView().altitude <= 2) {
            globe.pointOfView({ altitude: 2 });
        }
        renderer.render(globe.scene(), camera);
    });
    globe.controls().update();


    // Add rotation
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.25;
    // Change the camera position when the window is resized
    window.addEventListener('resize', () => {
        globe.width(window.innerWidth);
        globe.height(window.innerHeight);
    }, false);
});