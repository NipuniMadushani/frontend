export class OrderDetails {
  constructor(
              public orderTotal?: number,
              public orderCount?: number,
              public orderDate?: string,
              public address?: string,
              public imageUrl?: string
              ) {}
}
