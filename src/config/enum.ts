export enum SystemRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
}

export enum TypeAuth {
  REGISTER = 'register',
  LOGIN = 'login',
}

export enum TypeUpdateCart {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export enum OrderStatus {
  CREATE = 'create',
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
  DELIVERING = 'delivering',
  SUCCESS = 'success',
}

export enum PaymentMethod {
  COD = 'cod',
  VNPAY = 'vnpay',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  FAILED = 'failed',
}

export enum DeliveryStatus {
  CONFIRM = 'confirm',
  CREATE = 'create',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
}

export enum UpdateRoleType {
  ADD = 'add',
  REMOVE = 'remove',
}
