import { Routes } from '@angular/router';
import { PrDashbaordComponent } from './pr-dashbaord/pr-dashbaord.component';
import { ExistingPrComponent } from './existing-pr/existing-pr.component';
import { OneTimeEntryComponent } from './one-time-entry/one-time-entry.component';
import { NewPrGeneratoComponent } from './new-pr-generato/new-pr-generato.component';
import { PrDetailsComponent } from './pr-details/pr-details.component';
import { PrTabledataComponent } from './pr-tabledata/pr-tabledata.component';
import { LogInComponent } from './log-in/log-in.component';
import { MajorPrGenerateComponent } from './major-pr-generate/major-pr-generate.component';
import { TotalprsComponent } from './totalprs/totalprs.component';
import { PrRangeComponent } from './pr-range/pr-range.component';
import { PrZoneDashboardComponent } from './pr-zone-dashboard/pr-zone-dashboard.component';
import { ChiefOfficeDashboardComponent } from './chief-office-dashboard/chief-office-dashboard.component';
import { MajorPrTabledataComponent } from './major-pr-tabledata/major-pr-tabledata.component';

export const routes: Routes = [

    { path: 'pr-dashbaord', component: PrDashbaordComponent },
    { path: 'pr-dashboard/:usertypeId/:unitid/:unitTypeName', component: PrDashbaordComponent },
    { path: 'new-pr-generato', component: NewPrGeneratoComponent },
    { path: 'new-pr-generato/:minorPrIdss/:prSectionNo', component: NewPrGeneratoComponent },
    { path: 'one-time-entry', component: OneTimeEntryComponent },
    { path: 'existing-pr', component: ExistingPrComponent },
    { path: 'pr-details', component: PrDetailsComponent },
    { path: 'major-pr-generate', component: MajorPrGenerateComponent },
    { path: 'major-pr-generate/:majorPrIdss/:prSectionNo', component: MajorPrGenerateComponent},
    { path: 'pr-tabledata', component: PrTabledataComponent },
    { path: 'pr-tabledata/:usertypeId/:unitid/:unitTypeName/:totalprminorsection', component: PrTabledataComponent},
    { path: 'pr-tabledata/:value/:usertypeId/:unitid/:unitTypeName/:totalprminorsection', component: PrTabledataComponent},
    { path: 'major-pr-tabledata', component: MajorPrTabledataComponent },
    { path: 'major-pr-tabledata/:usertypeId/:unitid/:unitTypeName', component: MajorPrTabledataComponent},
    { path: 'major-pr-tabledata/:value/:usertypeId/:unitid/:unitTypeName', component: MajorPrTabledataComponent},
    { path: 'log-in', component: LogInComponent },
    { path: 'totalprs/:ifhrmsNo', component: TotalprsComponent },
    { path: 'pr-range', component: PrRangeComponent },
    { path: 'pr-range-dashBoard/:usertypeId/:unitid/:unitTypeName', component: PrRangeComponent},
    { path: 'pr-zone-dashboard/:usertypeId/:unitid/:unitTypeName', component: PrZoneDashboardComponent },
    { path: 'chief-office-dashboard/:usertypeId/:unitid/:unitTypeName', component: ChiefOfficeDashboardComponent },
    { path: '', redirectTo: '/log-in', pathMatch: 'full' }, 
];
