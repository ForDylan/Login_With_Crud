import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { isRequierd } from '../../utils/validators';
import { isEmail } from '../../utils/validators';
import { Auth, User } from '../../data-access/auth';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { GoogleButton } from '../../ui/google-button/google-button';
interface FormSingUp
{
  email : FormControl<string | null>;
  password : FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButton],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css']
})

export default class SignUp 
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
  
  form  = this.Formulario.group<FormSingUp>
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

      await this.auth.signUp({email, password});
      toast.success('Usuario registrado con exito');
      this._router.navigateByUrl('/tasks');
    }
    catch(error)
    {
      toast.error('No se pudo registrar el usuario')
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
