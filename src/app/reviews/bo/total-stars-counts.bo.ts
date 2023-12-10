import { StarCountsModel } from '../model/star-counts.model';

export class TotalStarsCountsBo {
  oneStarPercentage: number;
  twoStarsPercentage: number;
  threeStarsPercentage: number;
  fourStarsPercentage: number;
  fiveStarsPercentage: number;

  constructor(starCountsModel: StarCountsModel) {
    this.oneStarPercentage = starCountsModel.oneStarPercentage;
    this.twoStarsPercentage = starCountsModel.twoStarsPercentage;
    this.threeStarsPercentage = starCountsModel.threeStarsPercentage;
    this.fourStarsPercentage = starCountsModel.fourStarsPercentage;
    this.fiveStarsPercentage = starCountsModel.fiveStarsPercentage;
  }
}
