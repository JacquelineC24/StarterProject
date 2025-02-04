import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This is the WebisteNodeStore which is a class that stores attributes for 
 * Website Nodes on the website
 */

export class WebsiteNodeStore extends NodeStore {

    constructor(initializer: Partial<WebsiteNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    //title of the website node
    @observable
    public title: string | undefined;

    //url of the website on the node
    @observable
    public url: string | undefined;

}