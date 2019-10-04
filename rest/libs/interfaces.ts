
export interface packetStream {
    uid: string,
    pid: string,
    uip: string,
    workerId: any,
    found: number,
    accepted: number,
    ws: any,
    pl: any
}

export interface poolStream {
    type?: string,
    method?: string,
    params: {
        id?: number,
        job_id?: string,
        nonce?: any,
        result?: any,
        login?: string,
        pass?: string,
        rigid?: string,
        agent?: string
        hashes?: any,
        error?: any,
        banned?: string,
    },
    id?: string
}