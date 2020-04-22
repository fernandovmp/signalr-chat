class QueueNode<T> {
    value: T;
    nextBack?: QueueNode<T>;
    constructor(value: T) {
        this.value = value;
    }
}

export class Queue<T> {
    private back?: QueueNode<T>;
    private front?: QueueNode<T>;
    private readonly onItemAdded: () => void;
    constructor(onItemAdded: () => void) {
        this.onItemAdded = onItemAdded;
    }

    popFront() {
        if (this.front !== undefined) {
            const node = this.front;
            this.front = node.nextBack;
            return node.value;
        }
        return undefined;
    }

    pushBack(value: T) {
        const node = new QueueNode(value);
        node.nextBack = undefined;
        if (this.front === undefined) {
            this.front = node;
            this.back = node;
            this.onItemAdded();
            return;
        }
        this.back!.nextBack = node;
        this.back = node;
        this.onItemAdded();
    }
    empty() {
        return !(this.front !== undefined);
    }
}
