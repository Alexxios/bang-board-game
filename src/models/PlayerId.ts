
enum Status {
    Ready,
    NotReady
}

export interface PlayerId {
    nickname: string
    status: Status
}