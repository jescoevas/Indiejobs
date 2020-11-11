import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private menuController:MenuController, private router:Router) {}

  ngOnInit(){
    this.menuController.close()
  }

  cerrarSesion(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
}
