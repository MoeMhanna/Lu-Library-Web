import { ClientBase } from '../../client.base';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewsModel } from '../model/reviews.model';
import { ReviewsForCreationDto } from '../dto/reviews-for-creation.dto';
import { StarCountsModel } from '../model/star-counts.model';

@Injectable({providedIn: 'root'})
export class ReviewsClient extends ClientBase {
  private url = this.fullUrl + '/Reviews';

  public getReviewsForOneBook(bookId: string): Observable<Array<ReviewsModel>> {
    return this.httpClient.get<Array<ReviewsModel>>(`${this.url}/${bookId}/book-reviews`);
  }

  public createReview(bookId: string, reviewsForCreationDto: ReviewsForCreationDto): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${bookId}`, reviewsForCreationDto);
  }

  public getTotalStarsLevelsPercentages(): Observable<StarCountsModel> {
    return this.httpClient.get<StarCountsModel>(`${this.url}/stars-percentages`);
  }
}
