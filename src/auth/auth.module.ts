import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
