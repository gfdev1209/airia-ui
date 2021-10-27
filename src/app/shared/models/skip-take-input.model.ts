export class SkipTakeInput {
  skip!: number;
  take!: number;
  parameters?: any;
  filters?: any;

  constructor(skip: number, take: number) {
    this.skip = skip;
    this.take = take;
  }
}
