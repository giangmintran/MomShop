export class ProductConst {
    public static mediaStatus = {
        ACTIVE: 'Đã đăng',
        PENDING: 'Trình duyệt',
        DELETED: 'Đã xoá',
        DRAFT: 'Bản nháp'
    }

    public static productType = [
        {
            name: 'Áo thun',
            code: 1
        },
        {
            name: 'Áo Sơ Mi',
            code: 2
        },
        {
            name: 'Áo Khoác',
            code: 3
        },
        {
            name: 'Quần',
            code: 4
        },
        {
            name: 'Phụ Kiến',
            code: 5
        },
    ]

    public static productStatus = [
        {
            name: 'Đang bán',
            code: 1
        },
        {
            name: 'Chưa mở bán',
            code: 2
        },
        {
            name: 'Khóa',
            code: 3
        },
    ]

    public static getProductType(code){
        const result = this.productType.find(item => 
            item.code == code
        );
        return result?.name ?? "";
    }

    public static getProductStatus(code){
        const result = this.productStatus.find(item => 
            item.code == code
        );
        return result?.name ?? "";
    }
    public static statusSeverity = {
        ACTIVE: 'success',
        PENDING: 'warning',
        DELETED: 'danger',
        DRAFT: 'secondary'
    }
    
}
export class OrderConst {
    public static mediaStatus = {
        ACTIVE: 'Đã đăng',
        PENDING: 'Trình duyệt',
        DELETED: 'Đã xoá',
        DRAFT: 'Bản nháp'
    }

    public static orderStatus = [
        {
            name: 'Tất cả',
            code: undefined
        },
        {
            name: 'Khởi tạo',
            code: 1
        },
        {
            name: 'Đã nhận',
            code: 2
        },
        {
            name: 'Đang giao',
            code: 3
        },
        {
            name: 'Hoàn thành',
            code: 4
        },
        {
            name: 'Đã hủy',
            code: 5
        },
    ]
    public static getStatus(code){
        const result = this.orderStatus.find(item => 
            item.code == code
        );
        return result?.name ?? "";
    }
    public static statusSeverity = {
        ACTIVE: 'success',
        PENDING: 'warning',
        DELETED: 'danger',
        DRAFT: 'secondary'
    }
}
export class ReceivedOrderConst {
    public static mediaStatus = {
        ACTIVE: 'Đã đăng',
        PENDING: 'Trình duyệt',
        DELETED: 'Đã xoá',
        DRAFT: 'Bản nháp'
    }

    public static receiveStatus = [
        {
            name: 'Tất cả',
            code: undefined
        },
        {
            name: 'Chưa thanh toán',
            code: 1
        },
        {
            name: 'Đã thanh toán',
            code: 2
        },
        {
            name: 'Đã hoàn thành',
            code: 3
        },
    ]
    public static getStatus(code){
        const result = this.receiveStatus.find(item => 
            item.code == code
        );
        return result?.name ?? "";
    }
    public static statusSeverity = {
        ACTIVE: 'success',
        PENDING: 'warning',
        DELETED: 'danger',
        DRAFT: 'secondary'
    }
}
export class ProductStatus{
    public static productType = [
        {
            name: 'Áo thun',
            code: 1
        },
        {
            name: 'Áo Sơ Mi',
            code: 2
        },
        {
            name: 'Áo Khoác',
            code: 3
        },
        {
            name: 'Quần',
            code: 4
        },
        {
            name: 'Phụ Kiến',
            code: 5
        },
    ]

    public static productStatus = [
        {
            name: 'Đang bán',
            code: 1,
            tag: 'success'
        },
        {
            name: 'Chưa mở bán',
            code: 2,
            tag: 'primary'
        },
        {
            name: 'Khóa',
            code: 3,
            tag: 'warning'
        },
    ]

    public static getProductType(code: number){
        const result = this.productType.find(item => 
            item.code == code
        );
        return result?.name ?? "";
    }

    public static getProductStatus(code: number){
        const result = this.productStatus.find(item => 
            item.code == code
        );
        return result?.name ?? "";
    }
    public static getProductTag(code: number){
        const result = this.productStatus.find(item => 
            item.code == code
        );
        return result?.tag ?? "";
    }
}