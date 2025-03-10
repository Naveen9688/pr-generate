import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrSourceService } from './pr-source.service';
import { LogInService } from './log-in.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageServiceService } from './message-service.service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
    
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    PrSourceService,
    LogInService,
    MessageServiceService
  ]
})
export class AppComponent {
  title = 'pr-generate';
}
