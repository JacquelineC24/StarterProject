import { action, computed, observable } from "mobx";
import { NodeStore } from "./NodeStore";

/**
 * This is the FormattabletextNodeStore which is a class that stores attributes for 
 * Formattable Text Nodes on the website
 */

export class FormattableTextNodeStore extends NodeStore {

    constructor(initializer: Partial<FormattableTextNodeStore>) {
        /**
         An object of type Partial<StaticTextNodeStore> means that the object passed into it will have the properties of a StaticTextNodeStore (title and text, below), as well as the properties of a NodeStore, which it inherits from. 
         Additionally, the Partial<> bit makes all these properties optional, so the object passed in may not have all these properties.
         */
        super();
        Object.assign(this, initializer);

        /*
        the line above is equivalent to:

        this.x = initializer.x;
        this.y = initializer.y;
        this.title = initializer.title;
        this.text = initializer.text;
        */
    }

    //the fromattable title of the text node
    @observable
    public title: string = "";

    //teh formattable body text of the text node
    @observable
    public text: string = "";

    /**
     * This function takes in the field/attribute that is being edited
     * (title or text) and the text that is replacing the old text stored in this
     * class and sets the attributes to the new text 
     * 
     * @param field 
     * @param newText 
     * @returns nothing if a field that is not title or text is entered as a parameter
     */
    @action
    public updateField (field: keyof FormattableTextNodeStore, newText: string){
        //ensures that only the title or text attributes are able to be changed
        if (field !== 'title' && field !== 'text') return;
        this[field] = newText;
    }
}