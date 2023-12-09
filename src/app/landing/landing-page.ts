import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMajorsLoaded } from '../majors/+state/majors.selectors';
import { Subscription } from 'rxjs';
import { MAJORS_KEY } from '../majors/+state/majors.reducers';
import { MajorsBo } from '../majors/bo/majors.bo';
import { MajorsActions } from '../majors/+state/majors.actions';
import { MajorServices } from '../majors/services/major.services';
import { HttpStatusEnum } from '../shared/enums/http-status.enum';
import { DonutChartIDataInterface } from '../components/donut-chart/donut-chart.component';
import { selectReviewsLoaded } from '../reviews/+state/stars-state/stars.selectors';
import { STARS_KEY, StarsReducersState } from '../reviews/+state/stars-state/stars-reducers-state';
import { HistogramBinInterface } from '../components/histogram-chart/interface/histogram-bin.interface';
import { StartsActions } from '../reviews/+state/stars-state/starts.actions';
import * as _ from 'lodash';

declare const Gradient: any;

@Component({
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit, OnDestroy {
  public majorsState$ = this.store.select(selectMajorsLoaded);
  public reviewsState$ = this.store.select(selectReviewsLoaded);
  public majorBosList: Array<MajorsBo>;
  public booksNumberForDonutChart: Array<DonutChartIDataInterface>;
  public downloadNumberForDonutChart: Array<DonutChartIDataInterface>;
  public reviewsForDonutChart: Array<DonutChartIDataInterface>;
  public HttpStatusEnum = HttpStatusEnum;
  public booksNumberPerMajorForHistogram: Array<HistogramBinInterface> = [];
  public downloadsNumberPerMajorForHistogram: Array<HistogramBinInterface> = [];
  private subscription = new Subscription();

  constructor(private store: Store,
              public majorServices: MajorServices) {
  }

  public majorStateSubscription(): void {
    const majorStateSubscription$ = this.majorsState$
      .subscribe({
        next: (majorsState) => {
          if (majorsState.status === HttpStatusEnum.success) {
            this.majorBosList = majorsState[MAJORS_KEY];
            this.booksNumberForDonutChart = this.majorServices.getMajorsBooksNumber(this.majorBosList);
            this.downloadNumberForDonutChart = this.majorServices.getMajorsDownloadNumber(this.majorBosList);
            _.each(this.majorBosList, (major) => {
              this.booksNumberPerMajorForHistogram.push({
                bin: major.categoryName,
                color: '#5b9bd5',
                value: major.booksNumber
              });
              this.downloadsNumberPerMajorForHistogram.push({
                bin: major.categoryName,
                color: '#c0702d',
                value: major.downloadNumber
              });
            });
          }
        }
      })
    this.subscription.add(majorStateSubscription$);
  }

  public reviewStateSubscription(): void {
    const reviewStateSubscription$ = this.reviewsState$
      .subscribe({
        next: (reviewsState: StarsReducersState) => {
          if (reviewsState.status === HttpStatusEnum.success) {
            const reviews = reviewsState[STARS_KEY];
            this.reviewsForDonutChart = [
              {
                category: 'One Star',
                value: reviews.oneStarPercentage,
                readableValue: reviews.oneStarPercentage.toString()
              },
              {
                category: 'Two Stars',
                value: reviews.twoStarsPercentage,
                readableValue: reviews.twoStarsPercentage.toString()
              },
              {
                category: 'Three Stars',
                value: reviews.threeStarsPercentage,
                readableValue: reviews.threeStarsPercentage.toString()
              },
              {
                category: 'Four Stars',
                value: reviews.fourStarsPercentage,
                readableValue: reviews.fourStarsPercentage.toString()
              },
              {
                category: 'Five Stars',
                value: reviews.fiveStarsPercentage,
                readableValue: reviews.fiveStarsPercentage.toString()
              },
            ]
          }
        }
      })
    this.subscription.add(reviewStateSubscription$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.majorStateSubscription();
    this.reviewStateSubscription();
    this.store.dispatch(MajorsActions.loadMajors());
    this.store.dispatch(StartsActions.loadTotalStarsLevelsPercentages());
  }

  private getGradientColorList(minGradientColor: string, maxGradientColor: string, count: number): Array<string> {
    let gradientColorList: Array<string> = [];
    if (count >= 2) {
      gradientColorList = new Gradient()
        .setColorGradient(minGradientColor, maxGradientColor)
        .setMidpoint(count)
        .getColors();
    }
    gradientColorList.unshift(minGradientColor);
    gradientColorList.push(maxGradientColor);
    return gradientColorList;
  }
}
