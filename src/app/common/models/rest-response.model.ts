export class RestResponse {

    constructor(
        public message: string = '',
        public success = false,
        public data: any
    ) { }
}