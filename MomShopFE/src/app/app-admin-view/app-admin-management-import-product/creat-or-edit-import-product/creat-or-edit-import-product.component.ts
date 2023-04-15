import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { UpdateProductDto } from "src/models/updateProduct";
import { ProductService } from "src/services/product.service";

@Component({
  selector: "app-creat-or-edit-import-product",
  templateUrl: "./creat-or-edit-import-product.component.html",
  styleUrls: ["./creat-or-edit-import-product.component.scss"],
})
export class CreatOrEditImportProductComponent {
  product: UpdateProductDto = new UpdateProductDto();
  saving = false;
  active;
  cities;
  name: string;
  test;
  listTypeProduct;
  category;
  quantity;
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public productServices: ProductService,
    public toastr: ToastrService
  ) {
    this.cities = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ];
    this.listTypeProduct = [
      { name: "Áo thun", value: 1 },
      { name: "Áo sơ mi", value: 2 },
      { name: "Áo khoác", value: 3 },
      { name: "Quần", value: 4 },
      { name: "Phụ kiện", value: 5 },
    ];
  }
  show(id?) {
    if (id) {
    }
    this.modal.show();
    this.active = true;
  }
  close() {
    this.active = false;
    this.modal.hide();
  }
  save() {
    this.productServices.createOrEdit(this.product).subscribe(() => {
      this.active = false;
      this.toastr.success("Thêm thành công", "Toartr fun!");
      this.modalSave.emit(null);
      this.close();
    });
  }
}
