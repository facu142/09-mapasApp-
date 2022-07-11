import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #mapa {
    width: 100%;
    height: 100%;
  }
  `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

    console.log('Full screen component');

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-63.7596199025364 , -31.29964137555779 ],
      zoom: 15
    });
  }


}
