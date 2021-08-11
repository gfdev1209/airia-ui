export class CreateReportInput {
  title!: string;
  memo!: string;
  recipientEmailAddresses!: string[];
  alertIds!: number[];
}
