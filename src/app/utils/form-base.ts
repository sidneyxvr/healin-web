import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from './generic-form-validation';

export abstract class FormBaseComponent {

    loading: boolean = false;

    displayMessage: DisplayMessage = {};
    genericValidator: GenericValidator;
    validationMessages: ValidationMessages;

    changeNotSalved: boolean;

    protected configureMessageValidationsBase(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected configureValidationFormBase(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.validateForm(formGroup)
        });
    }

    protected validateForm(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processarMensagens(formGroup);
        this.changeNotSalved = true;
    }
}