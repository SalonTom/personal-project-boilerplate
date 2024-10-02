/**
 * Base class for the hook triggered in CRUD operations.
 */
export default class BaseHook {

    /**
     * Triggered before the object is created.
     * @param dataIn data coming in.
     * @returns data modified or not.
     */
    public beforeCreateAsync(dataIn : any) : Promise<any> {
        return Promise.resolve(dataIn);
    };

    /**
     * Triggered before the object is updated.
     * @param dataIn data coming in.
     * @returns data modified or not.
     */
    public beforeUpdateAsync(dataIn : any) : Promise<any> {
        return Promise.resolve(dataIn);
    };

    /**
     * Triggered before the object is deleted.
     * @param dataIn data coming in.
     * @returns data modified or not.
     */
    public beforeDeleteAsync(dataIn : any) : Promise<any> {
        return Promise.resolve(dataIn);
    };

    /**
     * Triggered after the object is created.
     * @param dataOut data coming out.
     * @returns data modified or not.
     */
    public afterCreateAsync(dataOut : any) : Promise<any> {
        return Promise.resolve(dataOut);
    };

    /**
     * Triggered after the object is updated.
     * @param dataOut data coming out.
     * @returns data modified or not.
     */
    public afterUpdateAsync(dataOut : any) : Promise<any> {
        return Promise.resolve(dataOut);
    };

    /**
     * Triggered after the object is deleted.
     * @param dataOut data coming out.
     * @returns data modified or not.
     */
    public afterDeleteAsync(dataOut : any) : Promise<any> {
        return Promise.resolve(dataOut);
    };
}