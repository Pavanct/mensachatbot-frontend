export class Hours{
    public date: any;
    public open: [ Timings ];
    public close: [ Timings ];
}

export class Timings{
    public hour: any;
    public minute: any;
}