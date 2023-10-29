import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {

    static ValidateName(control: AbstractControl) {
        const value = control.value as string;
        if (value.includes('test')) {
            return {
                invalidName: true
            };
        }
        return null;
    }

    static ValidateDate(control: FormGroup) {
        const checkinDate: any = new Date(control.get('checkinDate')?.value);
        const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
        const bookingDate: any = new Date(control.get('bookingDate')?.value);
        const diffTime = checkoutDate - checkinDate
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            control.get('checkoutDate')?.setErrors({ 
                invalidDate: true 
            });
            return {
                invalidCheckinDate: true
            };
        }
        return null;
    
    }



    static ValidateSpecialCharacters() {
        return (control: AbstractControl) => {
            const value = control.value as string;
            const specialCharacters = ['@', '!', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?', '/', '~', '`', '[', ']', ';', "'"];
            for (let i = 0; i < specialCharacters.length; i++) {
                if (value.includes(specialCharacters[i])) {
                    return {
                        invalidSpecialCharacters: true
                    };
                }
            }
            return null;
        }
    }
    // static ValidateSpecialCharacters(control: AbstractControl) {
    //     const value = control.value as string;
    //     const specialCharacters = ['@','!','#','$','%','^','&','*','(',')','_','+','{','}','|',':','"','<','>','?','/','~','`','[',']',';',"'" ];
    //     for (let i = 0; i < specialCharacters.length; i++) {
    //         if (value.includes(specialCharacters[i])) {
    //             return {
    //                 invalidSpecialCharacters: true
    //             };
    //         }
    //     }
    //     return null;
    // }

}
