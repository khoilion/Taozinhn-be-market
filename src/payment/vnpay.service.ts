import { Injectable } from '@nestjs/common';
import { Order } from '../order/order.schema';
import { Buffer } from 'node:buffer';
import * as moment from 'moment';
import { OrderRepository } from '../order/order.repository';
import { OrderStatus, PaymentStatus } from '../config/enum';
import { PaymentHistoryRepository } from '../payment-history/payment-history.repository';
import { PaymentHistory } from '../payment-history/payment-history.schema';
import { ProductRepository } from '../product/product.repository';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const querystring = require('qs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');
@Injectable()
export class VnpayService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly paymentHistoryRepo: PaymentHistoryRepository,
    private readonly productRepo: ProductRepository,
  ) {}

  async createPaymentUrl(order: Order) {
    const date = new Date();
    let vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.VNPAY_TMN_CODE,
      vnp_Locale: 'vn',
      vnp_Amount: order.totalPayment * 100,
      vnp_CreateDate: moment(date).format('YYYYMMDDHHmmss'),
      vnp_CurrCode: 'VND',
      vnp_IpAddr: '127.0.0.1',
      vnp_OrderInfo: `Thanh toan don hang ${order['_id']}`,
      vnp_ReturnUrl: process.env.VNPAY_RETURN_URL,
      vnp_TxnRef: moment(date).format('DDHHmmss'),
      vnp_OrderType: 'other',
    };
    vnpParams = this.sortObject(vnpParams);
    const signData = querystring.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.VNPAY_SECRET_KEY);
    vnpParams['vnp_SecureHash'] = hmac
      .update(Buffer.from(signData, 'utf-8'))
      .digest('hex');
    return `${process.env.VNPAY_URL}?${querystring.stringify(vnpParams, {
      encode: false,
    })}`;
  }

  async returnUrl(query: any) {
    if (!query) return;
    const { secureHash, orderId, rspCode, amount, signed } =
      this.getData(query);
    if (signed === secureHash) {
      const order = await this.orderRepo.findById(orderId);
      if (!order) return { code: 1, message: 'Order not found' };
      if (order.totalPayment !== amount)
        return { code: 2, message: 'Order amount not match' };
      return {
        code: rspCode,
        message: 'success',
      };
    } else {
      return {
        code: 97,
        message: 'success',
      };
    }
  }

  async ipnUrl(query: any) {
    if (!query) return;
    const { secureHash, orderId, rspCode, amount, signed } =
      this.getData(query);
    const paymentStatus = rspCode === '00' ? 'paid' : 'failed';
    const order = await this.orderRepo.findById(orderId);
    if (!orderId) return { code: '01', message: 'Order not found' };
    if (order.totalPayment !== amount)
      return { code: '02', message: 'Order amount not match' };
    if (signed !== secureHash) return { code: '97', message: 'Invalid hash' };
    if (paymentStatus === 'paid') {
      order.paymentStatus = PaymentStatus.PAID;
      order.status = OrderStatus.CONFIRM;
      await this.orderRepo.update(orderId, order);
      await this.createPaymentHistory(query);
      await this.updateProductQuantity(orderId);
      return { code: '00', message: 'success' };
    } else {
      order.paymentStatus = PaymentStatus.FAILED;
      order.status = OrderStatus.CANCEL;
      await this.orderRepo.update(orderId, order);
      await this.createPaymentHistory(query);
      return { code: '00', message: 'success' };
    }
  }

  async updateProductQuantity(orderId: string) {
    const order = await this.orderRepo.findById(orderId);
    const products = order.products;
    for (const product of products) {
      const productInDb = await this.productRepo.findById(product['_id']);
      productInDb.quantity -= product.quantity;
      productInDb.updatedAt = new Date();
      await this.productRepo.updateById(product['_id'], productInDb);
    }
  }

  async createPaymentHistory(query: any) {
    const history = new PaymentHistory();
    history.orderId = query['vnp_OrderInfo'].split(' ')[4];
    history.amount = query['vnp_Amount'] / 100;
    history.bankCode = query['vnp_BankCode'];
    history.cardType = query['vnp_CardType'];
    history.payDate = query['vnp_PayDate'];
    history.status = query['vnp_ResponseCode'] === '00' ? 'paid' : 'failed';
    history.transactionCode = query['vnp_TransactionNo'];
    history.bankTranNo = query['vnp_BankTranNo'];
    return this.paymentHistoryRepo.create(history);
  }

  getData(query: any) {
    const secureHash = query['vnp_SecureHash'];
    const orderId = query['vnp_OrderInfo'].split(' ')[4];
    const rspCode = query['vnp_ResponseCode'];
    const amount = query['vnp_Amount'] / 100;
    delete query['vnp_SecureHashType'];
    delete query['vnp_SecureHash'];
    const vnp_Params = this.sortObject(query);
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.VNPAY_SECRET_KEY);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    return {
      secureHash,
      orderId,
      rspCode,
      amount,
      signed,
    };
  }

  sortObject(obj): any {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }
}
