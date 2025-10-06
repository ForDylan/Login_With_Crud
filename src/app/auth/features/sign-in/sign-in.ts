import { Component, inject } from '@angular/core';
import { Auth } from '../../data-access/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { isRequierd, isEmail } from '../../utils/validators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GoogleButton } from '../../ui/google-button/google-button';


export interface FormSignIn
{
  email : FormControl<string | null>;
  password : FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButton],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css']
})

export  default class SignIn 
{
  private Formulario = inject(FormBuilder);
  private auth = inject(Auth);
  private _router = inject(Router);

  isRequierd(field: 'email' | 'password') 
  {
    return isRequierd(field, this.form);
  }

  isEmail()
  {
    return isEmail(this.form);
  }
  
  form  = this.Formulario.group<FormSignIn>
  ({
    email: this.Formulario.control('', 
      [

        Validators.required,
        Validators.email,
      ]),

    password: this.Formulario.control('', Validators.required), 
  });

  async sumbit()
  {
    if(this.form.invalid) return;
    try
    {
      const {email, password} = this.form.value;
      if(!email || !password) return;

      await this.auth.signIn({email, password});
      toast.success('Has Iniciado Sesión con exito');
      this._router.navigateByUrl('/tasks');
    }
    catch(error)
    {
      toast.error('No se pudo iniciar sesión')
    }
  }
  async submitWithGoogle()
  {
    try
    {
      await this.auth.signInWithGoogle();
      toast.success('Sesión iniciada con Google con exito');
      this._router.navigateByUrl('/tasks');
    }
    catch(error)
    {
      toast.error('No se pudo iniciar sesión con Google')
    }
  }
}