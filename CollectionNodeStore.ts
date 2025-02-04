import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This is the CollectionNodeStore which is a class that stores attributes for 
 * Collections on the website
 */

export class CollectionNodeStore extends NodeStore {

    constructor(initializer: Partial<CollectionNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    //represents the title of the collection
    @observable
    public title: string | undefined;

    //represents the immutable url of the collection
    public url: string | undefined;

}