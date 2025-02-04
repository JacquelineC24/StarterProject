import React from 'react';
import './App.scss';
import { NodeCollectionStore} from './stores';
import { FreeFormCanvas } from './views/freeformcanvas/FreeFormCanvas';

/**
 * This is the app class which renders the program so that the free form canvas
 * can run as the outermost collection
 */

const mainNodeCollection = new NodeCollectionStore();

export class App extends React.Component {
    render() {

        return (
            <div className="App">
                <FreeFormCanvas store={mainNodeCollection}/> 
            </div>
        );
    }
}

export default App;