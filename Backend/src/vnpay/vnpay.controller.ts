import { Body, Controller, Post, Req } from '@nestjs/common';
import { VnpayService } from './vnpay.service';

@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post('create-payment-url')
  createPaymentUrl(@Body() body: { totalAmount: number; orderId: number }) {
    return this.vnpayService.createPaymentUrl(body.totalAmount, body.orderId);
  }
}
