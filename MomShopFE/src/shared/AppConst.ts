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