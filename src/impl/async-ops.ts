
// 异步操作回调
interface OpCbs {
    resolve: Function | undefined;
    reject: (reason: any) => void | undefined;
}

export type OpName = "register" | "unregister" | "call" | "new_call" | "accept" | "hangup" | "update";

/**
 * 异步操作管理类
 */
export default class AsyncOps {

    // 当前正在进行中的异步操作
    private ops: {[op: string]: OpCbs} = {};

    // 异步操作超时时间
    private timeout: number = 10000;


    /** 当前是否正在进行异步处理过程中 */
    get operationing(): boolean {
        for (let _ in this.ops) {
            return true;
        }
        return false;
    }

    /**
     * 构造一个异步操作 promise 对象
     * @param op 异步操作名称
     */
    makeOpPromise(op: OpName): Promise<void> {
        let cbs: OpCbs = this.ops[op];
        if (cbs) {
            throw new Error("有任务正在运行，请勿重复执行");
        }
        cbs = {} as OpCbs;
        this.ops[op] = cbs;
        return new Promise<void>((resolve, reject) => {
            cbs.resolve = resolve;
            cbs.reject = reject;
        });
    }


    /**
     * 当前异步操作已完成
     */
     opResovled(op: OpName) {
        let cbs: OpCbs = this.ops[op];
        if (!cbs) {
            return;
        }
        try {
            if (cbs.resolve) {
                cbs.resolve();
            }
        } catch(err) {
            console.error(err);
        }
        delete this.ops[op];
    }

    /**
     * 当前异步操作出现异常
     */
    opRejected(op: OpName, reason?: any) {
        let cbs: OpCbs = this.ops[op];
        if (!cbs) {
            return;
        }
        try {
            if (cbs.reject) {
                cbs.reject(reason);
            }
        } catch(err) {
            console.error(err);
        }
        delete this.ops[op];
    }

}

