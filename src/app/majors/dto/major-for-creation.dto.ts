export class MajorForCreationDto {
  categoryName: string;

  constructor(categoryName: string) {
    this.categoryName = categoryName;
  }

  toJSON() {
    return this;
  }
}
