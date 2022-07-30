export const sleep = (ms: number, shouldReject?: boolean) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                return reject()
            }

            return resolve()
        }, ms)
    })
}
