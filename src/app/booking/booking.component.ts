import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeAll, mergeMap, switchMap } from 'rxjs';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService, private fb: FormBuilder, private bookingService: BookingService) { }

  // patchValue vs setValue
  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: new Date(2023, 10, 21), // Month is 0-based, so 10 represents November
      checkoutDate: new Date('23-Nov-2023'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: new Date(),
      // mobileNumber: '',
      // guestName: '',
      address: this.fb.group({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      }), // nested form group
      guests: this.fb.array([
        this.fb.group({
          name: '',
          age: '',
          gender: '',
        }),
      ]),
      tnc: '',

    });
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      // bookingId: [''],
      roomId: new FormControl('', [Validators.required]),
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: ['', [Validators.required]],
      checkoutDate: ['', [Validators.required]],
      bookingStatus: [''],
      bookingAmount: ['', [Validators.required]],
      bookingDate: new Date(),
      mobileNumber: ['', [Validators.required]],
      guestName: ['', [Validators.required, Validators.minLength(5)]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
      }), // nested form group
      guests: this.fb.array([
        this.fb.group({
          name: ['', [Validators.required]],
          age: new FormControl('', [Validators.required]),
          gender: ['', [Validators.required]],
        }),
      ]),  // dynamic form group in a nested form array
      tnc: new FormControl(false, [Validators.requiredTrue]),
    }
    // {updateOn : 'blur'},
    );

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   // console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data) => {
    //     console.log(data);
    //   });
    // });

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))).subscribe((data) =>
        console.log(data));

    this.getBookingData();
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
    //   console.log(data);
    // });

    this.bookingForm.reset({
      roomId: '',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: new Date(),
      mobileNumber: '',
      guestName: '',
      address: this.fb.group({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      }), // nested form group
      guests: this.fb.array([
        this.fb.group({
          name: '',
          age: '',
          gender: '',
        }),
      ]),
      tnc: '',

    });
  }


  addGuest() {
    this.guests.push(this.fb.group({
      name: [''],
      age: new FormControl(''),
      gender: [''],
    }));
  } // add a form group to the form array

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  } // addControl is used to add a form control to the form group

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
    // if(this.bookingForm.contains('passport')){
    //   this.bookingForm.removeControl('passport');
    // }
  } // removeControl is used to remove a form control from the form group

  removeGuest(i: number) {
    this.guests.removeAt(i);
  } // remove a form group from the form array

}
