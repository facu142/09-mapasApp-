import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapa-conteiner{
    width: 100%;
    height: 100%;
  }
  .row{
    background-color: white;
    border-radius: 5px;
    bottom: 50px;
    position: fixed;
    z-index: 999;
    left: 50px;
    padding: 10px;
    width: 400px
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-63.7596199025364, -31.29964137555779];


  constructor() {
    console.log('constructor', this.divMapa);
  }
  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=> {})
    this.mapa.off('zoomend', ()=> {})
    this.mapa.off('zoommove', ()=> {})
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });


    //Event listener
    this.mapa.on('zoom', (ev) => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    })

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    })
    // Movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target

      const { lng, lat } = target.getCenter()
      this.center = [lng, lat]
    })

  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }


  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor))
  }

}
