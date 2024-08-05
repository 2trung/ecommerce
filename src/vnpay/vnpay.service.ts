import { Injectable } from '@nestjs/common';
import { VNPay, ignoreLogger, ProductCode, VnpLocale } from 'vnpay';

@Injectable()
export class VnpayService {
  constructor() {}

  createPaymentUrl(totalAmount: number, orderId: number) {
    const vnpay = new VNPay({
      tmnCode: 'JUOYUPBK',
      secureSecret: 'GVBXSRJVJPKTVAZXIRTFHCLEPEUPICIZ',
      vnpayHost: 'https://sandbox.vnpayment.vn',
      testMode: true,
      enableLog: true,
      loggerFn: ignoreLogger,
    });
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: totalAmount,
      vnp_IpAddr: '0.0.0.0',
      vnp_TxnRef: orderId + '',
      vnp_OrderInfo: 'Thanh toan don hang' + orderId,
      vnp_OrderType: ProductCode.Fashion,
      vnp_ReturnUrl: 'http://localhost:5173/vnpay-return',
      vnp_Locale: VnpLocale.VN,
    });
    return paymentUrl;
  }
}
