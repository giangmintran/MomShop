export class ServiceBase{
    protected convertParamUrl(name: string, value: number | string | boolean) {
		return name + "=" + encodeURIComponent("" + value) + "&";
	}
}