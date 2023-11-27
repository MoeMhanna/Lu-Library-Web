export class BookForUploadDto {
  bookFormData = new FormData();

  constructor(bookForUploadFormValue: any, bookFile: File) {
    const extension = bookFile.type.split('/')[1];
    this.bookFormData.append('bookName', bookForUploadFormValue.bookName);
    this.bookFormData.append('writer', bookForUploadFormValue.writer);
    this.bookFormData.append('description', bookForUploadFormValue.description);
    this.bookFormData.append('category', JSON.stringify(bookForUploadFormValue.category));
    this.bookFormData.append('file', bookFile, `file.${extension}`);
  }

  toJSON() {
    return this.bookFormData;
  }
}
