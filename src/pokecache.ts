export type CacheEntry<T> = {
    createdAt: number,
    val: T
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }


    add<T>(key: string, val: T) {
        this.#cache.set(
            key, 
            {
                createdAt: Date.now(), 
                val: val
            }
        );
    }

    get<T>(key: string) : T {
        return this.#cache.get(key)?.val;
    }

    #reap() {
        for(const key of this.#cache.keys()) {
            const cacheEntry = this.#cache.get(key)?.val;

            if(cacheEntry.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        try{
            this.#reapIntervalId = 
                setInterval(this.#reap.bind(this), this.#interval)
        }
        catch(e) {
            console.log(`Error in startReapLoop: ${e}`);
        }
        
    }

    stopReapLoop() {

        try {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
        catch(e) {
            console.log(`Error attempting to stop interval with id ${this.#reapIntervalId}`);
        }
        
    }

}