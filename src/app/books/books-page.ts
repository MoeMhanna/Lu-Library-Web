import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookUploadModal } from './book-upload-modal/book-upload-modal';
import { ActionButtonInterface } from '../shared/components/action-button/interface/action-button.interface';

@Component({
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss'
})
export class BooksPage implements OnInit, OnDestroy {
  createBookAction: ActionButtonInterface = {
    faIcon: ['fas', 'plus-circle'],
    label: 'Upload Book', handler: () => {
      this.bookUploadModal();
    }
  };

  constructor(private matDialog: MatDialog) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  private bookUploadModal() {
    this.matDialog.open(BookUploadModal);
  }
}
