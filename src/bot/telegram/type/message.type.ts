export type Message = {
    message_id?: number,
    chat?: Chat,
    from?: From,
    date?: number,
    text?: string,
    entities?: Entities[];
}

export type From = {
    id?: number,
    is_bot?: boolean,
    first_name?: string,
    username?: string,
    language_code?: string
}

export type Chat = {
    id?: number,
    first_name?: string,
    username?: string,
    type?: string
}

export type Entities = {
    offset?: number,
    length?: number,
    type?: string
}