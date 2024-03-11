import { User, UserSchema } from '../user/user.schema';
import { PaginationDto } from '../dto/pagination.dto';
import { Category, CategorySchema } from '../category/category.schema';
import { Product, ProductSchema } from '../product/product.schema';
import { Cart, CartSchema } from "../cart/schema/cart.schema";
import { Order, OrderSchema } from "../order/order.schema";
import { PaymentHistory, PaymentHistorySchema } from "../payment-history/payment-history.schema";

const jwtConstants = {
  secret: 'mevBotByFcs@jwt.secret',
  expiresIn: '365d',
};

const MailerConfig = {
  transport: {
    host: 'email-smtp.ap-southeast-1.amazonaws.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: 'AKIA5XCUQNQ5H2VOFOZT',
      pass: 'BPy8s32CDqRd399aeDNMNOlcatBDn2gbLUt09Nw2kqF1',
    },
  },
  defaults: {
    from: 'Fireal@123 <no-reply@fireal.io>',
  },
};

const QueueService = {
  prefix: 'bq',
  stallInterval: 5000,
  nearTermWindow: 1200000,
  delayedDebounce: 1000,
  // redis: {
  //   host: '192.168.90.15',
  //   port: 6012,
  //   db: 0,
  //   options: {},
  // },
  redis: {
    host: 'redis-12597.c238.us-central1-2.gce.cloud.redislabs.com',
    port: 12597,
    db: 0,
    user: 'default',
    password: '0JbAuqLAmApFsxhEErWmO4G0EbTHol3J',
    options: {},
  },
  isWorker: true,
  getEvents: true,
  sendEvents: true,
  storeJobs: true,
  ensureScripts: true,
  activateDelayedJobs: false,
  removeOnSuccess: true,
  removeOnFailure: true,
  redisScanCount: 100,
};

const randomAlphanumeric = (length: number) => {
  const chars = '0123456789';
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const MongoFeature = [
  { name: User.name, schema: UserSchema },
  { name: Category.name, schema: CategorySchema },
  { name: Product.name, schema: ProductSchema },
  { name: Cart.name, schema: CartSchema },
  { name: Order.name, schema: OrderSchema },
  { name: PaymentHistory.name, schema: PaymentHistorySchema },
];

const getPaginationData = (dto: PaginationDto) => {
  const skip = dto.page && dto.size ? dto.page * dto.size : 0;
  return { skip, size: dto.size ?? 10 };
};

export {
  jwtConstants,
  MongoFeature,
  MailerConfig,
  getPaginationData,
  randomAlphanumeric,
  QueueService,
};
