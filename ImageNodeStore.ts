import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This is the ImageNodeStore which is a class that stores attributes for 
 * Image Nodes on the website
 */

export class ImageNodeStore extends NodeStore {

    constructor(initializer: Partial<ImageNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    //title of the image node
    @observable
    public title: string = "";

    //url of the image on the image node
    @observable
    public url: string | undefined;

    //alternate text if the image does not properly display
    @observable
    public alt: string | undefined;

}