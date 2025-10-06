import { FormGroup } from "@angular/forms";

export const isRequierd = (field: 'email' |'password' , form : FormGroup) =>
{
    const control = form.get(field);

    return control  &&  control.touched  && control.hasError('required');
};

export const isEmail = (form : FormGroup) =>
{
    const control = form.get('email');
    return control  &&  control.touched  && control.hasError('email');
};