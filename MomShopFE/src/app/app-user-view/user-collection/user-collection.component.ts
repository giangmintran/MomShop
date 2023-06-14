import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserProductService } from 'src/services/user-product.service';
import { UserService } from 'src/services/user.service';
import { ProductStatus } from 'src/shared/AppConst';

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.scss']
})
export class UserCollectionComponent {
  baseUrl = 'http://localhost:5001';
  layout: string = 'list';
  listCollection;
  products: any[];
  productsPagination: any[];

  first: number = 0;

  rows: number = 12;
  total: number;
  page = 0;

  ProductStatus = ProductStatus;
  constructor(private router: Router,
    private http: HttpClient,
    public productServices : UserProductService,
    public userService : UserService
    // public toastr: ToastrService,
    // public dialogService: DialogService, 
    // private confirmationService: ConfirmationService,
    ) {
      this.userService.getAllCollection().subscribe((result:any)=>{
        this.listCollection = result.data;
      })
    }

  ngOnInit() {
    this.getProduct('all');
    // this.productsPagination = this.products.slice(this.first, (this.page + 1) * this.rows);
  }

  onPageChange(event) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.productsPagination = this.products.slice(this.first, (this.page + 1) * this.rows);
  }

  showDetail(param){
    this.router.navigate(['/collection-detail'], {queryParams: {id: param.id}});  
  }

  getProduct(param){
    this.productServices.getShirt(param).pipe(finalize(() => {
      this.resetPage();
    })).subscribe((data) => {
      this.products = data;
      console.log("this", this.products);
      this.total = this.products.length;
      // this.genlistAction(this.rows);
      // this.rows.forEach(element => {
      //   var productTypeName = this.listTypeProduct.find( e=> e.value == element.productType).name
      //   var productStatusName = this.listStatus.find( e=> e.value == element.status).code
      //   if(productTypeName)
      //   {
      //     element.productTypeName = productTypeName
      //   }
      //   if(productStatusName){
      //     element.productStatusName = productStatusName
      //   }
      //   element.imageUrl = element.imageUrl;
      // });
      // console.log(this.tableData);
    });
  }
  getDetailCollection(id){
      this.userService.getDetailCollection(id).subscribe((result:any)=>{
        this.products = result.data.products;
      })
  }

  resetPage(){
    this.first = 0;
    this.page = 0;
    this.productsPagination = this.products.slice(this.first, (this.page + 1) * this.rows);
  }

}