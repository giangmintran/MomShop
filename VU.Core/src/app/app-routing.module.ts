import { DepartmentComponent } from './department/department.component';
import { LoginUrlComponent } from './login-url/login-url.component';
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppMainComponent } from "./layout/main/app.main.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";


import { NotificationTemplateComponent } from "./notification/notification-template/notification-template.component";
import { NotificationManagerComponent } from "./notification/notification-manager/notification-manager.component";
import { NotificationDetailComponent } from "./notification/notification-detail/notification-detail.component";
import { SystemTemplateComponent } from './notification/system-template/system-template.component';
import { ChatComponent } from './support/chat/chat.component';

import { DefaultSystemTemplateComponent } from './notification/default-system-template/system-template.component';
import { PermissionCoreConst } from '@shared/AppConsts';
import { ProviderConfigurationComponent } from './notification/provider-configuration/provider-configuration.component';
import { ManagementReportComponent } from './export-report/management-report/management-report.component';
import { OperationalReportComponent } from './export-report/operational-report/operational-report.component';
import { BusinessReportComponent } from './export-report/business-report/business-report.component';
import { WhileListIpComponent } from './notification/while-list-ip/while-list-ip.component';
import { SystemReportComponent } from './export-report/system-report/system-report.component';
import { MsbPrefixAccountComponent } from './notification/msb-prefix-account/msb-prefix-account.component';
import { ProductManagementComponent } from './product-management/product-management.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: AppMainComponent,
				children: [
					{ path: "login/url/:accessToken/:refreshToken", component: LoginUrlComponent},
					{ path: "home", component: HomeComponent, canActivate: [AppRouteGuard] },
					{ path: "user", component: UserComponent, canActivate: [AppRouteGuard] },
					// {
					// 	path: "app-account",
					// 	children: [
					// 		{
					// 			path: "user-account",
					// 			component: InvestorListAccountComponent,
					// 			canActivate: [AppRouteGuard],
					// 		},
					// 		{
					// 			path: "not-verified",
					// 			component: NotVerifiedComponent,
					// 			canActivate: [AppRouteGuard],
					// 		},
					// 	],
					// },
					// {
					// 	path: 'customer',
					// 	children: [
					// 		{ path: 'investor', component: InvestorComponent, data: {permissions: [PermissionCoreConst.CoreMenuKHCN]}, canActivate: [AppRouteGuard] },
					// 		{ path: 'investor/approve', component: InvestorApproveComponent, data: {permissions: [PermissionCoreConst.CoreMenuDuyetKHCN]}, canActivate: [AppRouteGuard] },
					// 		{
					// 			path: 'investor/:id/temp/:isTemp',
					// 			data: {permissions: [PermissionCoreConst.CoreDuyetKHCN_ThongTinKhachHang, PermissionCoreConst.CoreKHCN_ThongTinKhachHang]},
					// 			component: InvestorDetailComponent,
					// 			canActivate: [AppRouteGuard], 
					// 		},
					// 		{
					// 			path: 'investor/:id/temp/:isTemp/:isApprove',
					// 			data: {permissions: [PermissionCoreConst.CoreQLPD_KHCN_ThongTinChiTiet]},
					// 			component: InvestorDetailComponent,
					// 			canActivate: [AppRouteGuard], 
					// 		},
					// 	],
					// },
					// {
					// 	path: "partner-manager",
					// 	children: [
					// 		{ 
					// 			path: 'partner',
					// 			data: {permissions: [PermissionCoreConst.CoreMenu_DoiTac]}, 
					// 			component: PartnerComponent, 
					// 			canActivate: [AppRouteGuard] 
					// 		},
					// 		{
					// 			path: "partner/detail/:id",
					// 			data: {permissions: [PermissionCoreConst.CoreDoiTac_ThongTinChiTiet]}, 
					// 			component: PartnerDetailComponent,
					// 			canActivate: [AppRouteGuard],
					// 		},
					// 		{ 
					// 			path: 'trading-provider',
					// 			data: {permissions: [PermissionCoreConst.CoreMenu_DaiLy]}, 
					// 			component: TradingProviderComponent, 
					// 			canActivate: [AppRouteGuard] 
					// 		},
					// 		{
					// 			path: "trading-provider/detail/:id",
					// 			data: {permissions: [PermissionCoreConst.CoreDaiLy_ThongTinChiTiet]}, 
					// 			component: TradingProviderDetailComponent,
					// 			canActivate: [AppRouteGuard],
					// 		}
					// 	],
					// },
					// {
					// 	path: "sale-manager",
					// },
					// {
					// 	path: "approve-manager",
					// 	children: [
					// 		{ 
					// 			path: 'approve/:dataType', 
					// 			data: {permissions: [
					// 					PermissionCoreConst.CoreQLPD_KHCN_DanhSach, 
					// 					PermissionCoreConst.CoreQLPD_KHDN_DanhSach, 
					// 					PermissionCoreConst.CoreQLPD_NDTCN_DanhSach, 
					// 					PermissionCoreConst.CoreQLPD_Sale_DanhSach
					// 				]
					// 			}, 
					// 			component: ApproveComponent, 
					// 			canActivate: [AppRouteGuard] 
					// 		},
					// 		{ 
					// 			path: 'approve-email-phone/:dataType', 
					// 			data: {permissions: [
					// 					PermissionCoreConst.CoreQLPD_Email_DanhSach, 
					// 					PermissionCoreConst.CoreQLPD_Phone_DanhSach, 
					// 				]
					// 			}, 
					// 			component: ApproveEmailPhoneComponent, 
					// 			canActivate: [AppRouteGuard] 
					// 		},
					// 	],
					// },
					{
						path: "product", component: ProductManagementComponent
					},
					{
						path: "notification",
						children: [
							{
								path: "system-notification-config",
								data: {permissions: [PermissionCoreConst.CoreMenu_CauHinhThongBaoHeThong]}, 
								component: SystemTemplateComponent,
								canActivate: [AppRouteGuard],
							}, 
							{
								path: "default-system-notification-config",
								data: {permissions: [PermissionCoreConst.CoreMenu_ThongBaoMacDinh]}, 
								component: DefaultSystemTemplateComponent,
								canActivate: [AppRouteGuard],
							},
							{
								path: "notification-template",
								data: {permissions: [PermissionCoreConst.CoreMenu_MauThongBao]}, 
								component: NotificationTemplateComponent,
								canActivate: [AppRouteGuard],
							},
							{
								path: "notification-manager",
								data: {permissions: [PermissionCoreConst.CoreMenu_QLTB]}, 
								component: NotificationManagerComponent,
								canActivate: [AppRouteGuard],
							},
							{
								path: "notification-detail",
								data: {permissions: [PermissionCoreConst.CoreQLTB_PageChiTiet]}, 
								component: NotificationDetailComponent,
								canActivate: [AppRouteGuard],
							},
							{
								path: "provider-config",
								data: {permission: PermissionCoreConst.CoreMenu_CauHinhNCC}, 
								component: ProviderConfigurationComponent,
								canActivate: [AppRouteGuard],
							}, 
						],
					},
					{
						path: "establish",
						children: [
							{
								path: "system-notification-config",
								data: {permissions: [PermissionCoreConst.CoreMenu_CauHinhThongBaoHeThong]}, 
								component: SystemTemplateComponent,
								canActivate: [AppRouteGuard],
							}, 
							// {
							// 	path: "default-system-notification-config",
							// 	data: {permissions: [PermissionCoreConst.CoreMenu_ThongBaoMacDinh]}, 
							// 	component: DefaultSystemTemplateComponent,
							// 	canActivate: [AppRouteGuard],
							// },
							// {
							// 	path: "notification-template",
							// 	data: {permissions: [PermissionCoreConst.CoreMenu_MauThongBao]}, 
							// 	component: NotificationTemplateComponent,
							// 	canActivate: [AppRouteGuard],
							// },
							// {
							// 	path: "notification-manager",
							// 	data: {permissions: [PermissionCoreConst.CoreMenu_QLTB]}, 
							// 	component: NotificationManagerComponent,
							// 	canActivate: [AppRouteGuard],
							// },
							// {
							// 	path: "notification-detail",
							// 	data: {permissions: [PermissionCoreConst.CoreQLTB_PageChiTiet]}, 
							// 	component: NotificationDetailComponent,
							// 	canActivate: [AppRouteGuard],
							// },
							{
								path: "provider-config",
								data: {permission: PermissionCoreConst.CoreMenu_CauHinhNCC}, 
								component: ProviderConfigurationComponent,
								canActivate: [AppRouteGuard],
							}, 
							{
								path: "digital-sign",
								data: {permissions: [PermissionCoreConst.CoreMenu_CauHinhCKS]}, 
								canActivate: [AppRouteGuard],
							}, 
							{
								path: "whitelist-ip",
								data: {permissions: [PermissionCoreConst.CoreMenu_WhitelistIp]}, 
								component: WhileListIpComponent,
								canActivate: [AppRouteGuard],
							}, 
							{
								path: "msb-prefix-account",
								data: {permissions: [PermissionCoreConst.CoreMenu_MsbPrefix]}, 
								component: MsbPrefixAccountComponent,
								canActivate: [AppRouteGuard],
							}, 
						],
					},
					{
						path: "support",
						children: [
							{
								path: "chat",
								component: ChatComponent,
								canActivate: [AppRouteGuard],
							}
						],
					},
					{
						path: "department",
						data: {permissions: [PermissionCoreConst.CoreMenu_PhongBan]}, 
						component: DepartmentComponent,
						canActivate: [AppRouteGuard],
					},
					{	
						path: "collab-contract", 
						data: {permissions: [PermissionCoreConst.CoreSaleActive_HDCT]}, 
						canActivate: [AppRouteGuard]
					},
					
					{ 
						path: "export-report", 
						children: [
							{path: "management-report", component: ManagementReportComponent, data: {permissions: [PermissionCoreConst.Core_BaoCao_QuanTri], canActivate: [AppRouteGuard]}},
							{path: "operational-report", component: OperationalReportComponent, data: {permissions: [PermissionCoreConst.Core_BaoCao_VanHanh], canActivate: [AppRouteGuard]}},
							{path: "business-report", component: BusinessReportComponent, data: {permissions: [PermissionCoreConst.Core_BaoCao_KinhDoanh], canActivate: [AppRouteGuard]}},
							{path: "system-report", component: SystemReportComponent, data: {permissions: [PermissionCoreConst.Core_BaoCao_HeThong], canActivate: [AppRouteGuard]}},
							
						],
					},
				],
			},
		]),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
