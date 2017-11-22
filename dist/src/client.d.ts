import { EVENT, CONNECTION_STATE } from './constants';
import * as C from '../binary-protocol/src/message-constants';
import { Logger } from './util/logger';
import { TimeoutRegistry } from './util/timeout-registry';
import { TimerRegistry } from './util/timer-registry';
import OfflineQueue from './util/offline-queue';
import { Connection, AuthenticationCallback } from './connection/connection';
import { SocketFactory } from './connection/socket-factory';
import { EventHandler } from './event/event-handler';
import { RPCHandler } from './rpc/rpc-handler';
import { RecordHandler } from './record/record-handler';
import { PresenceHandler } from './presence/presence-handler';
import * as EventEmitter from 'component-emitter2';
export interface RecordOfflineStore {
    get: (recordName: string, callback: ((recordName: string, version: number, data: Array<string> | object) => void)) => void;
    set: (recordName: string, version: number, data: Array<string> | object, callback: ((error: string) => void)) => void;
    delete: (recordName: string, callback: ((error: string) => void)) => void;
}
export interface Services {
    logger: Logger;
    connection: Connection;
    timeoutRegistry: TimeoutRegistry;
    timerRegistry: TimerRegistry;
    socketFactory: SocketFactory;
    storage: RecordOfflineStore;
    offlineQueue: OfflineQueue;
}
export declare class Client extends EventEmitter {
    event: EventHandler;
    rpc: RPCHandler;
    record: RecordHandler;
    presence: PresenceHandler;
    private services;
    private options;
    constructor(url: string, options?: any);
    login(): Promise<object>;
    login(callback: AuthenticationCallback): void;
    login(details: object): Promise<object>;
    login(details: object, callback: AuthenticationCallback): void;
    getConnectionState(): CONNECTION_STATE;
    close(): void;
    /**
    * Returns a random string. The first block of characters
    * is a timestamp, in order to allow databases to optimize for semi-
    * sequentuel numberings
    */
    getUid(): string;
}
export declare function deepstream(url: string, options?: any): Client;
export { CONNECTION_STATE, C, EVENT };
