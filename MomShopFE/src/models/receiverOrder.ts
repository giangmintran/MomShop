export class ReceiveOrderDto {
    id: number;
    code: string;
    createDate: Date;
    receiveDate: Date;
    supplier: string;
    receiver: string;
    description: string;
    status: number;
}