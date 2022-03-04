import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryNote } from '../delivery-note.model';

@Component({
  selector: 'jhi-delivery-note-detail',
  templateUrl: './delivery-note-detail.component.html',
})
export class DeliveryNoteDetailComponent implements OnInit {
  deliveryNote: IDeliveryNote | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryNote }) => {
      this.deliveryNote = deliveryNote;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
