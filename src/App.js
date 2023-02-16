import HourContextProvider from './store/hour-context';

import { Form } from './components/Form';

function App() {

    return (
        <HourContextProvider>
            <Form />
        </HourContextProvider>
    );
}

export default App;
