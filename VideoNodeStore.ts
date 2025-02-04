import { observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This is the VideoNodeStore which is a class that stores attributes for 
 * Video Nodes on the website
 */

export class VideoNodeStore extends NodeStore {

    constructor(initializer: Partial<VideoNodeStore>) {
        super();
        Object.assign(this, initializer);
    }

    @observable
    public title: string | undefined;

    @observable
    public url: string | undefined;

}