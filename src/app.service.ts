import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  public constructor(@InjectSentry() private readonly client: SentryService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Interval(10000)
  handleInterval() {
    try {
      this.logger.debug('Called every 10 seconds');
      const a = {};
      (a as any).foo();
    } catch (e) {
      this.client.instance().captureException(e);
      throw e;
    }
  }
}
