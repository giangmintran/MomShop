export class ReceiveOrderDto {
    id: number;
    code: string;
    createdDate: string;
    receivedDate: string;
    supplier: string;
    receiver: string;
    description: string;
    status: number;
    statusName:string;
}