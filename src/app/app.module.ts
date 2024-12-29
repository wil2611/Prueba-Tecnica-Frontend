import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Modulos
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { TasksComponent } from './components/tasks/tasks.component';
import { CategoryComponent } from './components/categories/categories.component';
import { UserComponent } from './components/users/users.component';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        SignInComponent,
        CategoryComponent,
        TasksComponent,
        UserComponent,
        DashboardComponent,
        NavbarComponent,
        SpinnerComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        })], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
